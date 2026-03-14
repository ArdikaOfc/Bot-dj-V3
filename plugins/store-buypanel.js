import fetch from 'node-fetch';

function generatePassword(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const user = global.db.data.users[m.sender];
  
  const priceMap = {
    '1gb': 1000, '2gb': 2000, '3gb': 3000, '4gb': 4000, '5gb': 5000,
    '6gb': 6000, '7gb': 7000, '8gb': 8000, '9gb': 9000, '10gb': 10000,
    'unli': 15000, 'unlimited': 15000
  };

  const resourceMap = {
    '1gb': { ram: "1000", disk: "1000", cpu: "50" },
    '2gb': { ram: "2000", disk: "2000", cpu: "100" },
    '3gb': { ram: "3000", disk: "3000", cpu: "100" },
    '4gb': { ram: "4000", disk: "4000", cpu: "150" },
    '5gb': { ram: "5000", disk: "5000", cpu: "175" },
    '6gb': { ram: "6000", disk: "6000", cpu: "200" },
    '7gb': { ram: "7000", disk: "7000", cpu: "250" },
    '8gb': { ram: "8000", disk: "8000", cpu: "275" },
    '9gb': { ram: "9000", disk: "9000", cpu: "300" },
    '10gb': { ram: "10000", disk: "10", cpu: "300" },
    'unli': { ram: "0", disk: "0", cpu: "0" },
    'unlimited': { ram: "0", disk: "0", cpu: "0" }
  };

  let [size, usernem] = text.split(' ').map(s => s?.trim());

  if (!size) {
    let listPesan = `DAFTAR HARGA PANEL\n\n`;
    for (let plan in priceMap) {
      if (plan === 'unlimited') continue;
      listPesan += `- ${plan.toUpperCase()} : Rp ${priceMap[plan].toLocaleString()}\n`;
    }
    listPesan += `\nCara beli:\n${usedPrefix}${command} 1gb namauser\n${usedPrefix}${command} unli namauser`;
    return conn.sendMessage(m.chat, { text: listPesan }, { quoted: m });
  }

  const selectedPlan = size.toLowerCase();
  if (!priceMap[selectedPlan]) {
    return conn.sendMessage(m.chat, { text: `Paket ${size} tidak tersedia.` }, { quoted: m });
  }

  if (!usernem) {
    return conn.sendMessage(m.chat, { text: `Masukkan username!\nContoh: ${usedPrefix}${command} ${size} allen` }, { quoted: m });
  }

  const price = priceMap[selectedPlan];
  if (user.balance < price) {
    return conn.sendMessage(m.chat, { text: `Saldo Anda tidak cukup. Harga: Rp ${price.toLocaleString()}. Saldo Anda: Rp ${user.balance.toLocaleString()}` }, { quoted: m });
  }

  const username = usernem.toLowerCase();
  const email = `${username}@gmail.com`;
  const password = generatePassword();
  const serverName = username.charAt(0).toUpperCase() + username.slice(1) + " Server";

  const { egg, nestid, loc, domain, apikey } = global;
  const { ram, disk, cpu } = resourceMap[selectedPlan];
  let cleanDomain = domain.replace(/\/$/, ""); 

  try {
    conn.sendMessage(m.chat, { text: 'Sedang memproses panel, mohon tunggu...' }, { quoted: m });

    // Create User
    const userRes = await fetch(`${cleanDomain}/api/application/users`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`
      },
      body: JSON.stringify({ email, username, first_name: serverName, last_name: "Server", language: "en", password })
    });

    const userJson = await userRes.json();
    if (userJson.errors) return conn.sendMessage(m.chat, { text: "Gagal membuat user: " + userJson.errors[0].detail }, { quoted: m });
    const userData = userJson.attributes;

    // Get Egg Startup
    const eggRes = await fetch(`${cleanDomain}/api/application/nests/${nestid}/eggs/${egg}`, {
      headers: { "Accept": "application/json", "Authorization": `Bearer ${apikey}` }
    });
    const eggJson = await eggRes.json();
    const startup_cmd = eggJson.attributes.startup;

    // Create Server
    const serverRes = await fetch(`${cleanDomain}/api/application/servers`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`
      },
      body: JSON.stringify({
        name: serverName,
        user: userData.id,
        egg: parseInt(egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_20",
        startup: startup_cmd,
        environment: { INST: "npm", USER_UPLOAD: "0", AUTO_UPDATE: "0", CMD_RUN: "npm start" },
        limits: { memory: ram, swap: 0, disk, io: 500, cpu },
        feature_limits: { databases: 5, backups: 5, allocations: 5 },
        deploy: { locations: [parseInt(loc)], dedicated_ip: false, port_range: [] }
      })
    });

    const serverJson = await serverRes.json();
    if (serverJson.errors) return conn.sendMessage(m.chat, { text: "Gagal membuat server: " + serverJson.errors[0].detail }, { quoted: m });

    // POTONG SALDO
    user.balance -= price;

    const teks = `
BERIKUT DETAIL AKUN PANEL KAMU

ID Server: ${serverJson.attributes.id}
Username: ${userData.username}
Password: ${password}
Tanggal: ${new Date().toLocaleString('id-ID')}

Spesifikasi Server:
- Ram: ${ram == "0" ? "Unlimited" : ram / 1000 + "GB"}
- Disk: ${disk == "0" ? "Unlimited" : disk / 1000 + "GB"}
- CPU: ${cpu == "0" ? "Unlimited" : cpu + "%"}
- Panel: ${cleanDomain}

SYARAT & KETENTUAN
- Expired panel 1 bulan
- Simpan data ini sebaik mungkin
- Garansi 30 hari (1x replace)
- Claim garansi wajib bawa bukti chat
`.trim();

    await conn.sendMessage(m.sender, { text: teks });
    await conn.sendMessage(m.chat, { text: `Panel berhasil dibuat. Detail akun telah dikirim ke Private Chat.` }, { quoted: m });

  } catch (err) {
    console.log(err);
    return conn.sendMessage(m.chat, { text: "Terjadi kesalahan sistem." }, { quoted: m });
  }
};

handler.help = ['buypanel <paket> <username>'];
handler.tags = ['store'];
handler.command = /^(buypanel)$/i;

export default handler;
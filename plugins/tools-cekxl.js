let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text)
      return m.reply(
        `Masukin nomor XL.\nContoh:\n${usedPrefix + command} 085934417318`
      );

    await global.loading(m, conn);

    // Format nomor ke 62
    let number = text.replace(/[^0-9]/g, "");
    if (number.startsWith("0")) number = "62" + number.slice(1);

    const url = `https://libieapiofficial.dpdns.org/api/info/cekxl?number=${number}`;

    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();

    if (!json.status) throw new Error("Nomor tidak ditemukan / API gagal");

    const data = json.result;

    let caption = `
📱 *CEK XL*

Nomor      : ${data.number}
Operator   : ${data.operator}
Verified   : ${data.id_verified}
Jaringan   : ${data.network}
Masa Aktif : ${data.exp_date}
Grace      : ${data.grace_until}
Umur Kartu : ${data.tenure}

📡 *VoLTE*
Device  : ${data.volte.device ? "✅" : "❌"}
Area    : ${data.volte.area ? "✅" : "❌"}
SIM     : ${data.volte.simcard ? "✅" : "❌"}
`.trim();

    if (data.packages?.length) {
      caption += `\n\n📦 *PAKET AKTIF*`;

      for (let pkg of data.packages) {
        caption += `\n\n▣ ${pkg.name}
Expired : ${pkg.expiry}`;

        if (pkg.quotas?.length) {
          for (let q of pkg.quotas) {
            caption += `\n   • ${q.name}
     Sisa : ${q.remaining} / ${q.total}
     ${q.percent}%`;
          }
        }
      }
    } else {
      caption += `\n\nTidak ada paket aktif.`;
    }

    await conn.reply(m.chat, caption, m);

  } catch (e) {
        console.error(e)
    m.reply(`❌ Error: ${e.message}`);
  } finally {
    await global.loading(m, conn, true);
  }
};

handler.help = ["cekxl"];
handler.tags = ["info"];
handler.command = /^(cekxl)$/i;

export default handler;;
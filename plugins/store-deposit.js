/**
 ╔══════════════════════
      ⧉  [Pakasir] — [Store/Payment]
 ╚══════════════════════

  ✺ Type     : Plugin ESM
  ✺ Source   : https://whatsapp.com/channel/0029VbAXhS26WaKugBLx4E05
  ✺ Creator  : SXZnightmare
  ✺ Web      : [ https://app.pakasir.com ]
  ✺ Req      : [ 62823244××××× ]
  ✺ Note     : Wajib login, lalu buat proyek, nah slug dan api-key nya ada di paling bawah (integrasi), jika masih kurang paham chat aja (desc).
*/

let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.pakasir = conn.pakasir || {};

  // Fitur Batal
  if (text.toLowerCase() === 'batal') {
    if (!conn.pakasir[m.sender]) return conn.sendMessage(m.chat, { text: 'Tidak ada transaksi aktif yang bisa dibatalkan.' }, { quoted: m });
    conn.pakasir[m.sender].status = 'CANCELLED';
    return conn.sendMessage(m.chat, { text: 'Transaksi berhasil dibatalkan.' }, { quoted: m });
  }

  try {
    if (conn.pakasir[m.sender]) return conn.sendMessage(m.chat, { text: `Selesaikan transaksi sebelumnya atau ketik ${usedPrefix + command} batal` }, { quoted: m });
    
    if (!text) return conn.sendMessage(m.chat, { text: `Contoh: ${usedPrefix + command} 15000` }, { quoted: m });

    let amount = parseInt(text);
    if (isNaN(amount) || amount < 1000)
      return conn.sendMessage(m.chat, { text: 'Nominal tidak valid. Minimal 1000.' }, { quoted: m });

    // Mengambil config dari global (config.js)
    let project = global.pakasir_project;
    let api_key = global.pakasir_api_key;

    if (!project || !api_key) return conn.sendMessage(m.chat, { text: 'Konfigurasi Pakasir belum diatur di config.js' }, { quoted: m });

    let now = new Date();
    let tanggal = now.toISOString().split("T")[0];
    let uniq = Date.now();
    let order_id = `${tanggal}-${uniq}`;

    let createResRaw = await fetch("https://app.pakasir.com/api/transactioncreate/qris", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project, api_key, order_id, amount })
    });

    let createRes = await createResRaw.json();
    let payment = createRes.payment || createRes;

    if (!payment || (!payment.payment_number && !createRes.code))
      return conn.sendMessage(m.chat, { text: 'Gagal membuat transaksi QRIS.' }, { quoted: m });

    let payCode = createRes.code || payment.code || "";
    let qrisString = payment.payment_number || createRes.qris_string || "";

    let qrBuffer;
    if (payCode) {
      let qrUrl = `https://app.pakasir.com/qris/${payCode}.png`;
      qrBuffer = await fetch(qrUrl).then(r => r.arrayBuffer());
    } else if (qrisString) {
      let qcUrl = `https://quickchart.io/qr?text=${encodeURIComponent(qrisString)}&size=500&format=png`;
      qrBuffer = await fetch(qcUrl).then(r => r.arrayBuffer());
    }

    let invoiceText = `
INVOICE DEPOSIT SALDO
─────────────────
Order ID: ${order_id}
Total Bayar: Rp ${amount.toLocaleString()}

Metode: QRIS
Status: Menunggu Pembayaran

Ketik ${usedPrefix + command} batal untuk membatalkan.
─────────────────
`.trim();

    let invoiceMsg = await conn.sendMessage(m.chat, {
      image: Buffer.from(qrBuffer),
      caption: invoiceText
    }, { quoted: m });

    conn.pakasir[m.sender] = {
      order_id,
      status: 'PENDING',
      msg: invoiceMsg
    };

    let attempts = 0;
    while (attempts < 40) {
      await new Promise(r => setTimeout(r, 3000));

      if (!conn.pakasir[m.sender] || conn.pakasir[m.sender].status === 'CANCELLED') {
        delete conn.pakasir[m.sender];
        return;
      }

      let detailUrl = `https://app.pakasir.com/api/transactiondetail?project=${encodeURIComponent(project)}&amount=${encodeURIComponent(amount)}&order_id=${encodeURIComponent(order_id)}&api_key=${encodeURIComponent(api_key)}`;
      let detRaw = await fetch(detailUrl);
      let det = await detRaw.json();
      let tx = det.transaction || det || {};
      let status = (tx.status || "").toString().toUpperCase();

      if (status.includes("SUCCESS") || status.includes("COMPLETED") || status.includes("BERHASIL")) {
        let user = global.db.data.users[m.sender];
        user.balance += amount; 
        
        conn.sendMessage(m.chat, { 
            text: `PEMBAYARAN BERHASIL\n\nOrder ID: ${order_id}\nNominal: Rp ${amount.toLocaleString()}\n\nSaldo otomatis ditambahkan.\nTotal Saldo: Rp ${user.balance.toLocaleString()}` 
        }, { quoted: m });

        delete conn.pakasir[m.sender];
        return;
      }

      if (status.includes("FAILED") || status.includes("EXPIRED") || status.includes("GAGAL")) {
        conn.sendMessage(m.chat, { text: `PEMBAYARAN GAGAL / EXPIRED\nOrder ID: ${order_id}` }, { quoted: m });
        delete conn.pakasir[m.sender];
        return;
      }

      attempts++;
    }

    conn.sendMessage(m.chat, { text: `Waktu pengecekan habis. Silahkan hubungi owner.\nOrder ID: ${order_id}` }, { quoted: m });
    delete conn.pakasir[m.sender];

  } catch (e) {
    console.log(e);
    conn.sendMessage(m.chat, { text: 'Terjadi kesalahan saat memproses pembayaran.' }, { quoted: m });
    delete conn.pakasir[m.sender];
  }
};

handler.help = ["deposit"];
handler.tags = ["store"];
handler.command = /^(deposit)$/i;

handler.private = true;

export default handler;
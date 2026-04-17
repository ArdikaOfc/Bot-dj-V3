const orders = {
  'P1': { name: 'Premium 1 Bulan', price: 'Rp. 5.000' },
  'S1': { name: 'Sewa Bot 1 Bulan', price: 'Rp. 15.000' },
  'S2': { name: 'Sewa Bot 2 Bulan', price: 'Rp. 25.000' },
  'S3': { name: 'Sewa Bot 3 Bulan', price: 'Rp. 35.000' },
  'S6': { name: 'Sewa Bot 6 Bulan', price: 'Rp. 45.000' },
  'S12': { name: 'Sewa Bot 1 Tahun', price: 'Rp. 70.000' }
}

const thumbnailUrl = 'https://files.cloudkuimages.guru/images/4c70abcb66ee.jpeg'

let handler = async (m, { conn, text }) => {

  // ===== LIST PAKET =====
  if (!text) {
    let caption = `📦 *DAFTAR PAKET*\n\n`
    caption += `• *P1* → Premium 1 Bulan — Rp. 5.000\n`
    caption += `• *S1* → Sewa Bot 1 Bulan — Rp. 15.000\n`
    caption += `• *S2* → Sewa Bot 2 Bulan — Rp. 25.000\n`
    caption += `• *S3* → Sewa Bot 3 Bulan — Rp. 35.000\n`
    caption += `• *S6* → Sewa Bot 6 Bulan — Rp. 45.000\n`
    caption += `• *S12* → Sewa Bot 1 Tahun — Rp. 70.000\n\n`
    caption += `✍ Ketik *.order <kode>*\n`
    caption += `Contoh: *.order P1*`

    return conn.sendMessage(m.chat, {
      text: caption,
      contextInfo: {
        externalAdReply: {
          title: "DJBOTZ MULTI DEVICE",
          body: "Silahkan pilih orderan",
          thumbnailUrl: thumbnailUrl,
          mediaType: 1,
          previewType: "PHOTO",
          renderLargerThumbnail: true,
          sourceUrl: ""
        }
      }
    }, { quoted: m })
  }

  // ===== VALIDASI ORDER =====
  let code = text.trim().toUpperCase()
  if (!orders[code]) {
    return m.reply('❌ Kode tidak valid.\nKetik *.order* untuk melihat daftar paket.')
  }

  let pkg = orders[code]
  let name = m.pushName || 'Tidak diketahui'
  let number = m.sender.split('@')[0]

  let caption = `📢 *ORDER MASUK*\n
👤 Nama: ${name}
📱 Nomor: wa.me/${number}
📦 Paket: ${pkg.name}
💰 Harga: ${pkg.price}
⏰ Tanggal: ${new Date().toLocaleString('id-ID')}`

  // ===== BALAS KE USER =====
  await conn.sendMessage(m.chat, {
    text: caption,
    contextInfo: {
      externalAdReply: {
        title: "DJBOTZ MULTI DEVICE",
        body: "Pesanan berhasil dibuat",
        thumbnailUrl: thumbnailUrl,
        mediaType: 1,
        previewType: "PHOTO",
        renderLargerThumbnail: true,
        sourceUrl: ""
      }
    }
  }, { quoted: m })

  // ===== KIRIM KE OWNER =====
  let owners = global.owner || []
  for (let o of owners) {
    await conn.sendMessage(o[0] + '@s.whatsapp.net', { text: caption })
  }
}

handler.help = ['order <kode>']
handler.tags = ['main']
handler.command = /^(order|sewa|premium)$/i

export default handler
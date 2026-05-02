import axios from 'axios' 
import FormData from 'form-data'
import {
  loadDB,
  saveDB,
  uploadCloudku,
  sendToOwner
} from '../lib/waifuHelper.js'

let handler = async (m, { conn }) => {
  const db = loadDB()
  const c = db.couples[m.sender]
  if (!c) return m.reply('❌ Kamu belum punya pasangan')

  // ===== WAJIB REPLY GAMBAR =====
      const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ''
      if (!m.quoted) return m.reply('❌ Reply gambar yang ingin dijadikan PP')
  if (!/image/.test(m.quoted.mtype))
    return m.reply('❌ Yang direply harus gambar')
    
   let buffer = await q.download()
    if (!buffer) throw '❌ Gagal mengambil gambar'

    let ext = mime.split('/')[1] || 'bin'
    let filename = `upload_${Date.now()}.${ext}`

    const form = new FormData()
    form.append('file', buffer, filename)

    const { data } = await axios.post(
      'https://cdn.nekohime.site/upload',
      form,
      { headers: form.getHeaders() }
    )

    if (!data?.files?.length) throw '❌ Upload gagal'

    let url = data.files[0].url || data.files[0]

  // ===== SIMPAN KE PENDING =====
  if (!db.pendingPP) db.pendingPP = {}

  db.pendingPP[c.charId] = {
    charId: c.charId,
    charName: c.charName,
    userJid: m.sender,
    url
  }
  saveDB(db)

  // ===== KIRIM KE OWNER (DENGAN GAMBAR) =====
  await sendToOwner(conn, {
    image: { url: url },
    caption:
      `🖼️ *REQUEST GANTI PP*\n\n` +
      `👤 User : @${m.sender.split('@')[0]}\n` +
      `💖 Pasangan : ${c.charName}\n` +
      `🆔 UID MAL : ${c.charId}\n\n` +
      `✅ Terima : .terimapp ${c.charId}\n` +
      `❌ Tolak  : .tolakpp ${c.charId}`,
    mentions: [m.sender]
  })

  m.reply('✅ PP berhasil dikirim ke owner untuk dikonfirmasi')
}

handler.command = ['setpdpp']
handler.tags = ['waifu']
handler.help = ['setpdpp (reply gambar)']
handler.register = true

export default handler
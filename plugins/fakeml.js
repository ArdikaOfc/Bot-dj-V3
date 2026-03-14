import axios from 'axios'
import FormData from 'form-data'

let handler = async (m, { conn, text }) => {
  if (!m.quoted) throw `❌ Reply ke gambar yang mau dijadikan Fake ML!`
  let username = text?.trim() || 'Player ML'
  let q = m.quoted
  let mime = (q.msg || q).mimetype || ''
  if (!mime.startsWith('image/')) throw `❌ Itu bukan gambar!`

  let media = await q.download()
  let form = new FormData()
  form.append('image', media, 'image.jpg')
  form.append('username', username)

  let { data } = await axios.post('https://api.zenzxz.my.id/api/maker/fakeml', form, {
    headers: form.getHeaders(),
    responseType: 'arraybuffer' // terima buffer biar bisa langsung kirim
  })

  let buffer = Buffer.from(data)
  await conn.sendFile(m.chat, buffer, 'fakeml.jpg', `✨ *Fake ML Berhasil Dibuat!*\n👤 Username: ${username}`, m)
}

handler.help = ['fakeml <username>']
handler.tags = ['maker']
handler.command = /^fakeml$/i
handler.limit = true

export default handler
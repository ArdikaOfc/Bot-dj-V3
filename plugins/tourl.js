const { proto } = (await import('@adiwajshing/baileys')).default;
import axios from 'axios'
import FormData from 'form-data'

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  if (!mime) return m.reply('✨ Reply/kirim file yang mau diupload.')

  try {
    await m.react('🕒')

    let buffer = await q.download()
    if (!buffer) throw 'Gagal download media'

    let ext = mime.split('/')[1] || 'bin'
    let filename = `upload_${Date.now()}.${ext}`

    const form = new FormData()
    form.append('file', buffer, filename)

    const { data } = await axios.post(
      'https://cdn.nekohime.site/upload',
      form,
      { headers: form.getHeaders() }
    )

    if (!data?.files?.length) throw 'Upload gagal'

    let url = data.files[0].url || data.files[0]

    const infoText = `📤 𝐓𝐎𝐔𝐑𝐋 📤\n\nɴᴇᴋᴏʜɪᴍᴇ : ${url}`
        const msg = {
      interactiveMessage: proto.Message.InteractiveMessage.create({
        body: proto.Message.InteractiveMessage.Body.create({
          text: infoText
        }),
        footer: proto.Message.InteractiveMessage.Footer.create({
          text: "Tekan tombol untuk menyalin Link."
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Salin Link",
                copy_code: url
              })
            }
          ]
        })
      })
    };

    await m.conn.relayMessage(m.chat, msg, { messageId: m.key.id });
    m.react('✅')

  } catch (e) {
    console.error(e)
    m.reply('✨ Error wak!.')
  }
}

handler.help = ['tourl']
handler.tags = ['tools']
handler.command = /^tourl$/i
handler.limit = true
handler.register = true

export default handler
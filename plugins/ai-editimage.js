import axios from 'axios'
 import FormData from 'form-data'
 let handler = async (m, { conn, text, usedPrefix, command }) => {
   if (!text) return m.reply(`Kirim atau reply foto dengan caption:\n\n*${usedPrefix + command} <prompt>*`)
                try {
            const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ''
    if (!mime.startsWith('image/')) return m.reply('Mana Gambarnya?')

    m.reply('Tunggu Sedang Di proses...')
    const buffer = await q.download()

    const form = new FormData()
    form.append('files[]', buffer, { filename: 'editimage.jpg' })

    const url = encodeURIComponent((await axios.post('https://uguu.se/upload.php', form, { headers: form.getHeaders() })).data.files[0].url)

    await conn.sendMessage(m.chat, { image: { url: `https://api-faa.my.id/faa/editfoto?url=${encodeURIComponent(url)}&prompt=${encodeURIComponent(text)}` }, footer: global.footer, caption: `✨ *Edit Foto Berhasil!*\nPrompt: ${text}`, contextInfo: { forwardingScore: 10, isForwarded: true, } }, { quoted: m })

  } catch (e) {
    m.reply(e.message)
  }
}

handler.help = ['editimg'];
handler.command = ['editimg','editimage','editfoto'];
handler.tags = ['ai'];
handler.limit = true
handler.register = true

export default handler;
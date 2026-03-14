import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let [url, emoji] = text.split(',')
  if (!url || !emoji) return m.reply(`Contoh: *${usedPrefix + command}* https://whatsapp.com/channel/xxx/123,❤️`)

  await m.reply('Sedang memproses react...')

  try {
    let apiUrl = `https://api-faa.my.id/faa/react-channel?url=${encodeURIComponent(url.trim())}&reac=${encodeURIComponent(emoji.trim())}`
    let { data } = await axios.get(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
      }
    })

    if (data.status === true || data.result) {
      m.reply(`✅ Berhasil mengirim reaksi [ ${emoji.trim()} ]`)
    } else {
      m.reply('❌ Gagal: Postingan tidak ditemukan atau URL salah.')
    }
  } catch (e) {
    if (e.response && e.response.status === 404) {
      m.reply('❌ *Gagal:* Endpoint API tidak ditemukan (404).')
    } else {
      m.reply(`❌ *Gagal:* ${e.message}`)
    }
  }
}

handler.help = ['reactch']
handler.tags = ['tools']
handler.command = /^(reactch)$/i

export default handler
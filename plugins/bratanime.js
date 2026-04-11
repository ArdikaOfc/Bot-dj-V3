/* 
• Fitur : Anime Brat
• API : https://api.elrayyxml.web.id
*/
import axios from 'axios'
import { createSticker, StickerTypes } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, command }) => {
  const text = args.join(' ') || (m.quoted && m.quoted.text)
  if (!text) return m.reply(`✨ Masukin teks dong!\nContoh: .${command} halo ArdikaOfc`)

  try {
    const url = `https://api.elrayyxml.web.id/api/maker/bratanime?text=${encodeURIComponent(text)}`
    const buffer = (await axios.get(url, { responseType: 'arraybuffer' })).data

    const stickerBuffer = await createSticker(buffer, {
      type: StickerTypes.FULL,
      pack: global.stickpack,
      author: global.stickauth,
      categories: ['✨'],
      id: '.',
      quality: 70,
      background: null
    })

    await conn.sendFile(m.chat, stickerBuffer, 'sticker.webp', '', m)
  } catch (e) {
    console.error(e)
    m.reply('yahh error')
  }
}


handler.help = ['animebrat <teks>']
handler.tags = ['sticker']
handler.command = ['animebrat','bratanim','bratanime']
handler.limit = true
handler.register = true

export default handler
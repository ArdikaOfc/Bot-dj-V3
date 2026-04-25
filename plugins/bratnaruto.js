/*
Wm: https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
Jgn hapus wm ku
Fitur:  Brat Naruto
Type : Plugins Esm 
Api: https://api.skylow.web.id/
Creator: ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
*/
import axios from 'axios'
import { createSticker, StickerTypes } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, command }) => {
  const text = args.join(' ') || (m.quoted && m.quoted.text)
  if (!text) return m.reply(`✨ Masukin teks dong!\nContoh: .${command} halo ArdikaOfc`)

  try {
    const url = `https://api.skylow.web.id/api/maker/bratnaruto?text=${encodeURIComponent(text)}`
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


handler.help = ['narutobrat <teks>']
handler.tags = ['sticker']
handler.command = ['narutobrat','bratnaruto']
handler.limit = true
handler.register = true

export default handler
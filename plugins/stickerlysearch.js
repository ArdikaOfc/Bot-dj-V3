/*
• fitur : Stickerly Search
• type : plugins esm 
• API : https://rynekoo-api.hf.space/
• author : ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
*/

import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh: ${usedPrefix + command} nahida`

  try {
    let res = await axios.get(`https://rynekoo-api.hf.space/discovery/stickerly/search?q=${encodeURIComponent(text)}`)
    let data = res.data.result

    if (!data || data.length === 0) throw `❌ Tidak ada hasil untuk *${text}*`

    let caption = `*🔎 Hasil Pencarian Stickerly: ${text}*\n\n`
    let no = 1
    for (let i of data.slice(0, 10)) { // ambil 10 pack teratas
      caption += `*${no++}. ${i.name}*\n`
      caption += `🍭 Author : ${i.author}\n`
      caption += `🥧 Jumlah : ${i.stickerCount}\n`
      caption += `✨ Views : ${i.viewCount}\n`
      caption += `🍢 Exports: ${i.exportCount}\n`
      caption += `🍬 Link : ${i.url}\n\n`
    }

    await conn.sendFile(m.chat, data[0].thumbnailUrl, 'thumb.jpg', caption, m)
  } catch (e) {
    console.error(e)
    throw `🍡 Gagal mengambil data.`
  }
}

handler.help = ['stickerlysearch <query>']
handler.tags = ['sticker']
handler.command = /^(stickerlysearch|stickerly2)$/i
handler.limit = false
handler.register = true

export default handler
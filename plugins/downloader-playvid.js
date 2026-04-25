/*
Wm: https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
Jgn hapus wm ku
Fitur:  Play video
Type : Plugins Esm 
Api: https://api-faa.my.id/
Creator: ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
*/

import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply( `Ketikkan judul lagu\nContoh: ${usedPrefix + command} Dj kasih slow`)
    
        try {
            m.reply(`Tunggu sedang mencari video...`)
    let res = await axios.get(`https://api-faa.my.id/faa/ytplayvid?q=${encodeURIComponent(text)}`)
    let result = res.data?.result || "Gagal mencari video dari YouTube."
    
    const caption = `*Title:* ${result.searched_title}\n*Url:* ${result.searched_url}`
    
    await conn.sendMessage(m.chat, {
        video: { url: result.download_url },
        caption
      }, { quoted: m })
      await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });

    } catch (e) {
        console.error(e);
        await m.reply(`❌ Terjadi kesalahan: ${e.message}`);
    }
}

handler.help = ['playvid'];
handler.tags = ['downloader'];
handler.command = /^play(vid|video)$/i;
handler.register = true;
handler.limit = 5

export default handler;
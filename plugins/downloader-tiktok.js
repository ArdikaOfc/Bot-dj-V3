/*
Wm: https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
Jgn hapus wm ku
Fitur:  Download Tiktok 
Type : Plugins Esm 
Api: https://api.nexray.web.id/
Creator: ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
*/

import axios from "axios";

let handler = async (m, { conn, args, command }) => {
  try {
    if (!args[0]) return m.reply(`*Example :* .${command} https://vt.tiktok.com/ZSUTPSGr3/`);
    m.reply("⏳Otw Mengunduh bosz...");
    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
    
    const apiUrl = `https://api.nexray.eu.cc/downloader/tiktok?url=${encodeURIComponent(args[0])}`;
    
    const { data } = await axios.get(apiUrl);
    
    if (!data.status || !data.result) {
      return m.reply("❌ Gagal mendapatkan data dari API.");
      await conn.sendMessage(m.chat, { react: { text: "", key: m.key } });
    }
    
    const res = data.result;
    
    // Membuat caption menarik dari data JSON
    let caption = `*TIKTOK DOWNLOADER*\n\n`;
    caption += `👤 *Author:* ${res.author?.nickname || '-'} (@${res.author?.fullname || '-'})\n`;
    caption += `📝 *Title:* ${res.title || '-'}\n`;
    caption += `⏱️ *Duration:* ${res.duration || '-'}\n`;
    caption += `📈 *Stats:* ❤️ ${res.stats?.likes || 0} | 💬 ${res.stats?.comment || 0} | 🔄 ${res.stats?.share || 0}`;

    const mediaUrl = res.data; 
    const audioUrl = res.music_info?.url;

    const slides = res.images || (Array.isArray(mediaUrl) ? mediaUrl : []);

    if (slides.length > 0) {
      
      for (let i = 0; i < slides.length; i++) {
        
        let textCaption = i === 0 ? caption : ""; 
        await conn.sendMessage(m.chat, { image: { url: slides[i] }, caption: textCaption }, { quoted: m });
      }
    } else if (mediaUrl && typeof mediaUrl === 'string') {
      await conn.sendMessage(m.chat, { video: { url: mediaUrl }, caption: caption }, { quoted: m });
    } else {
      return m.reply("❌ Media tidak ditemukan dari respon API.");
      await conn.sendMessage(m.chat, { react: { text: "", key: m.key } });
    }
    
    
    if (audioUrl) {
      await conn.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: "audio/mpeg" }, { quoted: m });
    }
    
  } catch (e) {
    console.error(e);
    m.reply(`❌ Terjadi kesalahan: ${e.response?.data?.message || e.message}`);
    await conn.sendMessage(m.chat, { react: { text: "❌ ", key: m.key } });
  }
}

handler.help = ['tt', 'tiktok', 'ttdl', 'tiktokdl'];
handler.tags = ['downloader']
handler.command = ['tt', 'tiktok', 'ttdl', 'tiktokdl'];
handler.limit = true
handler.register = true

export default handler;
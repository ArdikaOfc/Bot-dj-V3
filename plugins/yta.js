/*
Wm: https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
Jgn hapus wm ku
Fitur:  YouTube Audio/Ytmp3
Type : Plugins Esm 
Api: https://api.skylow.web.id/
Creator: ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
*/

import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const wait = '*⏳ Sedang memproses permintaanmu...*';

  if (!text) throw `*Contoh:* ${usedPrefix + command} https://www.youtube.com/watch?v=Z28dtg_QmFw`;
  m.reply(wait);
  
  try {
    const response = await fetch(
      `https://api.skylow.web.id/api/downloader/ytmp3?q=${encodeURIComponent(text)}`
    );
    const result = await response.json();

    if (result.status && result.result && result.result.metadata && result.result.audio) {
        const caption = `*${result.result.title}*\n\n*Author:* ${result.result.metadata.channel}\n*Duration:* ${result.result.metadata.duration_seconds}\n*Link:* ${text}\n\n> Send Audio`
        await conn.sendMessage(m.chat, {
        image: { url: result.result.metadata.thumbnail },
        caption
      }, { quoted: m })
      
      
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: result.result.audio.download_url },
          mimetype: 'audio/mp4',
          fileName: result.result.title + '.mp3',
          ptt: false // ubah ke true kalau mau VN
        },
        { quoted: m }
      );
    } else {
      throw new Error('❌ Gagal mendapatkan audio!');
    }
  } catch (error) {
    throw `*Error:* ${error.message || 'Terjadi kesalahan tak dikenal.'}`;
  }
};

handler.help = ['yta', 'ytmp3', 'ytaudio']
handler.command = ['yta', 'ytmp3', 'ytaudio']
handler.tags = ['downloader']
handler.limit = true
handler.register = true 

export default handler
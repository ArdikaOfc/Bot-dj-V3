import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const wait = '*⏳ Sedang memproses permintaanmu...*';

  if (!text) throw `*Contoh:* ${usedPrefix + command} https://www.youtube.com/watch?v=Z28dtg_QmFw`;
  m.reply(wait);
  
  try {
    const response = await fetch(
      `https://api.ootaizumi.web.id/downloader/youtube?url=${encodeURIComponent(text)}&format=mp3`
    );
    const result = await response.json();

    if (result.status && result.result && result.result.download) {
        const caption = `*${result.result.title}*\n\n*Deskripsi:* ${result.result.description}\n*Author:* ${result.result.author.name}\n*Views:* ${result.result.views}\n*Duration:* ${result.result.timestamp}\n*Link:* ${result.result.url}\n\n> Send Audio`
        await conn.sendMessage(m.chat, {
        image: { url: result.result.thumbnail },
        caption
      }, { quoted: m })
      
      
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: result.result.download },
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

handler.help = ["yta <url>", "ytmp3 <url>"]
handler.tags = ["downloader"]
handler.command = /^yta(udio)?|ytmp3$/i
handler.limit = true

export default handler
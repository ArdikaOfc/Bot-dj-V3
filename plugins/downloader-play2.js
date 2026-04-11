/*• Nama Fitur : Play
• Type : Plugin ESM
• Link Channel : https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
• Creator : ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
• Contact : 083115862272
*/

import axios from "axios";

const handler = async (m, { conn, usedPrefix, text, command }) => {
  if (!text)
    return m.reply(
      `Ketikkan judul lagu\nContoh: ${usedPrefix + command} Dj jangan tunggu lama lama`
    );

  await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

  try {
    const res = await axios.get(
      `https://api-faa.my.id/faa/ytplay?query=${encodeURIComponent(text)}`,
      { timeout: 30000 }
    );

    if (!res.data?.status || !res.data?.result)
      throw new Error("Gagal mengambil data dari API.");

    const { url, title, thumbnail, duration_timestamp, mp3 } = res.data.result;

    const caption = `⬣─ 〔 *Y T - A U D I O* 〕 ─⬣
- *Title:* ${title}
- *Duration:* ${duration_timestamp}
- *YouTube:* ${url}
⬣────────────────⬣`;

    await conn.sendMessage(
      m.chat,
      {
        text: caption,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            title,
            body: global.namebot || "Audio Player",
            thumbnailUrl: thumbnail,
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: url,
          },
        },
      },
      { quoted: m }
    );

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: mp3 },
        mimetype: "audio/mp4",
        fileName: `${title}.mp3`,
      },
      { quoted: m }
    );

    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
  } catch (err) {
    console.error(err);
    let msg;
    if (err.code === "ECONNABORTED") msg = "Timeout: server terlalu lama merespons.";
    else msg = "Terjadi kesalahan:\n" + err.message;

    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
    m.reply(msg);
  }
};

handler.help = ["play2"];
handler.tags = ["downloader"];
handler.command = ['play2']
handler.limit = true
handler.register = true

export default handler;
import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`Mana link Githubnya\nContoh : ${usedPrefix + command} https://github.com/ArdikaOfc/Bot-dj-V3`)
    const regex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/i;
    if (!regex.test(text)) return m.reply(`Harus berupa link Github\nContoh: $${usedPrefix + command} https://github.com/ArdikaOfc/Bot-dj-V3`)
    try {
        // React loading
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
     let res = await axios.get(`https://api.skylow.web.id/api/downloader/githubdl?q=${encodeURIComponent(text)}`)
        let result = res.data?.result || "Gagal mengambil linknya."
        
        await conn.sendMessage(m.chat, {
      document: { url: result.download },
      fileName: `${result.repo}.zip`,
      mimetype: `application/zip`,
    }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply('Gagal mengambil file dari Github.');
  }
};

handler.help = ['gitclone'];
handler.tags = ['downloader'];
handler.command = /^(git|gitclone)$/i;
handler.limit = true;
handler.register = true

export default handler;
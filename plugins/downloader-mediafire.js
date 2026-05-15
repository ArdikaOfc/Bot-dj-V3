/*
Wm: https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
Jgn hapus wm ku
Fitur:  Download MediaFire
Type : Plugins Esm 
Api: https://api.nexray.eu.cc/
Creator: ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
*/
import axios from 'axios'

const mediaRegex = /https?:\/\/(www\.)?mediafire\.com\/(file|folder)\/(\w+)/;

let handler = async (m, { conn, text, usedPrefix, command, isPrems }) => {
  if (!text) throw `Contoh:\n${usedPrefix}${command} https://www.mediafire.com/file/941xczxhn27qbby/GBWA_V12.25FF-By.SamMods-.apk/file`;
  if (!mediaRegex.test(text)) return m.reply('Link tidak valid! Pastikan link Mediafire benar.');

    try {
        // React loading
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        let res = await axios.get(`https://api.nexray.eu.cc/downloader/mediafire?url=${encodeURIComponent(text)}`)
        let result = res.data?.result || "Gagal mendapatkan api skylow.web.id."
        let caption = ` ༺ *M E D I A F I R E  D O W N L O A D* ༻
*💌 Nama:* ${result.filename}
*📊 Size:* ${result.filesize}
*📆 Upload:* ${result.uploaded}
*📦 MimeType:* ${result.mimetype}

*🖇️ Link download:* ${result.download_url}`

        // Kirim hasil
            await m.reply(caption);
    await conn.sendMessage(m.chat, {
      document: { url: result.download_url },
      fileName: result.filename,
      mimetype: result.mimetype,
    }, { quoted: m });
        await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });

    } catch (e) {
        console.error(e);
        await m.reply(`❌ Terjadi kesalahan: ${e.message}`);
    }
}

handler.help = ["mediafire <url>"]
handler.tags = ["downloader"]
handler.command = /^(mediafire|mf(dl)?)$/i;
handler.limit = true
handler.register = true

export default handler
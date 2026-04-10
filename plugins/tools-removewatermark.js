import { fileTypeFromBuffer } from 'file-type';
import FormData from 'form-data';
import axios from 'axios';

        /*
Wm: https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
Jgn hapus wm ku
Creator: ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
Contact: 083115862272
Fitur:  Edit Image 
Type : Plugins Esm 
Api: https://api-faa.my.id/
*/

	let handler = async (m, { conn, command, usedPrefix }) => {
               
                try {
            const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ''
    if (!mime.startsWith('image/')) return m.reply(`Mana Gambarnya?\nKirim/Reply gambarnya dengan caption ${usedPrefix + command}`)

    m.reply('Tunggu Sedang Di proses...')
    const buffer = await q.download()

    const form = new FormData()
    form.append('files[]', buffer, { filename: 'rwm.jpg' })

    const url = encodeURIComponent((await axios.post('https://uguu.se/upload.php', form, { headers: form.getHeaders() })).data.files[0].url)

    await conn.sendMessage(m.chat, { image: { url: `https://api.nexray.web.id/tools/v1/dewatermark?url=${url}` }, footer: global.footer, caption: `✅Sukses hapus watermark`, contextInfo: { forwardingScore: 10, isForwarded: true, } }, { quoted: m })

  } catch (e) {
    m.reply(e.message)
  }
}

handler.help = ['removewatermark'];
handler.command = ['nowatermark','nowm','deletewatermark','deletewm','delwm','delwatermark','hapuswm','rwm','removewatermark','removewm'];
handler.tags = ['ai','tools'];
handler.limit = 10
handler.register = true

export default handler;
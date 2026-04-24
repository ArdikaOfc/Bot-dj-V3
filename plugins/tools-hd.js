    /*
Wm: https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
Jgn hapus wm ku
Fitur:  Hd, Remini 
Type : Plugins Esm 
Api: hhttps://api.nexray.web.id/
Creator: ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
*/
import axios from 'axios'
import FormData from 'form-data'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  try {
      if (!text) return m.reply(`Kirim/relpy gambar\n💬 Contoh penggunaan:\n${usedPrefix + command} 14`);
        
            let number = text.replace(/[^0-9]/g, "");
            if (!number) return m.reply(`Resolusinya berapa?\nList resolusi:\n1-16\n\n💬 Contoh penggunaan:\n${usedPrefix + command} 16`);
            
     const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ''
    if (!mime.startsWith('image/')) return m.reply('Mana Gambarnya?')
    m.reply('Tunggu Sedang Di proses...')
    
   let buffer = await q.download()
    if (!buffer) throw 'Gagal download media'

    let ext = mime.split('/')[1] || 'bin'
    let filename = `upload_${Date.now()}.${ext}`

    const form = new FormData()
    form.append('file', buffer, filename)

    const { data } = await axios.post(
      'https://cdn.nekohime.site/upload',
      form,
      { headers: form.getHeaders() }
    )

    if (!data?.files?.length) throw 'Upload gagal'

    let url = data.files[0].url || data.files[0]
    await conn.sendMessage(m.chat, {
      image: { url: `https://api.nexray.web.id/tools/upscale?url=${encodeURIComponent(url)}&resolusi=${encodeURIComponent(text)}` },
      caption: `
✨ Gambar kamu telah ditingkatkan hingga ${text}x resolusi.

📈 Kualitas lebih tajam & detail lebih jelas.

🔧 _Gunakan fitur ini kapan saja untuk memperjelas gambar blur._
`.trim()
    }, { quoted: m })
  } catch(e) {
    m.reply(e.message)
  }
}

handler.help = ['upscale', 'hd', 'remini']
handler.tags = ['tools', 'image']
handler.command = ['upscale', 'hd', 'remini']
handler.limit = true
handler.register = true

export default handler;
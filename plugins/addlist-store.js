let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [key, ...res] = text.split('|').map(v => v.trim())
    if (!key || res.length === 0) return conn.sendMessage(m.chat, { text: `Format salah.\nContoh: ${usedPrefix + command} tes | halo apa kabar` }, { quoted: m })
    
    let chat = global.db.data.chats[m.chat]
    chat.listrespon[key.toLowerCase()] = res.join('|')
    
    conn.sendMessage(m.chat, { text: `Berhasil menambah '${key}' ke list respon grup ini.` }, { quoted: m })
}

handler.help = ['addlist <teks>|<respon>']
handler.tags = ['store']
handler.command = /^addlist$/i
handler.admin = true
handler.group = true

export default handler
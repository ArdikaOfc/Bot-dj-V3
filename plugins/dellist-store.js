let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.sendMessage(m.chat, { text: `Masukkan kata kunci yang ingin dihapus.\nContoh: ${usedPrefix + command} tes` }, { quoted: m })
    
    let chat = global.db.data.chats[m.chat]
    let key = text.toLowerCase()
    
    if (!chat.listrespon[key]) return conn.sendMessage(m.chat, { text: `'${key}' tidak ditemukan dalam list.` }, { quoted: m })
    
    delete chat.listrespon[key]
    conn.sendMessage(m.chat, { text: `Berhasil menghapus '${key}' dari list respon.` }, { quoted: m })
}

handler.help = ['dellist <teks>']
handler.tags = ['store']
handler.command = /^(dellist|hapuslist)$/i
handler.admin = true
handler.group = true

export default handler
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.sendMessage(m.chat, { text: `Masukkan nama produk yang ingin dihapus.` }, { quoted: m })
    
    let chat = global.db.data.chats[m.chat]
    let key = text.toLowerCase()
    
    if (!chat.produk[key]) return conn.sendMessage(m.chat, { text: `Produk '${text}' tidak ditemukan.` }, { quoted: m })
    
    delete chat.produk[key]
    conn.sendMessage(m.chat, { text: `Berhasil menghapus produk '${text}'.` }, { quoted: m })
}

handler.help = ['delproduk <nama>']
handler.tags = ['store']
handler.command = /^(delproduk|hapusproduk)$/i
handler.admin = true
handler.group = true

export default handler
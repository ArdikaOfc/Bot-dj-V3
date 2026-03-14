let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [nama, jumlah] = text.split('|').map(v => v.trim())
    let chat = global.db.data.chats[m.chat]
    
    if (!nama || isNaN(parseInt(jumlah))) return conn.sendMessage(m.chat, { text: `Format salah.\nContoh: ${usedPrefix + command} namaproduk | 50` }, { quoted: m })

    let key = nama.toLowerCase()
    if (!chat.produk[key]) return conn.sendMessage(m.chat, { text: `Produk '${nama}' tidak ditemukan.` }, { quoted: m })

    chat.produk[key].stok = parseInt(jumlah)
    chat.produk[key].seller = m.sender 
    
    conn.sendMessage(m.chat, { text: `Berhasil update stok '${chat.produk[key].nama}'\nTotal stok sekarang: ${jumlah}\nSeller: @${m.sender.split('@')[0]}`, mentions: [m.sender] }, { quoted: m })
}

handler.help = ['addstock <nama>|<jumlah>']
handler.tags = ['store']
handler.command = ['addstock']
handler.admin = true
handler.group = true

export default handler
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [nama, harga] = text.split('|').map(v => v.trim())
    if (!nama || !harga) return conn.sendMessage(m.chat, { text: `Format salah.\nContoh: ${usedPrefix + command} namaproduk | harga` }, { quoted: m })
    
    let chat = global.db.data.chats[m.chat]
    let price = parseInt(harga.replace(/\D/g, ''))
    
    chat.produk[nama.toLowerCase()] = {
        nama: nama,
        harga: price,
        stok: 0,
        seller: m.sender
    }
    
    conn.sendMessage(m.chat, { text: `Berhasil menambah produk '${nama}'\nHarga: Rp ${price.toLocaleString()}\nStok saat ini: 0\n\nKetik *${usedPrefix}addstock ${nama} | jumlah* untuk mengisi stok.` }, { quoted: m })
}

handler.help = ['addproduk <nama>|<harga>']
handler.tags = ['store']
handler.command = /^addproduk$/i
handler.admin = true
handler.group = true

export default handler
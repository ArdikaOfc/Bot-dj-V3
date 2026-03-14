let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat]
    if (!chat.produk || Object.keys(chat.produk).length === 0) return conn.sendMessage(m.chat, { text: `Belum ada produk tersedia.` }, { quoted: m })
    
    let teks = `DAFTAR PRODUK GRUP\n\n`
    for (let key in chat.produk) {
        let p = chat.produk[key]
        teks += `- ${p.nama.toUpperCase()}\n`
        teks += `  Harga: Rp ${p.harga.toLocaleString()}\n`
        teks += `  Stok: ${p.stok}\n\n`
    }
    teks += `Ketik nama produk untuk memesan.`
    
    conn.sendMessage(m.chat, { text: teks }, { quoted: m })
}

handler.help = ['listproduk']
handler.tags = ['store']
handler.command = /^(listproduk|produk)$/i
handler.group = true

export default handler
let handler = m => m

handler.before = async function (m, { conn }) {
    if (!m.isGroup || m.isBaileys || !m.text) return false

    let chat = global.db.data.chats[m.chat]
    let t = m.text.toLowerCase().trim()

    if (chat && chat.produk && chat.produk[t]) {
        let p = chat.produk[t]
        if (!p.stok || p.stok <= 0) {
            await m.reply(`Maaf, stok '${p.nama}' sedang kosong. Silahkan hubungi admin.`)
            return true
        }

        p.stok -= 1 
        
        let seller = p.seller || m.chat 
        let sellerJid = seller.includes('@') ? seller : seller + '@s.whatsapp.net'

        let pesanKeUser = `
PESANAN BERHASIL
─────────────────
Produk: ${p.nama}
Harga: Rp ${p.harga.toLocaleString()}
Seller: @${sellerJid.split('@')[0]}

PESAN:
Pesanan Anda telah diteruskan ke Seller. Silahkan hubungi seller untuk pembayaran dan pengambilan produk.
─────────────────`.trim()

        let pesanKeSeller = `
🔔 PESANAN BARU MASUK
─────────────────
Produk: ${p.nama}
Pembeli: @${m.sender.split('@')[0]}
ID Pembeli: ${m.sender}
Sisa Stok: ${p.stok}

Mohon segera hubungi pembeli untuk proses selanjutnya.
─────────────────`.trim()

        await conn.sendMessage(m.sender, { text: pesanKeUser, mentions: [sellerJid] })
        await conn.sendMessage(sellerJid, { text: pesanKeSeller, mentions: [m.sender] })
        await m.reply(`Berhasil memesan '${p.nama}'. Pesanan telah diteruskan ke seller, silahkan cek chat pribadi Anda.`)
        
        return true
    }
    return false
}

export default handler
let handler = async (m, { args, usedPrefix, command }) => {
    let user = global.db.data.users[m.sender]

    if (!args[0]) {
        return m.reply(
            `🛒 *BUY LIMIT*\n\n` +
            `Harga:\n` +
            `• 1 Limit = 100 EXP\n\n` +
            `Contoh:\n` +
            `${usedPrefix + command} 5`
        )
    }

    let jumlah = parseInt(args[0])
    if (isNaN(jumlah) || jumlah <= 0)
        return m.reply('❌ Jumlah harus berupa angka!')

    let harga = jumlah * 100

    if (user.exp < harga)
        return m.reply(
            `❌ EXP kamu tidak cukup!\n\n` +
            `Harga: ${harga} EXP\n` +
            `EXP kamu: ${user.exp}`
        )

    // transaksi
    user.exp -= harga
    user.limit += jumlah

    m.reply(
        `✅ *PEMBELIAN BERHASIL*\n\n` +
        `➕ Limit: +${jumlah}\n` +
        `➖ EXP: -${harga}\n\n` +
        `🎟️ Total Limit: ${user.limit}\n` +
        `📊 Sisa EXP: ${user.exp}`
    )
}

handler.help = ['buylimit <jumlah>']
handler.tags = ['game']
handler.command = /^buylimit$/i

export default handler
let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    if (typeof user.balance === 'undefined') user.balance = 0
    
    let teks = `
INFO SALDO

Nama: ${m.pushName || 'User'}
Saldo: Rp ${user.balance.toLocaleString()}

Gunakan saldo Anda untuk melakukan transaksi di dalam bot.
`.trim()

    conn.sendMessage(m.chat, { text: teks }, { quoted: m })
}

handler.help = ['ceksaldo', 'saldo']
handler.tags = ['store']
handler.command = /^(ceksaldo|saldo)$/i

export default handler
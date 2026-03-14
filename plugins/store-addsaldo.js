let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
    let input = text.split(' ')
    let amountStr = ''

    if (m.quoted) {
        who = m.quoted.sender
        amountStr = input[0]
    } else if (input[0] && input[1]) {
        who = input[0].replace(/\D/g, '') + '@s.whatsapp.net'
        amountStr = input[1]
    }

    if (!who) return conn.sendMessage(m.chat, { text: `Format salah.\n\nReply pesan: ${usedPrefix + command} 10000\nNomor: ${usedPrefix + command} 628xxx 10000` }, { quoted: m })

    if (who.endsWith('@lid')) {
        who = who.split('@')[0] + '@s.whatsapp.net'
    }

    let amount = parseInt(amountStr?.replace(/\D/g, ''))
    if (isNaN(amount) || amount < 1) return conn.sendMessage(m.chat, { text: `Masukkan jumlah saldo yang valid.` }, { quoted: m })

    let user = global.db.data.users[who]
    if (!user) return conn.sendMessage(m.chat, { text: `User tidak ditemukan di database.` }, { quoted: m })

    if (typeof user.balance === 'undefined') user.balance = 0
    user.balance += amount

    let name = conn.getName(who)
    let caption = `
*BERHASIL TAMBAH SALDO*

Target: ${name}
Nomor: ${who.split('@')[0]}
Nominal: Rp ${amount.toLocaleString()}
Total Saldo: Rp ${user.balance.toLocaleString()}
`.trim()

    conn.sendMessage(m.chat, { text: caption }, { quoted: m })
}

handler.help = ['addsaldo']
handler.tags = ['owner']
handler.command = /^addsaldo$/i
handler.owner = true

export default handler
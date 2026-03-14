let handler = async (m, { conn, args, isOwner }) => {
    if (!isOwner) throw '❌ Hanya owner utama yang bisa pakai perintah ini!'

    let who = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null)
    let number

    if (who) {
        let jid = conn.decodeJid(who)
        number = jid.split('@')[0]
    } else if (args[0]) {
        number = args[0].replace(/[^0-9]/g, '')
    } else {
        throw '❌ Contoh:\n.delowner @tag\n.delowner 628xxxxx'
    }

    let index = global.owner.findIndex(([id]) => id === number)
    if (index === -1) throw '❌ Nomor ini bukan owner!'

    global.owner.splice(index, 1)
    let jid = number + '@s.whatsapp.net'

    return conn.reply(
        m.chat,
        `✅ @${number} sudah dihapus dari *owner*`,
        m,
        { mentions: [jid] }
    )
}

handler.help = ['delowner <@tag|nomor>']
handler.tags = ['owner']
handler.command = /^delowner$/i
handler.owner = true

export default handler
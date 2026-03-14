let handler = async (m, { conn, args, isOwner }) => {
    if (!isOwner)
        throw 'Hanya owner utama yang bisa pakai perintah ini!'

    // ===== AMBIL TARGET =====
    let who =
        m.mentionedJid?.[0] ||
        (m.quoted ? m.quoted.sender : null)

    let number

    // jika pakai tag / reply
    if (who) {
        let jid = conn.decodeJid(who)
        number = jid.split('@')[0]
    }
    // jika pakai nomor manual
    else if (args[0]) {
        number = args[0].replace(/[^0-9]/g, '')
    } else {
        throw 'Contoh:\n.addowner @tag\n.addowner 628xxxxx'
    }

    if (!number)
        throw 'Nomor tidak valid'

    // cek sudah owner
    if (global.owner.find(([id]) => id === number)) {
        throw 'Nomor sudah menjadi owner!'
    }

    // tambah owner
    global.owner.push([number, ''])

    let jid = number + '@s.whatsapp.net'

    let pesan = `@${number} sekarang adalah owner sementara`

    return conn.sendMessage(m.chat, {
        text: pesan,
        mentions: [jid]
    }, { quoted: m })
}

handler.help = ['addowner <@tag|nomor>']
handler.tags = ['owner']
handler.command = /^addowner$/i
handler.owner = true

export default handler
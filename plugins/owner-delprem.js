let handler = async (m, { conn, text }) => {
    let who
    if (m.quoted) {
        who = m.quoted.sender
    } else if (m.mentionedJid && m.mentionedJid[0]) {
        who = m.mentionedJid[0]
    } else if (text) {
        who = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    } else return conn.sendMessage(m.chat, { text: `⚠️ Tag user, reply, atau masukkan nomor!` }, { quoted: m })

    if (!global.db.data.users[who]) {
        global.db.data.users[who] = {
            role: 'Free user',
            premium: false,
            premiumTime: 0,
            limit: 50,
            exp: 0,
        }
    }

    let user = global.db.data.users[who]
    user.role = 'Free user'
    user.premium = false
    user.premiumTime = 0

    await conn.sendMessage(m.chat, {
        text: `❌ Premium dihapus!\n\n👤 User: @${who.split('@')[0]}`,
        mentions: [who]
    }, { quoted: m })
}

handler.help = ['delprem']
handler.tags = ['owner']
handler.command = /^delprem$/i
handler.rowner = true

export default handler
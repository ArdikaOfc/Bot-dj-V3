let handler = async (m, { conn }) => {
    if (!m.isGroup) return m.reply('❌ Khusus di group')

    let gid = m.chat
    let users = global.db.data.users

    // target user (tag / reply)
    let who =
        m.mentionedJid?.[0] ||
        (m.quoted ? m.quoted.sender : null)

    // =============================
    // TAG / REPLY → USER SAJA
    // =============================
    if (who) {
        let total = users[who]?.totalchat?.[gid] || 0

        return conn.sendMessage(m.chat, {
            text:
`📊 *TOTAL CHAT MEMBER*

👤 User : @${who.split('@')[0]}
💬 Total : ${total} chat`,
            mentions: [who]
        }, { quoted: m })
    }

    // =============================
    // LEADERBOARD (SEMUA MEMBER)
    // =============================
    let data = Object.entries(users)
        .map(([jid, u]) => ({
            jid,
            total: u.totalchat?.[gid] || 0
        }))
        .filter(v => v.total > 0)
        .sort((a, b) => b.total - a.total)

    if (!data.length)
        return m.reply('📭 Belum ada chat terdeteksi')

    let text = `━━━ 『 📊 TOTAL CHAT 』 ━━━\n`
    let mentions = []
    let i = 1

    for (let v of data) {
        let tag = v.jid.split('@')[0]
        text += `${i}. @${tag} — ${v.total} chat\n`
        mentions.push(v.jid)
        i++
    }

    text += `━━━━━━━━━━━━━━━━━━`

    return conn.sendMessage(m.chat, {
        text,
        mentions
    }, { quoted: m })
}

handler.help = ['totalchat [@user]']
handler.tags = ['group']
handler.command = /^totalchat$/i

export default handler
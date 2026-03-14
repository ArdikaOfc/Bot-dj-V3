let handler = async (m, { isAdmin, isOwner }) => {
    if (!m.isGroup) return
    if (!(isAdmin || isOwner))
        return m.reply('❌ Admin only')

    let gid = m.chat
    let users = global.db.data.users

    for (let jid in users) {
        if (users[jid].totalchat?.[gid]) {
            users[jid].totalchat[gid] = 0
        }
    }

    m.reply('✅ Total chat group berhasil di-reset')
}

handler.help = ['resetchat']
handler.tags = ['group']
handler.command = /^resetchat$/i
export default handler
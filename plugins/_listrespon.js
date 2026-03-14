let handler = m => m

handler.before = async function (m) {
    if (!m.isGroup || m.isBaileys || !m.text) return false

    let chat = global.db.data.chats[m.chat]
    let t = m.text.toLowerCase().trim()

    if (chat.listrespon && chat.listrespon[t]) {
        await m.reply(chat.listrespon[t])
        return true 
    }
    return false
}

export default handler

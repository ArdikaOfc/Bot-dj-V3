let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat]
    if (Object.keys(chat.listrespon).length === 0) return conn.sendMessage(m.chat, { text: `Belum ada list respon di grup ini.` }, { quoted: m })
    
    let teks = `DAFTAR LIST RESPON\n\n`
    for (let key in chat.listrespon) {
        teks += `- ${key}\n`
    }
    teks += `\nKetik kata kunci di atas untuk melihat responnya.`
    
    conn.sendMessage(m.chat, { text: teks }, { quoted: m })
}

handler.help = ['listrespon']
handler.tags = ['store']
handler.command = /^(listrespon|list)$/i
handler.group = true

export default handler
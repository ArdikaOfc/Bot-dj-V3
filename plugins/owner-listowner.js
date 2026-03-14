let handler = async (m, { conn }) => {
    if (!global.owner || global.owner.length === 0) {
        return conn.sendMessage(m.chat, { text: 'Belum ada owner.' }, { quoted: m })
    }

    let text = 'Daftar Owner:\n\n'
    global.owner.forEach(([number], i) => {
        text += `${i + 1}. @${number}\n`
    })

    let mentions = global.owner.map(([number]) => number + '@s.whatsapp.net')

    return conn.sendMessage(m.chat, { 
        text: text, 
        mentions: mentions 
    }, { quoted: m })
}

handler.help = ['listowner']
handler.tags = ['owner']
handler.command = /^listowner$/i
handler.owner = true

export default handler
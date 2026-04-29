let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = {
        'open': 'not_announcement',
        'close': 'announcement',
        'unlock': 'not_announcement',
        'lock': 'announcement',
    }[(args[0] || '').toLowerCase()]

    if (isClose === undefined)
        throw `
*Format salah! Contoh :*
  *○ ${usedPrefix + command} close*
  *○ ${usedPrefix + command} open*
  *○ ${usedPrefix + command} unlock*
  *○ ${usedPrefix + command} lock*
`.trim()

    await conn.groupSettingUpdate(m.chat, isClose)

    let status = isClose === 'announcement' ? '_*Group Berhasil Ditutup*_ 「 🔒 」' : '_*Group Berhasil Dibuka*_ 「 🔓 」'
    m.reply(status)
}

handler.help = ['group *open / close*']
handler.tags = ['group']
handler.command = /^(g(c|rup|roup))$/i

handler.admin = true
handler.botAdmin = true

export default handler
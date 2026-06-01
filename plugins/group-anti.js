let handler = async (m, { args, isAdmin, isOwner }) => {
  if (!m.isGroup) return m.reply('Khusus grup')
  if (!(isAdmin || isOwner)) return m.reply('Admin only')

  let chat = global.db.data.chats[m.chat]
  let type = args[0]?.toLowerCase()
  let state = args[1]?.toLowerCase()

  if (!type || !state) {
    return m.reply(
`Contoh:
.anti link on
.anti image off
.anti sticker on
.anti toxic off`
    )
  }

  let map = {
    link: 'antiLink',
    image: 'antiImage',
    sticker: 'antiSticker',
    toxic: 'antiToxic'
  }

  if (!map[type]) return m.reply('Jenis tidak valid')

  chat[map[type]] = state === 'on'
  m.reply(`✅ ${map[type]} ${state === 'on' ? 'AKTIF' : 'MATI'}`)
}

handler.command = /^anti$/i
handler.tags = ['group']
handler.help = ['anti <link|image|sticker|toxic> on/off']
  handler.botAdmin = true
  handler.group = true
  handler.admin = true
export default handler
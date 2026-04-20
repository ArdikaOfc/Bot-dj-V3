let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let type = (args[0] || '').toLowerCase()
  let isAll = false
  let isUser = false

  switch (type) {
    case 'welcome':
      if (m.isGroup && !isAdmin && !isOwner) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break

    case 'detect':
      if (m.isGroup && !isAdmin && !isOwner) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.detect = isEnable
      break

    case 'delete':
      if (m.isGroup && !isAdmin && !isOwner) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.delete = isEnable
      break

    case 'document':
      chat.useDocument = isEnable
      break

    case 'public':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts.self = !isEnable
      break

    case 'restrict':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts.restrict = isEnable
      break

    case 'nyimak':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts.nyimak = isEnable
      break

    case 'autoread':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts.autoread = isEnable
      break

    case 'pconly':
    case 'privateonly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts.pconly = isEnable
      break

    case 'owneronly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts.owneronly = isEnable
      break

    case 'gconly':
    case 'grouponly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts.gconly = isEnable
      break

    case 'self':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts.self = isEnable
      break

    case 'swonly':
    case 'statusonly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts.swonly = isEnable
      break

    case 'viewonce':
      if (m.isGroup && !isAdmin && !isOwner) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.viewonce = isEnable
      break

    case 'nsfw':
      if (m.isGroup && !isAdmin && !isOwner) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.nsfw = isEnable
      break

case 'antibot':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBot = isEnable
      break
case 'antilinkkick':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiLinkkick = isEnable
            break
        case 'antilinkdelete':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiLinkdelete = isEnable
            break
        case 'antilinkwa':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiLinkWa = isEnable
            break

    case 'menu':
      if (m.isGroup && !isAdmin && !isOwner) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.menu = isEnable
      break

    case 'simi':
      if (m.isGroup && !isAdmin && !isOwner) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.simi = isEnable
      break

    case 'autogpt':
      if (m.isGroup && !isAdmin && !isOwner) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.autogpt = isEnable
      break

    default:
      if (!/[01]/.test(command)) {
        return m.reply(`
List option:
| welcome
| detect
| delete
| document
| gconly
| antibot
| menu
| nsfw
| nyimak
| owneronly
| pconly
| public
| self
| simi
| swonly
| viewonce
| autogpt

Contoh:
${usedPrefix}enable welcome
${usedPrefix}disable nsfw
`.trim())
      }
      throw false
  }

  m.reply(`
*${type}* berhasil di *${isEnable ? 'nyala' : 'mati'}kan*
${isAll ? 'untuk bot ini' : 'untuk chat ini'}
`.trim())
}

handler.help = ['enable <option>', 'disable <option>']
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

export default handler
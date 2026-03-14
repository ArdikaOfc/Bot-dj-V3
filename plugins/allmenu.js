import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import { loadDB } from '../lib/waifuHelper.js'

const defaultMenu = {
  before: `
 *Halo %name*

───〔 *USER INFO* 〕───
_• Status : %prems_
_• Role   : %role_
_• Uang   : Rp %uang_
_• Limit  : %limit_
────────────────

───〔 *BOT INFO* 〕───
_• Nama   : Vestia Zeta MD_
_• Prefix : %_p_
_• Uptime : %uptime_
_• DB     : %rtotalreg / %totalreg_
────────────────

Ⓟ = Premium   Ⓛ = Limit
%readmore
`.trim(),

  header: `╔══〔 *%category* 〕───⬡`,
  body: `║ ⬡ %cmd %isPremium %islimit`,
  footer: `╚════════════════⬡\n`,
  after: `_Terima kasih sudah menggunakan Vestia Zeta MD_`,
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  if (m.isGroup && !global.db.data.chats[m.chat].menu)
    throw '⚠️ Admin telah mematikan menu'

  try {
    const lprem = 'Ⓟ'
    const llim = 'Ⓛ'
    const uptime = clockString(process.uptime() * 1000)

    let user = global.db.data.users[m.sender] || {}
    const wdb = loadDB()
    const uang = wdb.money?.[m.sender] || 0

    let {
      limit = 0,
      role: dbRole = 'User',
      name: dbName,
      registered = false,
      premiumTime = 0
    } = user

    let name = registered
      ? dbName || m.pushName || await conn.getName(m.sender)
      : m.pushName || await conn.getName(m.sender)

    user.name = name

    let prems = premiumTime > 0 ? 'Premium 💎' : 'Free 🆓'

    const owners = global.owner.map(v => v[0] + '@s.whatsapp.net')
    let role = owners.includes(m.sender) ? 'Owner' : dbRole

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(u => u.registered).length

    let help = Object.values(global.plugins)
      .filter(p => !p.disabled)
      .map(p => ({
        help: Array.isArray(p.help) ? p.help : [p.help],
        tags: Array.isArray(p.tags) ? p.tags : [p.tags],
        prefix: 'customPrefix' in p,
        limit: p.limit,
        premium: p.premium,
      }))

    let tags = {
      main: 'MAIN',
      waifu: 'PASANGAN',
      rpg: 'RPG MENU',
      store: 'STORE MENU',
      ai: 'AI FEATURE',
      downloader: 'DOWNLOADER',
      internet: 'INTERNET',
      maker: 'MAKER',
      anime: 'ANIME',
      sticker: 'STICKER',
      tools: 'TOOLS',
      group: 'GROUP',
      fun: 'FUN',
      search: 'SEARCH',
      game: 'GAME',
      info: 'INFO',
      owner: 'OWNER',
      panel: 'PANEL',
      audio: 'AUDIO',
      nsfw: 'NSFW'
    }

    let before = defaultMenu.before
    let header = defaultMenu.header
    let body = defaultMenu.body
    let footer = defaultMenu.footer
    let after = defaultMenu.after

    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        let list = help
          .filter(menu => menu.tags.includes(tag))
          .map(menu =>
            menu.help.map(cmd =>
              body
                .replace('%cmd', menu.prefix ? cmd : _p + cmd)
                .replace('%islimit', menu.limit ? llim : '')
                .replace('%isPremium', menu.premium ? lprem : '')
            ).join('\n')
          ).join('\n')

        return list
          ? header.replace('%category', tags[tag]) + '\n' + list + '\n' + footer
          : ''
      }),
      after
    ].join('\n')

    let replace = {
      uptime,
      _p,
      name,
      prems,
      uang: uang.toLocaleString('id-ID'),
      limit,
      role,
      totalreg,
      rtotalreg,
      readmore: readMore
    }

    let text = _text.replace(
      new RegExp(`%(${Object.keys(replace).join('|')})`, 'g'),
      (_, key) => replace[key]
    )

    await conn.sendMessage(
      m.chat,
      {
        text: text.trim(),
        mentions: [m.sender],
        contextInfo: {
          externalAdReply: {
            title: '✨ Vestia Zeta MD',
            body: 'Pilih kategori fitur yang ingin kamu pakai 💫',
            thumbnail: fs.readFileSync('./media/zeta1.jpg'),
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: '-'
          }
        }
      },
      { quoted: m }
    )

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '⚠️ Menu sedang error', m)
  }
}

handler.help = ['allmenu']
handler.tags = ['main']
handler.command = /^(allmenu|help|\?)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return `${h}j ${m}m ${s}s`
}
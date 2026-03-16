import PhoneNumber from 'awesome-phonenumber'
import { loadDB } from '../lib/waifuHelper.js'

let handler = async (m, { conn }) => {
    let who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender)
    let pp = './src/avatar_contact.png'

    try {
        pp = await conn.profilePictureUrl(who, 'image')
    } catch {}

    let user = global.db.data.users[who] || {}
    let { name, registered = false, age = '-', role = 'User', limit = 0, exp = 0, premiumTime = 0 } = user
    let username = registered ? name || conn.getName(who) : conn.getName(who)

    const owners = global.owner.map(v => v[0] + '@s.whatsapp.net')
    if (owners.includes(who)) role = 'Owner'

    let status = premiumTime > 0 ? 'Premium 💎' : 'Free 🆓'
    let regStatus = registered ? 'Yes ✅' : 'No ❌'

    const wdb = loadDB()
    const couple = wdb.couples?.[who]
    const pasangan = couple ? couple.charName : '-'
    const uang = wdb.money?.[who] || 0

    let text = `*「  PROFILE USER 」*

╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
╎ 👤 *Nama:* ${username}
╎ 🎂 *Umur:* ${age}
╎ 💍 *Pasangan:* ${pasangan}
╎ 💰 *Uang:* Rp ${uang.toLocaleString('id-ID')}
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
╎ 🛡️ *Role:* ${role}
╎ 💎 *Status:* ${status}
╎ 📝 *Daftar:* ${regStatus}
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
╎ ✨ *EXP:* ${exp}
╎ 🎫 *Limit:* ${limit}
╎ 📞 *Nomor:* ${PhoneNumber('+' + who.split('@')[0]).getNumber('international')}
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
`.trim()

    await conn.sendFile(m.chat, pp, 'profile.jpg', text, m)
}

handler.help = ['profile', 'me', 'profil']
handler.tags = ['info']
handler.command = ['profile', 'me', 'profil', 'pp']

export default handler
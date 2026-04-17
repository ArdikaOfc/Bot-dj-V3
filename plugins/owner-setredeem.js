import { loadDB, saveDB } from '../lib/waifuHelper.js'

let handler = async (m, { args, isOwner }) => {
  if (!isOwner) return m.reply('❌ *Perintah ini khusus untuk Owner.*')

  const [code, uang, xp, limit, quota, duration] = args
  if (!code || !quota) {
    return m.reply(
      `*「 📝 FORMAT SALAH 」*\n\n` +
      `Gunakan format:\n` +
      `*.setredeem* <kode> <uang> <xp> <limit> <kuota> <durasi>\n\n` +
      `*Keterangan Durasi:* d (hari), h (jam), m (menit)\n` +
      `*Contoh:* .setredeem ARDIKAOFC 5000 100 5 50 24h`
    )
  }

  const db = loadDB()
  if (!db.redeem) db.redeem = {}

  let expiredTime = null
  if (duration) {
    const parseMs = (str) => {
      let match = str.match(/^(\d+)(d|h|m|s)$/)
      if (!match) return null
      let val = parseInt(match[1])
      let type = match[2]
      switch (type) {
        case 'd': return val * 86400000
        case 'h': return val * 3600000
        case 'm': return val * 60000
        case 's': return val * 1000
        default: return null
      }
    }
    let ms = parseMs(duration)
    if (ms) expiredTime = Date.now() + ms
  }

  db.redeem[code] = {
    uang: Number(uang) || 0,
    xp: Number(xp) || 0,
    limit: Number(limit) || 0,
    quota: Number(quota),
    used: 0,
    usedBy: [],
    expired: expiredTime
  }

  saveDB(db)

  const formatWIB = (ms) => {
    return new Date(ms).toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      dateStyle: 'medium',
      timeStyle: 'short'
    }) + ' WIB'
  }

  let teks = `*─「 ✅ REDEEM CREATED 」─*\n\n`
  teks += `┌ 🔑 *Kode:* ${code}\n`
  teks += `│ 💵 *Uang:* Rp ${Number(uang || 0).toLocaleString('id-ID')}\n`
  teks += `│ ✨ *XP:* ${(Number(xp) || 0).toLocaleString()}\n`
  teks += `│ 🎫 *Limit:* ${limit || 0}\n`
  teks += `│ 🌿 *Kuota:* ${quota} User\n`
  teks += `└ ⏳ *Expired:* ${expiredTime ? formatWIB(expiredTime) : 'Tanpa Batas'}\n\n`
  teks += `_Kode berhasil didaftarkan ke sistem._`

  m.reply(teks.trim())
}

handler.command = ['setredeem']
handler.tags = ['owner']
handler.help = ['setredeem']
handler.owner = true

export default handler
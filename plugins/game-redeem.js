import { loadDB, saveDB } from '../lib/waifuHelper.js'

const rupiah = n => 'Rp ' + n.toLocaleString('id-ID')

let handler = async (m, { args }) => {
  const code = args[0]
  if (!code) return m.reply('*───「 🎟️ REDEEM 」───*\n\nMasukkan kode redeem yang ingin diklaim.\nContoh: *.redeem MERDEKA*')

  const wdb = loadDB()
  const now = Date.now()

  if (!wdb.redeem || !wdb.redeem[code])
    return m.reply('❌ *Kode redeem tidak valid!*')

  const r = wdb.redeem[code]

  if (r.expired && now > r.expired)
    return m.reply('❌ *Kode redeem telah kadaluarsa!*')

  if (r.used >= r.quota)
    return m.reply('❌ *Kuota redeem sudah habis!*')

  if (r.usedBy.includes(m.sender))
    return m.reply('❌ *Kamu sudah pernah mengklaim kode ini!*')

  if (!wdb.money) wdb.money = {}
  wdb.money[m.sender] = (wdb.money[m.sender] || 0) + r.uang

  const udb = global.db.data.users[m.sender]
  if (udb) {
    udb.exp = (udb.exp || 0) + r.xp
    udb.limit = (udb.limit || 0) + r.limit
  }

  r.used++
  r.usedBy.push(m.sender)
  saveDB(wdb)

  let teks = `*───  SUCCESS CLAIM ─── *\n\n`
  teks += `Selamat! Kamu berhasil menukarkan kode.\n\n`
  teks += `┌ 💵 *Uang:* ${rupiah(r.uang)}\n`
  teks += `│ ✨ *Exp:* +${r.xp.toLocaleString()}\n`
  teks += `│ 🎫 *Limit:* +${r.limit}\n`
  teks += `└ 🌿 *Sisa Kuota:* ${r.quota - r.used}\n\n`
  teks += `_Hadiah telah ditambahkan ke akunmu._`

  m.reply(teks.trim())
}

handler.command = ['redeem']
handler.tags = ['game']
handler.help = ['redeem <kode>']
handler.register = true

export default handler
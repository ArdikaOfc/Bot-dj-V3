import { loadDB } from '../lib/waifuHelper.js'

const rupiah = n => 'Rp ' + n.toLocaleString('id-ID')

const formatWIB = (ms) => {
  return new Date(ms).toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    dateStyle: 'medium',
    timeStyle: 'short'
  }) + ' WIB'
}

let handler = async (m) => {
  const db = loadDB()
  const now = Date.now()

  if (!db.redeem || Object.keys(db.redeem).length === 0) {
    return m.reply('❌ *Belum ada kode redeem yang tersedia saat ini.*')
  }

  const aktif = Object.entries(db.redeem)
    .filter(([_, r]) => {
      const sisaKuota = (r.quota - r.used) > 0
      const belumExpired = r.expired ? now < r.expired : true
      return sisaKuota && belumExpired
    })

  if (aktif.length === 0) {
    return m.reply('❌ *Semua kode redeem telah habis atau kadaluarsa!*')
  }

  let teks = `*─「 🎟️ LIST REDEEM 」─*\n\n`

  aktif.forEach(([code, r], index) => {
    const sisa = r.quota - r.used
    const expDate = r.expired ? formatWIB(r.expired) : 'Tanpa Batas'
    
    teks += `*${index + 1}. Kode: [ ${code} ]*\n`
    teks += `┌ 💵 *Uang:* ${rupiah(r.uang)}\n`
    teks += `│ ✨ *Exp:* ${r.xp.toLocaleString()} | 🎫 *Limit:* ${r.limit}\n`
    teks += `│ 🌿 *Kuota:* ${sisa} / ${r.quota}\n`
    teks += `└ ⏳ *Expired:* ${expDate}\n\n`
  })

  teks += `_Gunakan command *#redeem [kode]* untuk klaim._`

  m.reply(teks.trim())
}

handler.command = ['listredeem']
handler.tags = ['game']
handler.help = ['listredeem']

export default handler
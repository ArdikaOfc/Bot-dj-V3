import { loadDB, saveDB, getUserRPG, initLadang } from '../lib/waifuHelper.js'

let handler = async (m, { conn, text, usedPrefix }) => {
  const wdb = loadDB()
  let data = getUserRPG(wdb, m.sender)
  let user = data.rpg
  initLadang(user)

  const bibit = {
    'padi': { emoji: '🌾', harga: 15000, waktu: 180000 },
    'jagung': { emoji: '🌽', harga: 30000, waktu: 300000 },
    'semangka': { emoji: '🍉', harga: 50000, waktu: 600000 },
    'jeruk': { emoji: '🍊', harga: 80000, waktu: 900000 },
    'mangga': { emoji: '🥭', harga: 120000, waktu: 1200000 },
    'apel': { emoji: '🍎', harga: 150000, waktu: 1500000 },
    'durian': { emoji: '🌳', harga: 250000, waktu: 1800000 },
    'emas': { emoji: '⚜️', harga: 1000000, waktu: 3600000 }
  }

  let slotKosong = -1
  for (let i = 1; i <= user.maxLadang; i++) {
    if (!user.ladang[i]) {
      slotKosong = i
      break
    }
  }

  if (slotKosong === -1) return m.reply(`❌ Semua ladang penuh. Ketik *${usedPrefix}buyladang* untuk upgrade slot.`)

  let pilihan = text?.toLowerCase()
  if (!bibit[pilihan]) {
    let list = Object.entries(bibit).map(([name, info]) => `${info.emoji} ${name.toUpperCase()} (Rp ${info.harga.toLocaleString()})`).join('\n')
    return m.reply(`🌱 *DAFTAR BIBIT ZETA*\n\n${list}\n\nContoh: *${usedPrefix}tanam mangga*`)
  }

  if ((wdb.money[m.sender] || 0) < bibit[pilihan].harga) return m.reply('❌ Uang tidak cukup untuk membeli bibit ini.')

  wdb.money[m.sender] -= bibit[pilihan].harga
  user.ladang[slotKosong] = { jenis: pilihan, waktuTanam: Date.now() }
  
  saveDB(wdb)
  m.reply(`🌱 Berhasil menanam *${bibit[pilihan].emoji} ${pilihan.toUpperCase()}* di *Ladang ${slotKosong}*.`)
}

handler.help = ['tanam', 'berkebun']
handler.tags = ['rpg']
handler.command = /^(tanam|berkebun)$/i
handler.group = true

export default handler
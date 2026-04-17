import { loadDB, saveDB, getUserRPG } from '../lib/waifuHelper.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const wdb = loadDB()
  let args = text.split(' ')
  let who, type, count

  if (m.quoted) {
    who = m.quoted.sender
    type = (args[0] || '').toLowerCase()
    count = parseInt(args[1])
  } else if (args.length >= 3) {
    who = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    type = (args[1] || '').toLowerCase()
    count = parseInt(args[2])
  }

  const items = ['money', 'diamond', 'gold', 'iron', 'stone', 'wood']
  if (!who || !type || isNaN(count) || count <= 0) {
    return m.reply(`*Format Salah!*\n\n*Pilihan:* ${items.join(', ')}\n\n*Reply:* ${usedPrefix}${command} diamond 5\n*Nomor:* ${usedPrefix}${command} 628xxx diamond 5`)
  }

  if (!items.includes(type)) return m.reply(`*Jenis tidak valid!* Pilih: ${items.join(', ')}`)

  let sender = m.sender
  let receiver = who

  if (!wdb.users[sender]?.rpg) return m.reply('Kamu belum punya data RPG.')
  if (!wdb.users[receiver]?.rpg && type !== 'money') return m.reply('Penerima belum punya data RPG.')
  if (sender === receiver) return m.reply('Tidak bisa kirim ke diri sendiri!')

  if (type === 'money') {
    if ((wdb.money[sender] || 0) < count) return m.reply('Uangmu tidak cukup!')
    wdb.money[sender] -= count
    wdb.money[receiver] = (wdb.money[receiver] || 0) + count
  } else {
    if ((wdb.users[sender].rpg[type] || 0) < count) return m.reply(`${type.toUpperCase()} tidak cukup!`)
    wdb.users[sender].rpg[type] -= count
    wdb.users[receiver].rpg[type] = (wdb.users[receiver].rpg[type] || 0) + count
  }

  saveDB(wdb)
  
  return conn.sendMessage(m.chat, {
    text: `*───「 TRADE SUCCESS 」───*\n\n✅ Berhasil mengirimkan:\n\n┌ *Dari*: @${sender.split('@')[0]}\n├ *Ke*: @${receiver.split('@')[0]}\n├ *Item*: ${type.toUpperCase()}\n└ *Jumlah*: ${count.toLocaleString()}`,
    contextInfo: {
      mentionedJid: [sender, receiver],
      externalAdReply: {
        title: "DJBOTZ TRADE",
        body: "Transaksi Berhasil",
        thumbnailUrl: 'https://files.cloudkuimages.guru/images/bbc63933dd81.jpeg',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

handler.help = ['trade']
handler.tags = ['rpg']
handler.command = ['trade']

export default handler
import { loadDB, saveDB, getUserRPG, initLadang } from '../lib/waifuHelper.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const wdb = loadDB()
  let data = getUserRPG(wdb, m.sender)
  let user = data.rpg
  initLadang(user)

  // Daftar Harga Jual & Emoji
  const market = {
    'iron': { emoji: '⛓️', harga: 5000 },
    'gold': { emoji: '✨', harga: 50000 },
    'stone': { emoji: '🪨', harga: 2000 },
    'diamond': { emoji: '💎', harga: 250000 },
    'lele': { emoji: '🐟', harga: 10000 },
    'nila': { emoji: '🐠', harga: 15000 },
    'bawal': { emoji: '🐡', harga: 25000 },
    'hiu': { emoji: '🦈', harga: 150000 },
    'padi': { emoji: '🌾', harga: 20000 },
    'jagung': { emoji: '🌽', harga: 40000 },
    'semangka': { emoji: '🍉', harga: 70000 },
    'jeruk': { emoji: '🍊', harga: 110000 }, 
    'mangga': { emoji: '🥭', harga: 160000 },
    'apel': { emoji: '🍎', harga: 200000 },
    'durian': { emoji: '🌳', harga: 350000 },
    'emas': { emoji: '⚜️', harga: 1500000 }
  }

  const hargaBeli = {
    'iron': { emoji: '⛓️', harga: 10000 },
    'gold': { emoji: '✨', harga: 100000 },
    'stone': { emoji: '🪨', harga: 5000 },
    'diamond': { emoji: '💎', harga: 500000 }
  }

  if (!text) {
    let cap = `*───「 ZETA MARKET 」───*\n\n`
    cap += `*🛒 CARA BELI:* ${usedPrefix}beli [item] [jumlah]\n`
    cap += `*💰 CARA JUAL:* ${usedPrefix}jual [item] [jumlah]\n\n`
    
    cap += `*📦 MATERIAL (BELI):*\n`
    for (let i in hargaBeli) {
      cap += `${hargaBeli[i].emoji} ${i.toUpperCase()}: Rp ${hargaBeli[i].harga.toLocaleString()}\n`
    }
    
    cap += `\n*💎 DAFTAR HARGA JUAL:*\n`
    let listJual = Object.keys(market).map(v => `${market[v].emoji} ${v.toUpperCase()}: Rp ${market[v].harga.toLocaleString()}`).join('\n')
    cap += listJual

    return conn.sendMessage(m.chat, {
      text: cap,
      contextInfo: {
        externalAdReply: {
          title: "ZETA SHOP & MARKET",
          body: "Beli material atau jual hasil kebun & petualangan!",
          thumbnailUrl: 'https://files.cloudkuimages.guru/images/bbc63933dd81.jpeg',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })
  }

  let args = text.toLowerCase().split(' ')
  let item = args[0]
  let amount = args[1] === 'all' ? 'all' : (parseInt(args[1]) || 1)

  if (command === 'beli' || command === 'buy') {
    if (amount === 'all') return m.reply('❌ Tidak bisa membeli dengan jumlah "all".')
    if (amount <= 0) return m.reply('❌ Jumlah harus lebih dari 0.')
    if (!hargaBeli[item]) return m.reply('❌ Barang tidak tersedia untuk dibeli.')
    
    let totalHarga = hargaBeli[item].harga * amount
    let money = wdb.money[m.sender] || 0

    if (money < totalHarga) return m.reply(`❌ Uang tidak cukup! Kurang Rp ${(totalHarga - money).toLocaleString()}`)

    wdb.money[m.sender] -= totalHarga
    user[item] = (user[item] || 0) + amount
    saveDB(wdb)

    return m.reply(`✅ Berhasil membeli *${amount} ${hargaBeli[item].emoji} ${item}*\n💸 Total: *Rp ${totalHarga.toLocaleString()}*`)
  }

  if (command === 'jual' || command === 'sell') {
    if (!market[item]) return m.reply('❌ Barang tidak bisa dijual di sini.')
    
    let lokasi = ""
    let stok = 0

    if (user[item] !== undefined) {
      stok = user[item]; lokasi = "rpg"
    } else if (user.ikan && user.ikan[item] !== undefined) {
      stok = user.ikan[item]; lokasi = "ikan"
    } else if (user.hasilKebun && user.hasilKebun[item] !== undefined) {
      stok = user.hasilKebun[item]; lokasi = "kebun"
    }

    if (stok <= 0) return m.reply(`❌ Kamu tidak memiliki stok *${item}*.`)
    
    let jumlahJual = (amount === 'all') ? stok : amount
    if (jumlahJual > stok) return m.reply(`❌ Stok tidak cukup! (Sisa: ${stok})`)
    if (jumlahJual <= 0) return m.reply('❌ Jumlah harus lebih dari 0.')

    let totalHasil = market[item].harga * jumlahJual
    
    if (lokasi === "rpg") user[item] -= jumlahJual
    else if (lokasi === "ikan") user.ikan[item] -= jumlahJual
    else if (lokasi === "kebun") user.hasilKebun[item] -= jumlahJual

    wdb.money[m.sender] = (wdb.money[m.sender] || 0) + totalHasil
    saveDB(wdb)

    return m.reply(`✅ Berhasil menjual *${jumlahJual} ${market[item].emoji} ${item}*\n💰 Mendapatkan: *Rp ${totalHasil.toLocaleString()}*`)
  }
}

handler.help = ['jual', 'beli', 'shop']
handler.tags = ['rpg']
handler.command = /^(jual|shop|sell|beli|buy)$/i
handler.group = true

export default handler
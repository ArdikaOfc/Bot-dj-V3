import { loadDB, saveDB, getUserRPG } from '../lib/waifuHelper.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const wdb = loadDB()
  
  if (!wdb.users[m.sender]) wdb.users[m.sender] = {}
  if (!wdb.users[m.sender].rpg) {
    wdb.users[m.sender].rpg = {
      level: 1, exp: 0, darah: 100, lastAdventure: 0, lastMining: 0, lastDungeon: 0, lastRaid: 0,
      diamond: 0, gold: 0, iron: 0, stone: 0, wood: 0, sword: 0, armor: 0,
      pet: { tipe: 'none', level: 1, exp: 0, lastFeed: 0 }
    }
  }

  let user = wdb.users[m.sender].rpg
  if (!global.db.data.chats[m.chat].raid) {
    global.db.data.chats[m.chat].raid = { hp: 0, maxHp: 0, active: false, participants: {}, bossName: '', reward: {} }
  }
  let raid = global.db.data.chats[m.chat].raid
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.cloudkuimages.guru/images/604a2923cef9.jpeg')

  const listBoss = [
    { name: 'ANCIENT DRAGON', hp: 50000, money: 300000, exp: 6000, diamond: 5, gold: 15, img: 'https://files.cloudkuimages.guru/images/c25fcdd9855b.jpeg' },
    { name: 'VENOM HYDRA', hp: 35000, money: 200000, exp: 4000, diamond: 3, gold: 10, img: 'https://files.cloudkuimages.guru/images/4af63e988bc5.jpeg' },
    { name: 'DEATH KNIGHT', hp: 25000, money: 150000, exp: 3000, diamond: 2, gold: 8, img: 'https://files.cloudkuimages.guru/images/101bc3c6d749.jpeg' },
    { name: 'GOLEM OVERLORD', hp: 70000, money: 450000, exp: 8000, diamond: 7, gold: 20, img: 'https://files.cloudkuimages.guru/images/475ce9ad2eaa.jpeg' }
  ]

  if (!text) {
    let menu = `*───「 ZETA RAID SYSTEM 」───*\n\n`
    menu += `⚔️ *${usedPrefix}${command} attack* (Serang)\n`
    menu += `👾 *${usedPrefix}${command} spawn* (Panggil Boss)\n\n`
    
    if (raid.active) {
      menu += `⚠️ *BOSS ACTIVE:* ${raid.bossName}\n`
      menu += `❤️ *HP:* ${raid.hp.toLocaleString()} / ${raid.maxHp.toLocaleString()}`
    } else {
      menu += `✅ *STATUS:* Area aman.`
    }
    
    return conn.sendMessage(m.chat, { text: menu, contextInfo: { externalAdReply: { title: "RAID CENTER", body: "Kalahkan boss bersama-sama!", thumbnailUrl: pp, mediaType: 1, renderLargerThumbnail: true } } }, { quoted: m })
  }

  if (text === 'attack') {
    if (!raid.active) return m.reply(`❌ Tidak ada Boss. Ketik *${usedPrefix}${command} spawn*`)
    if (user.darah <= 15) return m.reply('❌ Darahmu terlalu rendah!')

    let cooldown = 60000 // Raid cooldown 1 menit saja biar seru
    if (Date.now() - (user.lastRaid || 0) < cooldown) {
      let sisa = ((cooldown - (Date.now() - user.lastRaid)) / 1000).toFixed(0)
      return m.reply(`⏳ Tunggu ${sisa} detik lagi.`)
    }

    // --- KALKULASI DAMAGE SINKRON DENGAN DUNGEON ---
    let baseDmg = (user.level * 10) + ((user.sword || 0) * 100)
    
    // Bonus Naga: +5% per level pet
    let petBonus = 0
    if (user.pet?.tipe === 'naga') {
      petBonus = Math.floor(baseDmg * (user.pet.level * 0.05))
    }
    
    let totalDmg = baseDmg + petBonus
    
    raid.hp -= totalDmg
    raid.participants[m.sender] = (raid.participants[m.sender] || 0) + totalDmg
    user.darah -= 15 // Setiap attack darah berkurang
    user.lastRaid = Date.now()

    if (raid.hp <= 0) {
      // Pembagian hadiah
      for (let jid in raid.participants) {
        if (wdb.users[jid]) {
          let u = wdb.users[jid].rpg
          wdb.money[jid] = (wdb.money[jid] || 0) + raid.reward.money
          u.exp += raid.reward.exp
          u.diamond += raid.reward.diamond
          u.gold += raid.reward.gold
        }
      }
      
      let winMsg = `*───「 VICTORY: ${raid.bossName} 」───*\n\n`
      winMsg += `🔥 Boss berhasil ditumbangkan!\n\n`
      winMsg += `🎁 *HADIAH SETIAP PESERTA:*\n`
      winMsg += `• 💰 Money: +Rp ${raid.reward.money.toLocaleString()}\n`
      winMsg += `• 💎 Diamond: +${raid.reward.diamond}\n`
      winMsg += `• 🌟 XP: +${raid.reward.exp}`

      raid.active = false
      raid.participants = {}
      saveDB(wdb)
      return m.reply(winMsg)
    }

    m.reply(`⚔️ *ATTACK SUCCESS!*\n💥 Damage: ${totalDmg.toLocaleString()} ${petBonus > 0 ? '(🐉 Naga Boost)' : ''}\n❤️ Sisa HP Boss: ${raid.hp.toLocaleString()}`)
  }

  if (text === 'spawn') {
    if (raid.active) return m.reply(`❌ Boss *${raid.bossName}* masih aktif!`)
    
    let randomBoss = listBoss[Math.floor(Math.random() * listBoss.length)]
    raid.active = true
    raid.bossName = randomBoss.name
    raid.hp = randomBoss.hp
    raid.maxHp = randomBoss.hp
    raid.reward = { money: randomBoss.money, exp: randomBoss.exp, diamond: randomBoss.diamond, gold: randomBoss.gold }
    raid.participants = {}
    
    conn.sendMessage(m.chat, {
      text: `*───「 BOSS SPAWNED 」───*\n\n👾 *NAME:* ${raid.bossName}\n❤️ *HP:* ${raid.hp.toLocaleString()}\n\nKetik *${usedPrefix}${command} attack* untuk menyerang!`,
      contextInfo: { externalAdReply: { title: "BOSS WARNING!", body: `A wild ${raid.bossName} appeared!`, thumbnailUrl: randomBoss.img, mediaType: 1, renderLargerThumbnail: true } }
    }, { quoted: m })
  }

  saveDB(wdb)
}

handler.help = ['raid']
handler.tags = ['rpg']
handler.command = ['raid']

export default handler
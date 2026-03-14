let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who
  let time

  if (m.quoted) {
    who = m.quoted.sender
    time = text ? text.trim() : null
  } else if (m.mentionedJid && m.mentionedJid[0]) {
    who = m.mentionedJid[0]
    // Mengambil durasi setelah mention (misal .addprem @user 30d)
    time = text ? text.replace(/@[\d]+/g, '').trim() : null
  } else if (text) {
    let [inputNum, inputTime] = text.split(' ')
    if (inputNum && !isNaN(inputNum.replace(/[^0-9]/g, ''))) {
        who = inputNum.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        time = inputTime
    }
  }

  if (!who) return conn.sendMessage(m.chat, { text: `⚠️ Tag user, reply, atau masukkan nomor!\nContoh: *${usedPrefix + command}* @user 30d` }, { quoted: m })
  if (!time) return conn.sendMessage(m.chat, { text: `⚠️ Tentukan durasi premium!\nContoh: *${usedPrefix + command}* 30d` }, { quoted: m })

  let duration = ms(time)
  if (!duration) return conn.sendMessage(m.chat, { text: '⚠️ Format waktu salah! Gunakan: d, h, m, atau s.\nContoh: 30d, 12h, 5m' }, { quoted: m })

  if (!global.db.data.users[who]) {
    global.db.data.users[who] = {
      role: 'Free user',
      premium: false,
      premiumTime: 0,
      limit: 50,
      exp: 0,
    }
  }
  
  let user = global.db.data.users[who]
  let now = Date.now()

  if (user.premiumTime > now) {
    user.premiumTime += duration
  } else {
    user.premiumTime = now + duration
  }
  
  user.premium = true
  user.role = 'Premium user'

  let txt = `✅ *PREMIUM ADDED*\n\n👤 *User:* @${who.split('@')[0]}\n⏳ *Tambahan:* ${time}\n📅 *Berakhir:* ${new Date(user.premiumTime).toLocaleString('id-ID')}`

  await conn.sendMessage(m.chat, {
    text: txt,
    mentions: [who]
  }, { quoted: m })
}

handler.help = ['addprem']
handler.tags = ['owner']
handler.command = /^addprem$/i
handler.rowner = true

export default handler

function ms(str) {
  if (!str) return null
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
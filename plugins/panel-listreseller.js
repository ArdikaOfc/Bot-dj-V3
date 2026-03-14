import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const databasePath = path.join(__dirname, '../lib/database/reseller.json')

const handler = async (m, { conn }) => {
  if (!fs.existsSync(databasePath)) {
    return m.reply("Belum ada reseller yang terdaftar.")
  }

  let db = JSON.parse(fs.readFileSync(databasePath))
  if (db.length === 0) return m.reply("Daftar reseller kosong.")

  let messageText = "*LIST RESELLER*\n\n"
  for (let i = 0; i < db.length; i++) {
    messageText += `> ${i + 1}. @${db[i].split('@')[0]}\n`
  }
  messageText += `\n*Total:* ${db.length}`

  await conn.sendMessage(m.chat, { text: messageText.trim(), mentions: db }, { quoted: m })
}

handler.help = ['listreseller']
handler.tags = ['panel']
handler.command = /^(listreseller|resellerlist)$/i
handler.owner = true

export default handler
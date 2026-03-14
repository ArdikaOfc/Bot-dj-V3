import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const databasePath = path.join(__dirname, '../lib/database/reseller.json')

const handler = async (m, { conn, text, command }) => {
  const dir = path.dirname(databasePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(databasePath)) fs.writeFileSync(databasePath, JSON.stringify([]))

  if (!text) return m.reply(`Masukan nomor! Contoh: .${command} 628xxx`)
  
  let who = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let db = JSON.parse(fs.readFileSync(databasePath))

  if (command === 'addreseller') {
    if (db.includes(who)) return m.reply('Nomor tersebut sudah menjadi reseller.')
    db.push(who)
    fs.writeFileSync(databasePath, JSON.stringify(db, null, 2))
    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } })
    m.reply(`Berhasil menambahkan @${who.split('@')[0]} sebagai reseller.`, null, { mentions: [who] })
  } 
  
  if (command === 'delreseller') {
    if (!db.includes(who)) return m.reply('Nomor tersebut bukan reseller.')
    db = db.filter(v => v !== who)
    fs.writeFileSync(databasePath, JSON.stringify(db, null, 2))
    await conn.sendMessage(m.chat, { react: { text: "🗑️", key: m.key } })
    m.reply(`Berhasil menghapus @${who.split('@')[0]} dari daftar reseller.`, null, { mentions: [who] })
  }
}

handler.help = ['addreseller', 'delreseller']
handler.tags = ['owner', 'panel']
handler.command = /^(addreseller|delreseller)$/i
handler.owner = true

export default handler
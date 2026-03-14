import similarity from 'similarity'
import { loadDB, saveDB } from '../lib/waifuHelper.js'

const THRESHOLD = 0.72

export async function before(m) {
  if (!m.text) return true

  this.game = this.game || {}
  const id = 'susunkata-' + m.chat
  if (!m.quoted || !m.quoted.fromMe) return true
  if (!(id in this.game)) return true

  const [msg, data, timeout] = this.game[id]
  if (m.quoted.id !== msg.id) return true

  const jawab = data.jawaban.toLowerCase().trim()
  const teks = m.text.toLowerCase().trim()
  if (teks === jawab) {
    clearTimeout(timeout)
    delete this.game[id]
    const db = loadDB()
    if (!db.money) db.money = {}
    db.money[m.sender] = (db.money[m.sender] || 0) + data.reward
    saveDB(db)
    if (!global.db.data.users[m.sender])
      global.db.data.users[m.sender] = {}

    global.db.data.users[m.sender].limit =
      (global.db.data.users[m.sender].limit || 0) + data.limit

    await m.reply(
      `BENAR\n\n` +
      `Jawaban: ${data.jawaban}\n\n` +
      `Hadiah:\n` +
      `• Rp ${data.reward.toLocaleString('id-ID')}\n` +
      `• ${data.limit} Limit\n\n` +
      `Saldo: Rp ${db.money[m.sender].toLocaleString('id-ID')}\n` +
      `Limit: ${global.db.data.users[m.sender].limit}`
    )
    return true
  }
  if (similarity(teks, jawab) >= THRESHOLD) {
    await m.reply('Hampir benar')
    return true
  }
  await m.reply('Jawaban salah')
  return true
}

export const exp = 0
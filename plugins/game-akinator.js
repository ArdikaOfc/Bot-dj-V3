import { Akinator } from '@aqul/akinator-api'

if (!global.akinatorSessions) global.akinatorSessions = {}

const buildQuestion = (aki) =>
  `*🧞 AKINATOR*\n\n❓ *Pertanyaan ${aki.step + 1}:*\n${aki.question}\n\n📊 Progress: ${Math.round(aki.progress)}%\n\n*Jawab:*\n1️⃣ Ya\n2️⃣ Tidak\n3️⃣ Tidak Tahu\n4️⃣ Mungkin\n5️⃣ Mungkin Tidak\n0️⃣ Kembali\n\n> Ketik *.akistop* untuk berhenti`

let handler = async (m, { conn, command }) => {
  const id = m.chat

  if (/^akistop$/i.test(command)) {
    if (!global.akinatorSessions[id]) return m.reply('Tidak ada game Akinator yang aktif.')
    delete global.akinatorSessions[id]
    return m.reply('Game Akinator dihentikan! 👋')
  }

  if (global.akinatorSessions[id]) return m.reply('Masih ada game Akinator aktif!\nKetik *.akistop* untuk berhenti.')

  try {
    await m.reply('```Memulai Akinator...```')
    const aki = new Akinator({ region: 'id', childMode: true })
    await aki.start()
    global.akinatorSessions[id] = { aki, sender: m.sender }
    await conn.sendMessage(m.chat, { text: buildQuestion(aki) }, { quoted: m })
  } catch (e) {
    delete global.akinatorSessions[id]
    m.reply('Gagal memulai Akinator: ' + e.message)
  }
}

handler.help = ['akinator', 'aki']
handler.tags = ['game']
handler.command = /^(akinator|aki|akistop)$/i
handler.game = true

export default handler
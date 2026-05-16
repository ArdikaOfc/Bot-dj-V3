if (!global.akinatorSessions) global.akinatorSessions = {}

const ANSWERS = {
  '1': 0, 'ya': 0, 'yes': 0,
  '2': 1, 'tidak': 1, 'no': 1,
  '3': 2, 'tidak tahu': 2, 'idk': 2,
  '4': 3, 'mungkin': 3,
  '5': 4, 'mungkin tidak': 4,
  '0': 'back', 'kembali': 'back'
}

const buildQuestion = (aki) =>
  `*🧞 AKINATOR*\n\n❓ *Pertanyaan ${aki.step + 1}:*\n${aki.question}\n\n📊 Progress: ${Math.round(aki.progress)}%\n\n*Jawab:*\n1️⃣ Ya\n2️⃣ Tidak\n3️⃣ Tidak Tahu\n4️⃣ Mungkin\n5️⃣ Mungkin Tidak\n0️⃣ Kembali\n\n> Ketik *.akistop* untuk berhenti`

export async function before(m, { conn }) {
  const id = m.chat
  const session = global.akinatorSessions[id]
  if (!session) return !0

  const input = m.text?.toLowerCase().trim()
  const answer = ANSWERS[input]
  if (answer === undefined) return !0

  const { aki } = session

  try {
    if (answer === 'back') {
      if (aki.step === 0) { m.reply('Tidak bisa kembali lagi.'); return !0 }
      await aki.back()
    } else {
      await aki.answer(answer)
    }

    if (aki.isWin) {
      delete global.akinatorSessions[id]
      await conn.sendMessage(m.chat, {
        image: { url: aki.sugestion_photo },
        caption: `*🧞 Akinator menebak...*\n\n👤 *${aki.sugestion_name}*\n📝 ${aki.sugestion_desc}\n\n_Benar tidak? 😄_`
      }, { quoted: m })
      return !0
    }

    await conn.sendMessage(m.chat, { text: buildQuestion(aki) }, { quoted: m })
  } catch (e) {
    delete global.akinatorSessions[id]
    m.reply('Terjadi kesalahan: ' + e.message)
  }

  return !0
}

export const exp = 0
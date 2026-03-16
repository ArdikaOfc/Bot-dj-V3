// • Feature : Copilot AI
// • Source  : https://rynekoo-api.hf.space/
// • Plugins ESM
// • Author ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻ 
import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `🧀 Contoh: ${usedPrefix + command} Apa itu bot wa`

  try {
    let res = await fetch(`https://rynekoo-api.hf.space/text-generation/copilot?text=${encodeURIComponent(text)}`)
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.status) throw `❌ Gagal mendapatkan respon dari Copilot AI.`

    let caption = `${json.result.text}\n\n📚 *Referensi:*`
    if (json.result.citations && json.result.citations.length > 0) {
      caption += '\n' + json.result.citations
        .map(c => `- [${c.title}](${c.url})`)
        .join('\n')
    } else {
      caption += ` Tidak ada sumber ditemukan.`
    }

    await m.reply(caption)

  } catch (e) {
    console.error(e)
    throw `🍬 Terjadi kesalahan, coba lagi nanti.`
  }
}

handler.help = ['copilot <teks>']
handler.tags = ['ai']
handler.command = /^copilot$/i
handler.limit = false

export default handler
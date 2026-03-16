// • Feature : FeloAI (Penjelasan dengan Sumber)
// • Source  : https://rynekoo-api.hf.space
// • Plugins ESM
// • Author ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻ 
import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `🧀 Contoh: ${usedPrefix + command} Apa itu bot wa`

  try {
    let res = await fetch(`https://rynekoo-api.hf.space/ai/feloai?text=${encodeURIComponent(text)}`)
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.status) throw `❌ Gagal mendapatkan respon dari FeloAI.`

    let caption = `${json.result.text}\n\n📚 *Sumber Referensi:*\n`
    if (json.result.sources && json.result.sources.length > 0) {
      caption += json.result.sources
        .slice(0, 5)
        .map(src => `- [${src.title}](${src.url})`)
        .join('\n')
    } else {
      caption += `Tidak ada sumber ditemukan.`
    }

    await m.reply(caption)

  } catch (e) {
    console.error(e)
    throw `🍬 Terjadi kesalahan, coba lagi nanti.`
  }
}

handler.help = ['feloai <teks>']
handler.tags = ['ai']
handler.command = /^feloai$/i
handler.limit = false

export default handler
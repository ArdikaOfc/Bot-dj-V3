// • Feature : AoyoAI 
// • Source  : https://rynekoo-api.hf.space
// • Plugins ESM
// • Author ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `🧀 Contoh: ${usedPrefix + command} Halo tutorial Kagura`

  try {
    let res = await fetch(`https://rynekoo-api.hf.space/ai/aoyoai?text=${encodeURIComponent(text)}`)
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.status) throw `❌ Gagal mendapatkan respon dari AoyoAI.`

    await m.reply(json.result)

  } catch (e) {
    console.error(e)
    throw `🍬 Terjadi kesalahan, coba lagi nanti.`
  }
}

handler.help = ['aoyoai <teks>']
handler.tags = ['ai']
handler.command = /^aoyoai$/i
handler.limit = false

export default handler
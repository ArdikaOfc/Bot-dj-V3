// • Feature : Copilot AI
// • Source  : https://api.deline.web.id/
// • Plugins ESM
// • Author ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻ 
import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('❌ Kirim teksnya. Contoh: .copilot Jelaskan tentang Mars');

let thinking = await conn.sendMessage(m.chat, { text: "Berfikir..." }, { quoted: m })

  try {
    let res = await axios.get(`https://api.deline.web.id/ai/copilot?text=${encodeURIComponent(text)}`)
    let result = res.data?.result || "Gagal mendapatkan jawaban."
    await conn.sendMessage(m.chat, { text: result, edit: thinking.key })
  } catch (e) {
    await conn.sendMessage(m.chat, { text: "Terjadi kesalahan saat memproses permintaan.", edit: thinking.key })
  }
}

handler.help = ['copilot'];
handler.tags = ['ai'];
handler.command = /^(copilot)$/i;
handler.register = true;
handler.limit = true

export default handler;
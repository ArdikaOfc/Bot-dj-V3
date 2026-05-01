import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply('Masukkan pesan yang ingin disampaikan kepada Claude AI')
try {
let res = await fetch('https://omegatech-api.dixonomega.tech/api/ai/Claude-pro?prompt=' + encodeURIComponent(text) + '&sessionId=' + m.sender)
let json = await res.json()
if (json.success) {
m.reply(json.response)
} else {
throw 'Gagal mendapatkan respon dari AI'
}
} catch (e) {
throw 'Terjadi kesalahan sistem'
}
}

handler.help = ['claude']
handler.tags = ['ai']
handler.command = /^(claude)$/i

export default handler
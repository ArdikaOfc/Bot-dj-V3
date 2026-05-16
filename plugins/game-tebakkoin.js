let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!args[0]) return m.reply('Pilih koin: depan atau belakang?\nContoh: ' + usedPrefix + command + ' depan')
let pilihan = args[0].toLowerCase()
if (pilihan !== 'depan' && pilihan !== 'belakang') return m.reply('Pilihan tidak valid! Gunakan depan atau belakang.')
let koin = ['depan', 'belakang']
let hasil = koin[Math.floor(Math.random() * koin.length)]
let gambar = hasil === 'depan' ? 'https://www.pic.surf/eVx53i' : 'https://www.pic.surf/f21bEz'
let user = global.db.data.users[m.sender]
if (pilihan === hasil) {
user.limit = (user.limit || 0) + 1
user.money = (user.money || 0) + 1000
user.exp = (user.exp || 0) + 100
await conn.sendFile(m.chat, gambar, 'koin.jpg', 'Selamat kamu benar!\nHasil koin adalah: ' + hasil + '\n\nHadiah:\n+ 1 Limit\n+ 1000 Money\n+ 100 Exp', m)
} else {
await conn.sendFile(m.chat, gambar, 'koin.jpg', 'Sayang sekali kamu salah!\nHasil koin adalah: ' + hasil + '\nCoba lagi keberuntunganmu!', m)
}
}
handler.help = ['tebakkoin <depan/belakang>']
handler.tags = ['game']
handler.command = /^tebakkoin$/i
handler.register = true
export default handler
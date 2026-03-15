import moment from 'moment-timezone'

export async function before(m) {
    if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return

    let user = global.db.data.users[m.sender]

    if (new Date() - user.pc < 86400000) return // waktu ori 21600000 (6 jam)
    await m.reply(`
📮Note: Jangan spam botnya
⏩Ketik *.menu* untuk menampilkan menu
📂Script : Join nah gb sc free gueh https://chat.whatsapp.com/ITDnYU2kXuj97Gb2Xw8yzQ

📝Ingin menghilangkan *limit*?
Beli akses *Premium*

Ketik *.premium* untuk info lebih lengkap
`)
    user.pc = new Date * 1
}


function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    let res = "Selamat dinihari 🌆"
    if (time >= 4) {
        res = "Selamat pagi 🌄"
    }
    if (time > 10) {
        res = "Selamat siang ☀️"
    }
    if (time >= 15) {
        res = "Selamat sore 🌇"
    }
    if (time >= 18) {
        res = "Selamat malam 🌙"
    }
    return res
        }

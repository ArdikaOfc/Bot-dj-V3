import fs from 'fs'

let handler = async (m, { conn }) => {
    let pathSewa = './lib/database/sewa.json'
    if (!fs.existsSync(pathSewa)) return m.reply('Belum ada data sewa.')

    let sewaData = JSON.parse(fs.readFileSync(pathSewa))
    if (sewaData.length === 0) return m.reply('Daftar sewa kosong.')

    let now = Date.now()
    let list = sewaData.map((v, i) => {
        let sisa = v.expired - now
        let expired = new Date(v.expired).toLocaleString('id-ID', { 
            timeZone: 'Asia/Jakarta',
            dateStyle: 'medium',
            timeStyle: 'short'
        })
        return `${i + 1}. ID: ${v.id}\nExpired: ${expired}\nSisa: ${msToDate(sisa)}`
    }).join('\n\n')

    m.reply(`DAFTAR SEWA AKTIF\n\n${list}\n\nTotal: ${sewaData.length} Grup`)
}

handler.help = ['listsewa']
handler.tags = ['owner']
handler.command = /^(listsewa)$/i
handler.owner = true

export default handler

function msToDate(ms) {
    let d = Math.floor(ms / 86400000)
    let h = Math.floor(ms / 3600000) % 24
    let m = Math.floor(ms / 60000) % 60
    return `${d} Hari ${h} Jam ${m} Menit`
}
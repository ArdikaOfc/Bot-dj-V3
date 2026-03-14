import fs from 'fs'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let path = './lib/database/sewa.json'
    if (!fs.existsSync(path)) return m.reply('Data sewa tidak ditemukan.')
    
    let sewa = JSON.parse(fs.readFileSync(path))
    if (!text) return m.reply(`Masukkan ID Grup!\nContoh: *${usedPrefix + command}* 123456789@g.us`)

    let index = sewa.findIndex(s => s.id === text.trim())

    if (index === -1) {
        return m.reply('ID Grup tersebut tidak ditemukan dalam daftar sewa.')
    }

    sewa.splice(index, 1)
    fs.writeFileSync(path, JSON.stringify(sewa, null, 2))
    
    m.reply(`Berhasil menghapus sewa untuk ID:\n${text}`)
}

handler.help = ['delsewa']
handler.tags = ['owner']
handler.command = ['delsewa']
handler.rowner = true

export default handler
import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i
    let match = (text || '').match(linkRegex)
    
    if (!match) return m.reply(`Masukkan link grup!\nContoh: *${usedPrefix + command}* link 30d`)

    let inviteCode = match[1]
    let timeMatch = (text || '').match(/(\d+)(d|h|m|s)/i)
    
    if (!timeMatch) return m.reply(`Masukkan durasi sewa!\nContoh: *${usedPrefix + command}* link 1h`)

    let timeStr = timeMatch[0]
    let duration = parseMs(timeStr)

    try {
        let dataGrup = await conn.groupGetInviteInfo(inviteCode)
        let id = dataGrup.id
        if (!id.endsWith('@g.us')) id += '@g.us'

        try {
            await conn.groupAcceptInvite(inviteCode)
        } catch (e) {}

        const dbPath = './lib/database/sewa.json'
        const dir = './lib/database'
        
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify([], null, 2))
        
        let sewa = JSON.parse(fs.readFileSync(dbPath))
        let now = Date.now()
        let index = sewa.findIndex(s => s.id === id)

        if (index !== -1) {
            sewa[index].expired += duration
        } else {
            sewa.push({ id, expired: now + duration })
            index = sewa.length - 1
        }

        fs.writeFileSync(dbPath, JSON.stringify(sewa, null, 2))

        let expiryDate = new Date(sewa[index].expired).toLocaleString('id-ID', { 
            timeZone: 'Asia/Jakarta',
            dateStyle: 'full',
            timeStyle: 'short'
        })
        
        let caption = `BERHASIL SEWA\n\nID: ${id}\nDurasi: ${timeStr}\nExpired: ${expiryDate}`

        await m.reply(caption)
        await conn.sendMessage(id, { text: `Bot berhasil disewa selama ${timeStr}.\nExpired: ${expiryDate}` })

    } catch (e) {
        console.error(e)
        return m.reply(`Gagal! Pastikan link benar.`)
    }
}

handler.help = ['addsewa']
handler.tags = ['owner']
handler.command = /^addsewa$/i
handler.rowner = true

export default handler

function parseMs(str) {
    let match = str.match(/^(\d+)(d|h|m|s)$/i)
    if (!match) return 0
    let val = parseInt(match[1])
    let type = match[2].toLowerCase()
    switch (type) {
        case 'd': return val * 86400000
        case 'h': return val * 3600000
        case 'm': return val * 60000
        case 's': return val * 1000
        default: return 0
    }
}
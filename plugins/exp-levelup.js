import { Canvas, loadImage } from 'skia-canvas'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
let user = global.db.data.users[m.sender]
if (!user) return
let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
if (before === user.level) {
let { min, xp, max } = xpRange(user.level, global.multiplier)
return m.reply(`Level ${user.level}\nXP ${user.exp + min} / ${max + min}`)
}
let pp = 'https://github.com/ArdikaOfc/Bot-dj-V3/blob/main/src%2Favatar_contact.png'
try {
pp = await conn.profilePictureUrl(m.sender, 'image')
} catch (e) {}
let bg = 'https://cdn.nekohime.site/file/RPG-KCmY.jpeg'
const canvas = new Canvas(800, 400)
const ctx = canvas.getContext('2d')
const backgroundImage = await loadImage(bg)
ctx.drawImage(backgroundImage, 0, 0, 800, 400)
ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
ctx.beginPath()
ctx.roundRect(40, 40, 720, 320, 30)
ctx.fill()
const avatar = await loadImage(pp)
ctx.save()
ctx.beginPath()
ctx.arc(160, 200, 90, 0, Math.PI * 2)
ctx.closePath()
ctx.clip()
ctx.drawImage(avatar, 70, 110, 180, 180)
ctx.restore()
ctx.fillStyle = '#FFFFFF'
ctx.font = 'bold 60px Arial'
ctx.fillText('LEVEL UP', 300, 160)
ctx.font = '35px Arial'
ctx.fillText(`${m.name.substring(0, 20)}`, 300, 220)
ctx.fillStyle = '#00FFA3'
ctx.font = 'bold 50px Arial'
ctx.fillText(`LVL ${before} ➜ ${user.level}`, 300, 290)
let buffer = await canvas.toBuffer('png')
await conn.sendMessage(m.chat, { image: buffer, caption: `Selamat @${m.sender.split('@')[0]} telah naik level!`, mentions: [m.sender] }, { quoted: m })
}

handler.help = ['levelup'];
handler.tags = ['info','main'];
handler.command = /^lvl|level(up)?$/i;

export default handler;

function canLevelUp(level, xp, multiplier = 1) {
if (level < 0) return false
if (xp < 0) return false
if (xp < xpRange(level, multiplier).max) return false
return true
}

function xpRange(level, multiplier = 1) {
if (level < 0) return { min: +1, xp: +1, max: +1 }
let min = level === 0 ? 0 : Math.pow(level, 2) * 100 * multiplier
let max = Math.pow(level + 1, 2) * 100 * multiplier
return { min, xp: max + min, max }
}
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'
import fetch from 'node-fetch'
import fs from 'fs'
import { createSticker, StickerTypes } from 'wa-sticker-formatter'
import path from 'path'

const __dirname = './tmp'
const fontPath = path.join(__dirname, 'patrick.ttf')
const template = 'https://cdn.nekohime.site/file/D0h6tnK8.png'

async function getBuffer(url) {
  const res = await fetch(url)
  if (!res.ok) throw 'Gagal ambil template'
  return Buffer.from(await res.arrayBuffer())
}

async function loadFont() {
  if (!fs.existsSync(__dirname)) {
    fs.mkdirSync(__dirname, { recursive: true })
  }

  if (!fs.existsSync(fontPath)) {
    const res = await fetch('https://github.com/google/fonts/raw/main/ofl/patrickhand/PatrickHand-Regular.ttf')
    const buff = await res.arrayBuffer()
    fs.writeFileSync(fontPath, Buffer.from(buff))
  }

  GlobalFonts.registerFromPath(fontPath, 'Hand')
}

function wrapText(ctx, text, maxWidth) {
  let words = text.split(' ')
  let lines = []
  let line = ''

  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' '
    let width = ctx.measureText(testLine).width

    if (width > maxWidth && n > 0) {
      lines.push(line)
      line = words[n] + ' '
    } else {
      line = testLine
    }
  }

  lines.push(line)
  return lines
}

async function makeMeme(text) {
  await loadFont()

  const buffer = await getBuffer(template)
  const bg = await loadImage(buffer)

  const canvas = createCanvas(bg.width, bg.height)
  const ctx = canvas.getContext('2d')

  ctx.drawImage(bg, 0, 0)

  ctx.fillStyle = '#111'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '70px Hand'

  const maxWidth = 520
  const lines = wrapText(ctx, text, maxWidth)

  const startY = 720

  ctx.save()
  ctx.translate(bg.width / 2, startY)
  ctx.rotate(-0.05)

  ctx.globalAlpha = 0.95
  ctx.shadowColor = 'rgba(0,0,0,0.2)'
  ctx.shadowBlur = 2
  ctx.shadowOffsetY = 1

  lines.forEach((line, i) => {
    ctx.fillText(line.trim(), 0, i * 65)
  })

  ctx.restore()

  return canvas.toBuffer('image/png')
}

let handler = async (m, { conn, text }) => {
    try { 
  if (!text) return m.reply('Contoh:\n.bratcosplay Halo ArdikaOfc')

  await m.reply(global.wait)

  let buffer = await makeMeme(text)
  const stickerBuffer = await createSticker(buffer, {
      type: StickerTypes.FULL,
      pack: global.stickpack,
      author: global.stickauth,
      categories: ['✨'],
      id: '.',
      quality: 70,
      background: null
    })

    await conn.sendFile(m.chat, stickerBuffer, 'sticker.webp', '', m)
    } catch (e) {
    console.error(e)
    m.reply('yahh error')
  }

}

handler.help = ['cosplaybrat <teks>']
handler.tags = ['sticker']
handler.command = ['cosplaybrat','bratcosplay']
handler.limit = true
handler.register = true

export default handler
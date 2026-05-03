/**
 * 🧧 China Encrypt
 */

import fs from 'fs'
import path from 'path'
import JsConfuser from 'js-confuser'
import { fileURLToPath } from 'url'
import { downloadContentFromMessage } from '@adiwajshing/baileys'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m

  if (!q || !q.mtype) {
    return m.reply('❌ Reply atau kirim file .js dengan caption .encchina')
  }

  try {
    const mime = q.mimetype || q.msg?.mimetype || ''
    if (!/javascript|text\/plain/.test(mime)) {
      return m.reply('❌ File harus .js!')
    }

    await m.reply(global.wait)

    let type = q.mtype.replace(/Message/i, '') || 'document'
    let stream = await downloadContentFromMessage(q, type)

    let buffer = Buffer.from([])
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
    }

    const raw = buffer.toString('utf8')

    // 🧧 Mandarin Generator
    const mandarin = ["龙","虎","风","云","山","河","天","地","雷","电"]
    const gen = () =>
      Array.from({ length: 2 + Math.floor(Math.random()*2) },
        () => mandarin[Math.floor(Math.random()*mandarin.length)]
      ).join('')

    const obf = await JsConfuser.obfuscate(raw, {
      target: "node",

      compact: true,
      renameVariables: true,
      renameGlobals: true,
      identifierGenerator: gen,

      stringEncoding: true,
      stringSplitting: true,

      controlFlowFlattening: 0,
      opaquePredicates: false,
      calculator: false
    })

    const code = typeof obf === 'string' ? obf : obf.code

    const fileName = `china-${Date.now()}.js`
    const filePath = path.join(__dirname, fileName)

    fs.writeFileSync(filePath, code)

    await conn.sendMessage(m.chat, {
      document: fs.readFileSync(filePath),
      mimetype: 'application/javascript',
      fileName,
      caption: '✅ China Encrypt Stable 🧧'
    }, { quoted: m })

    fs.unlinkSync(filePath)

  } catch (err) {
    console.error(err)
    m.reply('❌ Error: ' + err.message)
  }
}

handler.help = ['encchina']
handler.tags = ['owner']
handler.command = /^encchina$/i
handler.owner = true

export default handler
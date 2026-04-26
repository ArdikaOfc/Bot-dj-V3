import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let res = await fetch('https://files.catbox.moe/tp3d0c.webp')
  let buffer = await res.buffer()

  await conn.sendMessage(m.chat, { sticker: buffer }, { quoted: m })
}

handler.customPrefix = /^p$/i
handler.command = new RegExp();

export default handler
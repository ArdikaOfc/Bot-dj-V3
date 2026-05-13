import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let res = await fetch('https://cdn.nekohime.site/file/-2I0G1K7.webp')
  let buffer = await res.buffer()

  await conn.sendMessage(m.chat, { sticker: buffer }, { quoted: m })
}

handler.command = /^(sc|script)$/i
handler.tags = ['info']
export default handler
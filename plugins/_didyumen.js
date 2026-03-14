import didyoumean from 'didyoumean'
import fs from 'fs'
import similarity from 'similarity'
import fetch from 'node-fetch'

let handler = m => m

handler.before = async function (m, { match, usedPrefix }) {
  if (!m.text) return
  if ((usedPrefix = (match[0] || '')[0])) {
    let noPrefix = m.text.slice(1).trim()
    if (!noPrefix) return

    let alias = Object.values(global.plugins)
      .filter(v => v.help && !v.disabled)
      .flatMap(v => v.help)

    if (!alias.length) return

    let mean = didyoumean(noPrefix, alias)
    if (!mean) return

    let sim = similarity(noPrefix.toLowerCase(), mean.toLowerCase())
    let similarityPercentage = Math.round(sim * 100)

    if (mean && noPrefix.toLowerCase() !== mean.toLowerCase()) {

      // Ambil gambar thumbnail baru
      let thumb = await fetch("https://files.cloudkuimages.guru/images/87ab7458a894.jpeg")
      let thumbnail = Buffer.from(await thumb.arrayBuffer())

      let caption = `_Apakah maksudmu command ini?_\n\n` +
                 `_ᴄᴏᴍᴍᴀɴᴅ: ${usedPrefix + mean}_\n` +
                 `_ᴋᴇᴍɪʀɪᴘᴀɴ: ${similarityPercentage}%_`

      await this.sendMessage(m.chat, {
    image: fs.readFileSync('./media/botdj2.jpg'),
    caption,
    footer: 'ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻',
    buttons: [
      {
        buttonId: `${usedPrefix + mean}`,
        buttonText: { displayText: `${ mean}` },
        type: 1
      }
    ],
    headerType: 4,
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: 'BOTZ DJ WhatsApp Bot',
        body: 'Simple • Fast • Multifungsi',
        thumbnail: fs.readFileSync('./media/botdj1.jpg'),
        sourceUrl: 'https://t.me/Allenkujou',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
    }
  }
}

export default handler
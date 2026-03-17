import { Sticker } from 'wa-sticker-formatter'
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
    if (m.quoted && m.quoted.text) {
        text = m.quoted.text || 'hai'
    } else if (text) {
        text = text
    } else if (!text && !m.quoted) return m.reply('Reply atau masukkan teks!')

    try {
        await m.react('🕒')

        const response = `https://api.deline.web.id/maker/cewekbrat?text=${encodeURIComponent(text)}`

        let stiker = await createSticker(
            false,
            response,
            "Sticker by: ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻",
            "Creator: ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻",
            10
        )

        if (stiker) {
            await conn.sendFile(m.chat, stiker, 'brathd.webp', '', m)
            await m.react('✅')
        } else {
            await m.react('❌')
        }

    } catch (e) {
        await m.react('❌')
        throw e
    }
}

handler.help = ['bratcewek <text>']
handler.tags = ['sticker']
handler.command = /^(brat(cewek|cewe|cwk))$/i
handler.limit = true
handler.register = true
handler.group = false

export default handler

async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'crop',
        pack: packName,
        author: authorName,
        quality
    }
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}
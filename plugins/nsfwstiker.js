import fetch from 'node-fetch'
import sharp from 'sharp'
import ffmpeg from 'fluent-ffmpeg'
import { writeFileSync, unlinkSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { promisify } from 'util'
import { exec } from 'child_process'

const execPromise = promisify(exec)

let handler = async (m, { conn }) => {
  let api = 'https://www.sankavolereii.my.id/random/nsfw?apikey=planaai'
  try {
    await conn.sendMessage(m.chat, {
      react: { text: '⏳', key: m.key }
    })

    let res = await fetch(api)
    let contentType = res.headers.get('content-type')

    if (!contentType) throw '❌ Tidak bisa membaca Content-Type.'

    let buffer = await res.buffer()

    // File temp
    let tmpFile = join(tmpdir(), `temp_${Date.now()}`)
    let tmpOutput = join(tmpdir(), `sticker_${Date.now()}.webp`)

    if (contentType.startsWith('image/gif')) {
      // Simpan GIF sementara
      let tmpGif = tmpFile + '.gif'
      writeFileSync(tmpGif, buffer)

      // Convert ke webp animasi via ffmpeg
      await execPromise(`ffmpeg -i ${tmpGif} -vf "scale=512:512:force_original_aspect_ratio=decrease" -loop 0 -preset default -an -vsync 0 -s 512x512 ${tmpOutput}`)

      await conn.sendFile(m.chat, tmpOutput, 'nsfw.webp', '*Random NSFW Sticker Animasi 🔞*', m, false, {
        asSticker: true,
        packname: 'ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻',
        author: 'BY ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻'
      })

      unlinkSync(tmpGif)
      unlinkSync(tmpOutput)

    } else if (contentType.startsWith('image/')) {
      // Simpan image sementara
      let tmpImg = tmpFile + '.png'
      writeFileSync(tmpImg, buffer)

      // Convert ke WebP via sharp
      await sharp(tmpImg)
        .webp({ quality: 70 })
        .toFile(tmpOutput)

      await conn.sendFile(m.chat, tmpOutput, 'nsfw.webp', '*Random NSFW Sticker 🔞*', m, false, {
        asSticker: true,
        packname: 'Bot NSFW',
        author: 'ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻'
      })

      unlinkSync(tmpImg)
      unlinkSync(tmpOutput)

    } else {
      throw `❌ Response tidak dikenali atau bukan image/gif: ${contentType}`
    }

    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key }
    })

  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, e.toString(), m)
    await conn.sendMessage(m.chat, {
      react: { text: '❌', key: m.key }
    })
  }
}

handler.help = ['nsfwstiker']
handler.tags = ['nsfw']
handler.command = /^nsfwstiker$/i
handler.limit = true
handler.premium = true

export default handler
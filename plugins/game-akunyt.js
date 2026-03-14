import { loadDB } from '../lib/waifuHelper.js'

let handler = async (m, { conn }) => {
  const wdb = loadDB()
  let userYT = wdb.users?.[m.sender]?.youtube

  if (!userYT) return m.reply('KESALAHAN: Kamu belum memiliki channel YouTube.')

  let pp
  try {
    pp = await conn.profilePictureUrl(m.sender, 'image')
  } catch (e) {
    pp = 'https://files.cloudkuimages.guru/images/604a2923cef9.jpeg'
  }

  let rank = "Bronze Creator"
  if (userYT.subs >= 1000000) rank = "Diamond Play Button"
  else if (userYT.subs >= 500000) rank = "Gold Play Button"
  else if (userYT.subs >= 100000) rank = "Silver Play Button"

  let caption = `*───「 CHANNEL INFO 」───*\n\n`
  caption += `Nama: ${userYT.name}\n`
  caption += `Rank: ${rank}\n`
  caption += `Level: ${userYT.level}\n\n`
  caption += `Statistik Seluruh Waktu:\n`
  caption += `┌ Total *Views*: ${userYT.views.toLocaleString()}\n`
  caption += `│ Total *Likes*: ${(userYT.likes || 0).toLocaleString()}\n`
  caption += `└ *Subscribers*: ${userYT.subs.toLocaleString()}\n`

  conn.sendMessage(m.chat, {
    text: caption.trim(),
    contextInfo: {
      externalAdReply: {
        title: "VESTIA ZETA MULTI DEVICE",
        body: `Channel: ${userYT.name}`,
        thumbnailUrl: pp,
        mediaType: 1,
        previewType: "PHOTO",
        renderLargerThumbnail: true,
        sourceUrl: ""
      }
    }
  }, { quoted: m })
}

handler.help = ['akunyt']
handler.command = ['akunyt']
handler.tags = ['game']

export default handler
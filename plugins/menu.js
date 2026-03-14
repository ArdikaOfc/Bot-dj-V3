import fs from 'fs'

let handler = async (m, { conn }) => {
  let name = await conn.getName(m.sender)

  let hour = new Date().getHours() + 7
  if (hour >= 24) hour -= 24

  let greeting = 'Selamat malam'
  if (hour >= 4 && hour < 11) greeting = 'Selamat pagi'
  else if (hour >= 11 && hour < 15) greeting = 'Selamat siang'
  else if (hour >= 15 && hour < 18) greeting = 'Selamat sore'

  let caption = `
${greeting}, *${name}* 

Aku *Vestia Zeta*, bot WhatsApp yang siap membantu kamu ✨

───〔 🤖 BOT INFO 〕───
• *Nama* : Vestia Zeta
• *Creator* : Allen
• *Versi* : 2.0.0
• *System* : Plugins ESM
──────────────────

📚 *Daftar Menu*
• .allmenu
• .menupasangan 
• .menuanime
• .menurpg
• .menuai
• .menuaudio
• .menudownload
• .menufun
• .menugame
• .menugroup
• .menuinfo
• .menuinternet
• .menumaker
• .menustore
• .menuowner
• .menupanel
• .menusearch
• .menusticker
• .menutools

_Ketik salah satu menu di atas untuk melihat detail_
`.trim()

  await conn.sendMessage(m.chat, {
    image: fs.readFileSync('./media/zeta2.jpg'),
    caption,
    footer: 'Vestia Zeta - MD',
    buttons: [
      {
        buttonId: '.allmenu',
        buttonText: { displayText: '🍂 All Menu' },
        type: 1
      }
    ],
    headerType: 4,
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: 'Vestia Zeta WhatsApp Bot',
        body: 'Simple • Fast • Multifungsi',
        thumbnail: fs.readFileSync('./media/zeta1.jpg'),
        sourceUrl: 'https://t.me/Allenkujou',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })

  try {
    await conn.sendFile(
      m.chat,
      'https://files.catbox.moe/7fje2p.mp3',
      'menu.mp3',
      null,
      m,
      true,
      {
        type: 'audioMessage',
        ptt: true
      }
    )
  } catch (e) {
    console.error(e)
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = /^menu$/i

export default handler
import fs from 'fs'

let handler = async (m, { conn, usedPrefix }) => {
     let name = await conn.getName(m.sender)

  let hour = new Date().getHours() + 7
  if (hour >= 24) hour -= 24

  let greeting = 'Selamat malam'
  if (hour >= 4 && hour < 11) greeting = 'Selamat pagi'
  else if (hour >= 11 && hour < 15) greeting = 'Selamat siang'
  else if (hour >= 15 && hour < 18) greeting = 'Selamat sore'

  let caption = `
  ${greeting}, *${name}* 

Aku *ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻*, bot WhatsApp yang siap membantu kamu ✨

───〔 🤖 BOT INFO 〕───
• *Nama* : ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻
• *Creator* : ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
• *Versi* : 3.0.0
• *System* : Plugins ESM
──────────────────
_Klik salah satu button di bawah ini untuk melihat detail_
`.trim()
await conn.sendMessage(m.chat, {
        image: fs.readFileSync('./media/botdj2.jpg'),
        gifPlayback: true,
			caption,
			footer: 'ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻',
			    mentions: [m.sender],
			contextInfo: {
				forwardingScore: 10,
				isForwarded: true,
			},
			buttons: [{
				buttonId: `${usedPrefix}allmenu`,
				buttonText: { displayText: 'All Menu' },
				type: 1
			},{
				buttonId: `${usedPrefix}owner`,
				buttonText: { displayText: 'OWNER' },
				type: 1
			}, {
				buttonId: 'list_button',
				buttonText: { displayText: 'list' },
				nativeFlowInfo: {
					name: 'single_select',
					paramsJson: JSON.stringify({
						title: 'List Menu',
						sections: [{
							title: 'List Menu',
                            highlight_label: `ᴘᴏᴘᴜʟᴇʀ`,
							rows: [{
								title: 'All Menu',
                                description: 'Menampilka All Menu',
								id: `.allmenu`
							},{
								title: 'Menu Pasangan',
                                description: 'Menampilka Menu Pasangan',
								id: `.menupasangan`
							},{
								title: 'Menu Anime',
                                description: 'Menampilka Menu Anime',
								id: `.menuanime`
							},{
								title: 'Menu Rpg',
                                description: 'Menampilka Menu Rpg',
								id: `.menurpg`
							},{
								title: 'Menu Download',
                                description: 'Menampilka Menu Download',
								id: `.menudownload`
							},{
								title: 'Menu Audio',
                                description: 'Menampilka Menu Audio',
								id: `.menuaudio`
							},{
								title: 'Menu Tools',
                                description: 'Menampilka Menu Tools',
								id: `.menutools`
							},{
								title: 'Menu Ai',
                                description: 'Menampilka Menu Ai',
								id: `.menuai`
							},{
								title: 'Menu Fun',
                                description: 'Menampilka Menu Fun',
								id: `.menufun`
							},{
								title: 'Menu Game',
                                description: 'Menampilka Menu game',
								id: `.menugame`
							},{
								title: 'Menu Group',
                                description: 'Menampilka Menu Group',
								id: `.menugroup`
							},{
                                title: 'Menu Maker',
                                description: 'Menampilka Menu Maker',
								id: `.menumaker`
							},{
								title: 'Menu Info',
                                description: 'Menampilka Menu Info',
								id: `.menuinfo`
							},{
								title: 'Menu Internet',
                                description: 'Menampilka Menu Internet',
								id: `.menuinternet`
							},{
                                title: 'Menu Store',
                                description: 'Menampilka Menu Store',
								id: `.menustore`
							},{
                                title: 'Menu Panel',
                                description: 'Menampilka Menu Panel',
								id: `.menupanel`
							},{
                                title: 'Menu Search',
                                description: 'Menampilka Menu Search',
								id: `.menusearch`
							},{
                                title: 'Menu Sticker',
                                description: 'Menampilka Menu Sticker',
								id: `.menusticker`
							},{
								title: 'Menu Owner',
                                description: 'Menampilka Menu Owner',
								id: `.menuowner`
							}]
						}]
					})
				},
				type: 2
			}],
                headerType: 4,
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: 'ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻ WhatsApp Bot',
        body: 'Simple • Fast • Multifungsi',
        thumbnail: fs.readFileSync('./media/botdj1.jpg'),
        sourceUrl: 'https://wa.me/6283115862272',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
		}, { quoted: m })
        
          try {
    await conn.sendMessage(m.chat, {
    audio: { url: `https://raw.githubusercontent.com/Bell575/dat1/main/uploads/4c34d9-1761702925460.opus` },
    mimetype: 'audio/mpeg',
    ptt: true
  }, { quoted: m })
  } catch (e) {
    console.error(e)
  }
        
        }
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^menu$/i

export default handler
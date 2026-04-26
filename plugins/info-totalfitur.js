import fs from 'fs'

let handler = async (m, { conn }) => {
  try {
    await m.react('🕒')

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

    let name = await conn.getName(who);
let totalCommand = Object.values(global.plugins)
    .map(v => v.command)
    .filter(v => v)
    .map(v => Array.isArray(v) ? v.length : 1)
    .reduce((a, b) => a + b, 0)

    let fitur = Object.values(plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1);

    let totalf = Object.values(global.plugins).filter(

        (v) => v.help && v.tags

    ).length;

    let txt = `*乂  D J B O T Z  -  F E A T U R E*\n\n`;

    txt += `  • ᴄʀᴇᴀᴛᴏʀ : ᴿꜰ᭄༺ArdikaOfcོ ×፝֟͜×༻\n`;

    await m.react('✅')

    const stats = [
      `🔧 𝑻𝑶𝑻𝑨𝑳 𝑭𝑰𝑻𝑼𝑹 : ${fitur.length}`,
      `📖 𝑻𝑶𝑻𝑨𝑳 𝑪𝑶𝑴𝑴𝑨𝑵𝑫 : ${totalCommand}`
    ]

    const content = {
      pollResultSnapshotMessage: {
        pollVotes: stats.map(v => ({
          optionName: v,
          optionVoteCount: Math.floor(Math.random() * 90000) + 10000
        })),
        name: txt,
        contextInfo: {
          forwardingScore: 127,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363199397739684@newsletter",
            serverMessageId: 0,
            newsletterName: "ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻"
          },
          forwardOrigin: 0
        },
        pollType: 0
      }
    }

    await conn.relayMessage(m.chat, content, {})

  } catch (e) {
    console.error(e)
    m.reply('Terjadi error.')
  }
}

handler.help = ['totalfitur'];

handler.tags = ['main', 'info'];

handler.command = /^(totalfitur)$/i;

export default handler;
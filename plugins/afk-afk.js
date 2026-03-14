import moment from 'moment';
import fs from 'fs';
import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    let user = global.db.data.users[m.sender] || {};
    
    // Set AFK
    user.afk = +new Date();
    user.afkReason = text || '';
    global.db.data.users[m.sender] = user;

    // Ambil username
    let username = user.registered ? user.name || conn.getName(m.sender) : conn.getName(m.sender);

    let thumb;
    try {
        let url = await conn.profilePictureUrl(m.sender, 'image');
        let response = await fetch(url);
        thumb = Buffer.from(await response.arrayBuffer());
    } catch {
        thumb = fs.readFileSync('./src/avatar_contact.png');
    }

    let caption = `
*AFK MODE*

_🌿 Username : ${username}_
_📝 Alasan : ${text || '-'}_
`.trim();

    await conn.sendMessage(
        m.chat,
        {
            text: caption,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: false,
                forwardedNewsletterMessageInfo: {
                    newsletterName: `「 VESTIA ZETA - MD 」`,
                    newsletterJid: "120363405424415956@newsletter"
                },
                externalAdReply: {
                    title: `ᴠᴇsᴛɪᴀ ᴢᴇᴛᴀ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ`,
                    body: `${moment().format('dddd, MMMM Do YYYY, HH:mm')}`,
                    previewType: "PHOTO",
                    thumbnail: thumb
                }
            }
        },
        { quoted: m }
    );
}

handler.help = ['afk <alasan>'];
handler.tags = ['main'];
handler.command = /^afk$/i;

export default handler;
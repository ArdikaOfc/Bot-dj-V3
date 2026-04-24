import fs from 'fs';

import fetch from 'node-fetch';

import moment from 'moment-timezone';

let handler = async (m, { conn, text, usedPrefix, command }) => {
await m.react('⏳')

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

    let txt = `*乂  B O T  D J -  F E A T U R E*\n\n`;

    txt += `  • ᴄʀᴇᴀᴛᴏʀ : ᴿꜰ᭄༺ArdikaOfcོ ×፝֟͜×༻\n`;
    await m.react('✅')

    await conn.relayMessage(m.chat,{
pollResultSnapshotMessage:{
pollVotes:[
{optionName:"𝚃𝙾𝚃𝙰𝙻 𝙵𝙸𝚃𝚄𝚁",optionVoteCount:`${fitur.length}`},
{optionName:"𝚃𝙾𝚃𝙰𝙻 𝙲𝙾𝙼𝙼𝙰𝙽𝙳",optionVoteCount:`${totalCommand}`},
],
name:txt,
pollType:0
}
},{})
}

handler.help = ['totalfitur2'];

handler.tags = ['main', 'info'];

handler.command = /^(totalfitur2)$/i;

export default handler;
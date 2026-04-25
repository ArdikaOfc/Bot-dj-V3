import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let chat = global.db.data.chats[m.chat]
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `reply video/voice note you want to convert to audio/mp3 with caption *${usedPrefix + command}*`
    let media = await q.download?.()
    if (!media) throw 'Can\'t download media'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw 'Can\'t convert media to audio'
    //conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4' })
    m.reply('Sedang di proses...')
    
        conn.sendFile(m.chat, audio.data, 'toptt.ptt', '', m, null, { mimetype: 'audio/ogg; codecs=opus' })
}
handler.help = ['tovn (reply)']
handler.tags = ['audio']

handler.command = /^to(ptt|vn)$/i
handler.register = false 

export default handler

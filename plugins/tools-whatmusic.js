/**
 ╔══════════════════════
      ⧉  [whatmusic] — [tools]
╚══════════════════════

  ✺ Type     : Plugin ESM
  ✺ Source   : https://whatsapp.com/channel/0029VbAXhS26WaKugBLx4E05
  ✺ Creator  : SXZnightmare
  ✺ Scrape      : 
  [ https://gist.github.com/ZenzzXD/3bab320795a91d75c6dadffdfadb7041 ]
  [ https://whatsapp.com/channel/0029Vap84RE8KMqfYnd0V41A/3177 ]
  ✺ Scrape Maker : [ Zenz ]
  ✺ Watermark : https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v by: ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
  Note: *Dilarang* hapus wm ini
*/

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!/audio|video/.test(mime)) return m.reply(`*Contoh: kirim/reply audio/video dengan perintah ${usedPrefix + command}*`)
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        let media = await q.download()
        let form = new FormData()
        form.append('file', new Blob([media]), 'audio.mp3')
        form.append('sample_size', '118784')

        let res = await fetch('https://api.doreso.com/humming', {
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36',
                'accept': 'application/json, text/plain, */*',
                'origin': 'https://www.aha-music.com',
                'referer': 'https://www.aha-music.com/'
            },
            body: form
        })

        let json = await res.json()

        if (!json?.data?.title) {
            return m.reply(`*🍂 Gagal Mendeteksi Musik*`)
        }

        let hasil = `
*🎵 WHAT MUSIC DETECTED*
*🎤 Artist:* ${json.data.artists || 'Tidak Diketahui'}
*🎧 Title:* ${json.data.title || 'Tidak Diketahui'}
*🆔 Track ID:* ${json.data.acrid}
`.trim()

        await m.reply(hasil)

    } catch (e) {
        m.reply(`*🍂 Terjadi Kesalahan Saat Mendeteksi Musik*`)
    } finally {
        await conn.sendMessage(m.chat, { react: { text: '', key: m.key } })
    }
}

handler.help = ['whatmusic'];
handler.tags = ['tools'];
handler.command = /^(whatmusic|whatmusik|wmusic)$/i;
handler.limit = true;
handler.register = true; // true kan jika ada fitur register atau daftar di bot mu.

export default handler
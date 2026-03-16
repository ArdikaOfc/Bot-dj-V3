/*
Wm: https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
Jgn hapus wm ku
Fitur:  Register/Daftar 
Type : Plugins Esm 
Creator: ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
*/

import { createHash } from 'crypto'
import moment from 'moment-timezone'

let Reg = /^([\w\s]+).(\d{1,3})$/i

let handler = async function (m, { text, usedPrefix, command, conn }) {
  let d = new Date(new Date() + 3600000)
  let locale = 'id'
  let week = d.toLocaleDateString(locale, { weekday: 'long' })
  let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
  let wktuwib = moment.tz('Asia/Jakarta').format('HH [H] mm [M] ss [S]')

  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')

  if (user.registered)
    throw `❗ Kamu sudah terdaftar!\n\nMau daftar ulang?\nKetik:\n${usedPrefix}unreg ${sn}`

  if (!Reg.test(text)) {
    return m.reply(
      `Ketik dengan format:\n\n${usedPrefix + command} namamu.umurmu\n\nContoh:\n${usedPrefix + command} ArdikaOfc.20`
    )
  }

  let [, name, ageStr] = text.match(Reg)
  let age = parseInt(ageStr)

  if (!name || !age) return m.reply('*Nama atau umur tidak valid!*')
  if (name.length > 100) return m.reply('Nama maksimal 100 karakter.')
  if (age < 13 || age > 100) return m.reply('Umur harus antara 13 - 100 tahun.')

  user.name = name.trim()
  user.age = age
  user.regTime = +new Date()
  user.registered = true

  let caption = `
「 *PENDAFTARAN BERHASIL* 」
│ ✅ *Status:* Terdaftar
│ ✨ *Nama:* ${name}
│ 🎂 *Umur:* ${age} Tahun
│ 🔐 *SN Key:* ${sn}
│
│ 📅 *Tanggal:* ${week}, ${date}
│ ⏰ *Waktu:* ${wktuwib}

Selamat datang di sistem bot!
Data kamu sudah tersimpan di database.
Semoga harimu menyenangkan~!
`.trim()

  await conn.sendMessage(
    m.chat,
    {
      text: caption,
      footer: 'Pilih tombol di bawah untuk lanjut:',
      buttons: [
        {
          buttonId: '.allmenu',
          buttonText: { displayText: '📂 Menu Utama' },
          type: 1
        }
      ],
      contextInfo: {
        externalAdReply: {
          title: 'ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻',
          body: '',
          thumbnailUrl: 'https://raw.githubusercontent.com/ArdikaOfc/Database/main/uploads/4990a6-1773646647303.jpg',
          mediaType: 1,
          previewType: 'PHOTO',
          renderLargerThumbnail: true,
          sourceUrl: ''
        }
      }
    },
    { quoted: m }
  )
}

handler.help = ['daftar']
handler.tags = ['main']
handler.command = /^(daftar|verify|reg(ister)?)$/i

export default handler
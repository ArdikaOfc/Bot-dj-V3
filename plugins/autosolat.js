import moment from "moment-timezone"

export async function before(m) {
  this.autosholat = this.autosholat || {}

  const who = m.mentionedJid?.[0] || (m.fromMe ? this.user.jid : m.sender)
  const id = m.chat
  const now = Date.now()

  if (id in this.autosholat && now - this.autosholat[id].timestamp < 300000) return false

  const jadwalSholat = {
    Subuh: "04:42",
    Dhuhr: "12:03",
    Asr: "15:09",
    Maghrib: "18:08",
    Isha: "19:38",
    Imsak: "04:32",
  }

  const timeNow = moment().tz("Asia/Jakarta").format("HH:mm")

  if (Object.values(jadwalSholat).includes(timeNow)) {
    const sholat = Object.keys(jadwalSholat).find(
      key => jadwalSholat[key] === timeNow
    )

    const caption = `@${who.split`@`[0]},\nWaktu *${sholat}* telah tiba, ambillah air wudhu dan segeralah shalat.\n\n*${timeNow}*\n_untuk wilayah Jakarta dan sekitarnya._`

    const thumb = await (await this.getFile("https://qu.ax/D0fDL")).data

    this.autosholat[id] = {
      msg: await this.sendMessage(m.chat, {
        text: caption,
        mentions: [who],
        contextInfo: {
          externalAdReply: {
            title: "VESTIA ZETA MULTI DEVICE",
            body: `Pengingat Sholat ${sholat}`,
            thumbnailurl: "https://files.cloudkuimages.guru/images/39063b335d1b.jpeg",
            mediaType: 1,
            previewType: "PHOTO",
            renderLargerThumbnail: true,
            sourceUrl: ""
          }
        }
      }),
      timestamp: now
    }

    setTimeout(() => delete this.autosholat[id], 57000)
  }
}

export const disabled = false
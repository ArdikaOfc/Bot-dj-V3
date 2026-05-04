let handler = m => m

handler.before = async function (m, { conn }) {
    let ownerNumber = global.nomorown
    let jidOwner = ownerNumber + '@s.whatsapp.net'

    let isOwnerChatting = m.sender === jidOwner
    let isMention = m.mentionedJid && m.mentionedJid.includes(jidOwner)
    let isReply = m.quoted && m.quoted.sender === jidOwner

    this.tagOwnerCooldown = this.tagOwnerCooldown || {}
    let cooldown = 3600000
    let lastTag = this.tagOwnerCooldown[m.sender]

    if (isOwnerChatting || isMention || isReply) {
        if (lastTag && (Date.now() - lastTag < cooldown)) return true

        if (global.autotyping) await conn.sendPresenceUpdate('composing', m.chat)
        if (global.autorecording) await conn.sendPresenceUpdate('recording', m.chat)

        if (isOwnerChatting) {
            let teksOwner = [
                "Akses Developer terverifikasi.\nSistem siap dijalankan.",
                "Selamat datang, Developer.\nBot dalam kondisi optimal.",
                "Developer online.\nMenunggu instruksi selanjutnya.",
                "Kehadiran Developer terdeteksi.\nSemua modul aktif dan stabil."
            ]
            let pilih = teksOwner[Math.floor(Math.random() * teksOwner.length)]
                                            await conn.sendMessage(m.chat, {

                                        text: pilih,
              footer: 'Powered by ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻',

                                        buttons: [{

                                                buttonId: '.allmenu',

                                                buttonText: { displayText: 'All Menu' },

                                                type: 1

                                        },{

                                                buttonId: '.backup',

                                                buttonText: { displayText: 'Backup Sc' },

                                                type: 1

                                        }]

                                }, { quoted: m });

        } else if (isMention || isReply) {
            let teksTag = [
                `@${m.sender.split('@')[0]}, Developer sedang offline.\nSilakan tinggalkan pesan.`,
                "Developer belum dapat dihubungi saat ini.\nMohon tidak mengulang panggilan.",
                "Permintaan Anda telah dicatat sistem.\nDeveloper akan meninjaunya nanti.",
                "Developer tidak tersedia untuk saat ini.\nTerima kasih atas pengertiannya."
            ]
            let pilih = teksTag[Math.floor(Math.random() * teksTag.length)]
            await conn.sendMessage(m.chat, {

                                        text: pilih,
              footer: 'Powered by ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻',

                                        buttons: [{

                                                buttonId: '.allmenu',

                                                buttonText: { displayText: 'All Menu' },

                                                type: 1

                                        },{

                                                buttonId: '.owner',

                                                buttonText: { displayText: 'Owner' },

                                                type: 1

                                        }]

                                }, { mentions: [m.sender] }, { quoted: m });
                            }


        this.tagOwnerCooldown[m.sender] = Date.now()
    }

    return true
}

export default handler
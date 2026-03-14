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
                "Akses Owner terverifikasi.\nSistem siap dijalankan.",
                "Selamat datang, Owner.\nBot dalam kondisi optimal.",
                "Owner online.\nMenunggu instruksi selanjutnya.",
                "Kehadiran Owner terdeteksi.\nSemua modul aktif dan stabil."
            ]
            let pilih = teksOwner[Math.floor(Math.random() * teksOwner.length)]
            await conn.reply(m.chat, pilih, m)
        } else if (isMention || isReply) {
            let teksTag = [
                `@${m.sender.split('@')[0]}, Owner sedang offline.\nSilakan tinggalkan pesan.`,
                "Owner belum dapat dihubungi saat ini.\nMohon tidak mengulang panggilan.",
                "Permintaan Anda telah dicatat sistem.\nOwner akan meninjaunya nanti.",
                "Owner tidak tersedia untuk saat ini.\nTerima kasih atas pengertiannya."
            ]
            let pilih = teksTag[Math.floor(Math.random() * teksTag.length)]
            await conn.reply(m.chat, pilih, m, { mentions: [m.sender] })
        }

        this.tagOwnerCooldown[m.sender] = Date.now()
    }

    return true
}

export default handler
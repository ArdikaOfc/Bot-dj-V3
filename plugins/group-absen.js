let handler = async (m, { conn, usedPrefix, command, text }) => {
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat

    if (command === 'absen') {
        if (!(id in conn.absen)) {
            return conn.sendMessage(m.chat, { text: `*⚠️ Tidak ada absen berlangsung!*\nKetik *${usedPrefix}mulaiabsen* untuk memulai.` }, { quoted: m })
        }

        let absen = conn.absen[id][1]
        if (absen.includes(m.sender)) {
            return conn.sendMessage(m.chat, { text: '❌ Kamu sudah absen sebelumnya!' }, { quoted: m })
        }

        absen.push(m.sender)
        let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
        
        conn.sendMessage(m.chat, { 
            text: `✅ *Berhasil Absen!*\n\n*📋 DAFTAR ABSEN:*\n${list}\n\nKetik *${usedPrefix}cekabsen* untuk melihat daftar.`,
            mentions: [m.sender]
        }, { quoted: m })
    }

    if (command === 'mulaiabsen') {
        if (id in conn.absen) {
            return conn.sendMessage(m.chat, { text: `*⚠️ Masih ada absen berlangsung!*` }, { quoted: m })
        }
        
        conn.absen[id] = [
            text ? text : 'Absen Harian',
            []
        ]
        
        conn.sendMessage(m.chat, { text: `✅ *Absen dimulai!*\n\nKeterangan: *${conn.absen[id][0]}*\nKetik *${usedPrefix}absen* untuk mengisi kehadiran.\n\n_Data ini akan terhapus otomatis dalam 24 jam._` }, { quoted: m })

        // Fungsi Auto-Hapus setelah 24 Jam
        setTimeout(() => {
            if (conn.absen[id]) {
                delete conn.absen[id]
                conn.sendMessage(id, { text: '⏰ *Waktu absen telah berakhir (24 Jam).* Data absen telah dihapus otomatis.' })
            }
        }, 24 * 60 * 60 * 1000)
    }

    if (command === 'cekabsen') {
        if (!(id in conn.absen)) {
            return conn.sendMessage(m.chat, { text: `*⚠️ Tidak ada absen berlangsung!*` }, { quoted: m })
        }
        
        let [ket, absen] = conn.absen[id]
        let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
        
        conn.sendMessage(m.chat, { 
            text: `📋 *DAFTAR ABSEN*\nKeterangan: *${ket}*\n\n${list || '│ (Belum ada yang absen)'}`, 
            mentions: absen 
        }, { quoted: m })
    }

    if (command === 'hapusabsen') {
        if (!(id in conn.absen)) {
            return conn.sendMessage(m.chat, { text: `*⚠️ Tidak ada absen berlangsung!*` }, { quoted: m })
        }
        delete conn.absen[id]
        conn.sendMessage(m.chat, { text: '✅ *Data absen berhasil dihapus.*' }, { quoted: m })
    }
}

handler.help = ['absen', 'mulaiabsen', 'cekabsen', 'hapusabsen']
handler.tags = ['group']
handler.command = /^(absen|mulaiabsen|cekabsen|hapusabsen)$/i
handler.group = true

export default handler
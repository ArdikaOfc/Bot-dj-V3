import similarity from 'similarity'

const threshold = 0.72 // semakin tinggi semakin mirip

export async function before(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (!(id in this.game)) return true

    let room = this.game[id]
    let text = m.text?.toLowerCase().replace(/[^\w\s\-]+/g, '')
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)

    if (!isSurrender) {
        let index = room.jawaban.indexOf(text)
        if (index < 0) {
            let sim = Math.max(
                ...room.jawaban
                    .filter((_, i) => !room.terjawab[i])
                    .map(j => similarity(j, text))
            )
            if (sim >= threshold) m.reply('Dikit lagi!')
            return true
        }

        if (room.terjawab[index]) return true

        let user = global.db.data.users[m.sender]
        room.terjawab[index] = m.sender
        user.exp += room.winScore
    }

    let isWin = room.terjawab.every(v => v)

    let caption = `
*Soal:* ${room.soal}
Terdapat *${room.jawaban.length}* jawaban
${isWin ? '*🎉 SEMUA JAWABAN TERJAWAB!*' : isSurrender ? '*🏳️ MENYERAH!*' : ''}

${room.jawaban.map((j, i) =>
        isWin || isSurrender || room.terjawab[i]
            ? `(${i + 1}) ${j} ${room.terjawab[i] ? '@' + room.terjawab[i].split('@')[0] : ''}`
            : null
    ).filter(Boolean).join('\n')}

${isWin || isSurrender ? '' : `+${room.winScore} XP tiap jawaban benar`}
`.trim()

    let msg = await this.reply(m.chat, caption, null, {
        mentions: this.parseMention(caption)
    })

    room.msg = msg

    //  clear timer 
    if (isWin || isSurrender) {
        if (room.timeout) clearTimeout(room.timeout)
        delete this.game[id]
    }

    return true
}
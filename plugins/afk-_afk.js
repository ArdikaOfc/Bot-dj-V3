const DB = global.db.data.users;

function formatDuration(ms) {
    let seconds = Math.floor(ms / 1000)

    const days = Math.floor(seconds / 86400)
    seconds %= 86400

    const hours = Math.floor(seconds / 3600)
    seconds %= 3600

    const minutes = Math.floor(seconds / 60)
    seconds %= 60

    const result = []
    if (days) result.push(`${days} hari`)
    if (hours) result.push(`${hours} jam`)
    if (minutes) result.push(`${minutes} menit`)
    if (seconds) result.push(`${seconds} detik`)

    return result.join(' ')
}

let handler = m => m;

handler.before = m => {
    const user = DB[m.sender];

    // Reset AFK jika user aktif
    if (user && user.afk > -1) {
        const duration = formatDuration(Date.now() - user.afk);
        m.reply(`
Kamu berhenti AFK${user.afkReason ? ' setelah ' + user.afkReason : ''}
Selama ${duration}
        `.trim());
        user.afk = -1;
        user.afkReason = '';
    }

    // Notifikasi jika men-tag user AFK
    const jids = [...new Set([
        ...(m.mentionedJid || []),
        ...(m.quoted ? [m.quoted.sender] : [])
    ])];

    for (const jid of jids) {
        const taggedUser = DB[jid];
        if (!taggedUser || taggedUser.afk < 0) continue;

        const duration = formatDuration(Date.now() - taggedUser.afk);
        const reason = taggedUser.afkReason || '';
        m.reply(`
Jangan tag dia!
Dia sedang AFK ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'}
Selama ${duration}
        `.trim());
    }

    return true;
};

export default handler;
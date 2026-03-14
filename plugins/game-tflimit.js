let handler = async (m, { conn, args }) => {
  let who
  let amount

  // ===== Ambil target =====
  if (m.mentionedJid?.[0]) {
    who = m.mentionedJid[0]
    amount = parseInt(args[1])
  } else if (m.quoted) {
    who = m.quoted.sender
    amount = parseInt(args[0])
  } else if (args.length >= 2 && /^\d+$/.test(args[0])) {
    who = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    amount = parseInt(args[1])
  } else {
    throw `❌ Format salah!

Gunakan:
.tflimit @user <jumlah>
.tflimit 62xxx <jumlah>
(reply user)
.tflimit <jumlah>`
  }

  // ===== FIX LID → JID =====
  who = await resolveJid(conn, who)

  // ===== Validasi =====
  if (!amount || amount <= 0)
    throw '❌ Jumlah limit harus berupa angka!'

  if (who === m.sender)
    throw '❌ Tidak bisa transfer limit ke diri sendiri!'

  let sender = global.db.data.users[m.sender]
  let target = global.db.data.users[who]

  if (!target)
    throw '❌ User belum terdaftar di database!'

  if (sender.limit < amount)
    throw '❌ Limit kamu tidak cukup!'

  // ===== Proses =====
  sender.limit -= amount
  target.limit += amount

  let senderName = await conn.getName(m.sender)
  let targetName = await conn.getName(who)

  let txt = `
✅ *TRANSFER LIMIT BERHASIL*

👤 Dari : ${senderName}
👥 Ke   : ${targetName}
🎟 Jumlah : ${amount} Limit

📉 Sisa limit kamu: ${sender.limit}
`.trim()

  await conn.reply(m.chat, txt, m, { mentions: [who] })
}

handler.help = ['tflimit @user|62xxx <jumlah>']
handler.tags = ['game']
handler.command = /^tflimit$/i
handler.limit = false

export default handler

// ===== HELPER =====
async function resolveJid(conn, jid) {
  if (!jid.endsWith('@lid')) return jid
  try {
    let res = await conn.onWhatsApp(jid)
    if (res?.[0]?.jid) return res[0].jid
  } catch {}
  return jid
}
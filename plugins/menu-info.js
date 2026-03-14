let handler = async (m) => {
  m.reply(`
╔══〔 INFO 〕───⬡
║ ⬡ .cekwarn
║ ⬡ .owner
║ ⬡ .creator
║ ⬡ .ceksn
║ ⬡ .delete
║ ⬡ .bmkggempa
║ ⬡ .lapor
║ ⬡ .liburnas
║ ⬡ .runtime
║ ⬡ .undefined
║ ⬡ .toplimit
║ ⬡ .totalfitur
║ ⬡ .infogempa
║ ⬡ .limit
║ ⬡ .premlist [angka]
║ ⬡ .ping
║ ⬡ .profile
║ ⬡ .me
║ ⬡ .profil
╚════════════════⬡
`.trim())
}
handler.command = /^menuinfo$/i
handler.help = ["menuinfo"]
handler.tags = ["main"]
export default handler
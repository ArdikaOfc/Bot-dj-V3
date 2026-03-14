let handler = async (m) => {
  m.reply(`
╔══〔 PANEL 〕───⬡
║ ⬡ .cadmin <username>[,nomor] Ⓟ
║ ⬡ .1gb <username>[,nomor] Ⓟ
║ ⬡ .2gb <username>[,nomor] Ⓟ
║ ⬡ .3gb <username>[,nomor] Ⓟ
║ ⬡ .4gb <username>[,nomor] Ⓟ
║ ⬡ .5gb <username>[,nomor] Ⓟ
║ ⬡ .6gb <username>[,nomor] Ⓟ
║ ⬡ .7gb <username>[,nomor] Ⓟ
║ ⬡ .8gb <username>[,nomor] Ⓟ
║ ⬡ .9gb <username>[,nomor] Ⓟ
║ ⬡ .10gb <username>[,nomor] Ⓟ
║ ⬡ .unlimited <username>[,nomor] Ⓟ
║ ⬡ .unli <username>[,nomor] Ⓟ
║ ⬡ .deladmin <id_user_admin>
║ ⬡ .delpanel
║ ⬡ .listadmin Ⓟ
║ ⬡ .listpanel Ⓟ
║ ⬡ .listp Ⓟ
║ ⬡ .listserver Ⓟ
╚════════════════⬡
`.trim())
}
handler.command = /^menupanel$/i
handler.help = ["menupanel"]
handler.tags = ["main"]
export default handler
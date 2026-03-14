let handler = async (m) => {
  m.reply(`
╔══〔 GAME 〕───⬡
║ ⬡ .blackjack
║ ⬡ .bomb
║ ⬡ .buylimit <jumlah>
║ ⬡ .caklontong
║ ⬡ .cerdascermat <matapelajaran> <jumlahsoal>
║ ⬡ .cc <matapelajaran> <jumlahsoal>
║ ⬡ .family100
║ ⬡ .genshinprofile <uid>
║ ⬡ .kuis
║ ⬡ .leaderboard <uang|limit|xp>
║ ⬡ .lengkapikalimat
║ ⬡ .listredeem
║ ⬡ .perangsarung @user
║ ⬡ .redeem <kode>
║ ⬡ .siapakahaku
║ ⬡ .suit  Ⓛ
║ ⬡ .susunkata
║ ⬡ .tebaktebakan
║ ⬡ .tebakbendera  Ⓛ
║ ⬡ .tebakgambar
║ ⬡ .tebakgame
║ ⬡ .tebakkimia  Ⓛ
║ ⬡ .tebaklirik
║ ⬡ .tebaklogo
║ ⬡ .tebakmakanan
║ ⬡ .tebaktebakan
║ ⬡ .truthordare
║ ⬡ .tod
║ ⬡ .ulartangga
║ ⬡ .uno
║ ⬡ .tictactoe
║ ⬡ .ttt
║ ⬡ .listhero
║ ⬡ .heroml
║ ⬡ .mlhero <nama>  Ⓛ
║ ⬡ .toproblox
║ ⬡ .wrml <totalMatch> <winMatch> <targetWR%>  Ⓛ
╚════════════════⬡
`.trim())
}
handler.command = /^menugame$/i
handler.help = ["menugame"]
handler.tags = ["main"]
export default handler
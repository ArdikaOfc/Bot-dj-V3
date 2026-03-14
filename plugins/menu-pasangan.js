let handler = async (m) => {
  m.reply(`
╔══〔 *PASANGAN* 〕───⬡
║ ⬡ .act  
║ ⬡ .act <angka>  
║ ⬡ .belifood  
║ ⬡ .berkerja  
║ ⬡ .char <nama|uid>  
║ ⬡ .lamar <nama|uid>  
║ ⬡ .listpp  
║ ⬡ .mypd  
║ ⬡ .putus  
║ ⬡ .setpdpp (reply gambar)  
║ ⬡ .terimapp <uid>  
║ ⬡ .tolakpp <uid>  
╚════════════════⬡
`.trim())
}
handler.command = /^menupasangan$/i
handler.help = ["menupasangan"]
handler.tags = ["main"]
export default handler
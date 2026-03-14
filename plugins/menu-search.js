let handler = async (m) => {
  m.reply(`
╔══〔 SEARCH 〕───⬡
║ ⬡ .spotify <lagu>
║ ⬡ .googleimg
║ ⬡ .komiku <query>  Ⓛ
║ ⬡ .carigrup <keyword1,keyword2> Ⓟ Ⓛ
║ ⬡ .kurogaze <judul>  Ⓛ
║ ⬡ .mcaddon
║ ⬡ .sfilesearch
║ ⬡ .soundmeme-listnama nama
║ ⬡ .soundmeme-random
║ ⬡ .soundmeme-search nama
║ ⬡ .spotifys <query>
║ ⬡ .stickerlysearch <keyword>  Ⓛ
║ ⬡ .tiktoksearch
║ ⬡ .uptodown <nama aplikasi>
║ ⬡ .wiki
║ ⬡ .pinterest2 <query> <jumlah>  Ⓛ
║ ⬡ .igsearch <query>
║ ⬡ .ytstalk  Ⓛ
╚════════════════⬡
`.trim())
}
handler.command = /^menusearch$/i
handler.help = ["menusearch"]
handler.tags = ["main"]
export default handler
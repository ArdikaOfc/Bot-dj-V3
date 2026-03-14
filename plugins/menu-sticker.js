let handler = async (m) => {
  m.reply(`
╔══〔 STICKER 〕───⬡
║ ⬡ .brat <text>  Ⓛ
║ ⬡ .brathd <text>  Ⓛ
║ ⬡ .bratvid <teks>  Ⓛ
║ ⬡ .cewekbrat  Ⓛ
║ ⬡ .emojigif <emoji>  Ⓛ
║ ⬡ .gifsticker <query>,<jumlah>
║ ⬡ .qc2 <warna>  Ⓛ
║ ⬡ .stickerlysearch <keyword>  Ⓛ
║ ⬡ .ttp
║ ⬡ .attp
║ ⬡ .bratcolor <teks>|<warna>  Ⓛ
║ ⬡ .emojimix  Ⓛ
║ ⬡ .smeme <teks atas>|<teks bawah>  Ⓛ
║ ⬡ .qc  Ⓛ
║ ⬡ .stickersearch <query>  Ⓛ
║ ⬡ .sticker [packname|author]
║ ⬡ .telestick <url> Ⓟ
║ ⬡ .toimg (reply)  Ⓛ
║ ⬡ .tovideo  Ⓛ
║ ⬡ .wm <packname>|<author>
║ ⬡ .stickerly <link>  Ⓛ
║ ⬡ .stickerlysearch <query>
║ ⬡ .smug
║ ⬡ .woof
║ ⬡ .gasm
║ ⬡ .8ball
║ ⬡ .goose
║ ⬡ .cuddle
║ ⬡ .avatar
║ ⬡ .slap
║ ⬡ .v3
║ ⬡ .pat
║ ⬡ .gecg
║ ⬡ .feed
║ ⬡ .fox_girl
║ ⬡ .lizard
║ ⬡ .neko
║ ⬡ .hug
║ ⬡ .meow
║ ⬡ .kiss
║ ⬡ .wallpaper
║ ⬡ .tickle
║ ⬡ .spank
║ ⬡ .waifu
║ ⬡ .lewd
║ ⬡ .ngif
║ ⬡ .stikwiki <kata kunci>  Ⓛ
╚════════════════⬡
`.trim())
}
handler.command = /^menusticker$/i
handler.help = ["menusticker"]
handler.tags = ["main"]
export default handler
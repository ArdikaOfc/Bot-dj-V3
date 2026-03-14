let handler = async (m) => {
  m.reply(`
╔══〔 DOWNLOADER 〕───⬡
║ ⬡ .twitter  Ⓛ
║ ⬡ .x  Ⓛ
║ ⬡ .xhs  Ⓛ
║ ⬡ .yt5so <Url Ig/Facebook>  Ⓛ
║ ⬡ .aio <url>  Ⓛ
║ ⬡ .bili <url>
║ ⬡ .blibli <url>
║ ⬡ .bilibili <url>
║ ⬡ .capcut
║ ⬡ .facebook <link>  Ⓛ
║ ⬡ .gdrive <url>  Ⓛ
║ ⬡ .gdrive <url>
║ ⬡ .ig  Ⓛ
║ ⬡ .igdl  Ⓛ
║ ⬡ .instaaudio  Ⓛ
║ ⬡ .igaudio  Ⓛ
║ ⬡ .igst  Ⓛ
║ ⬡ .igstory  Ⓛ
║ ⬡ .dlit <platform> <url>  Ⓛ
║ ⬡ .mediafire <url>  Ⓛ
║ ⬡ .play
║ ⬡ .sfile  Ⓛ
║ ⬡ .spotify <lagu>
║ ⬡ .spotify2 <url>
║ ⬡ .threads
║ ⬡ .tiktok <url>  Ⓛ
║ ⬡ .tiktok3 <url>  Ⓛ
║ ⬡ .tiktok3 <url>
║ ⬡ .tiktokimg / ttimg <url>  Ⓛ
║ ⬡ .ttmusic <link>
║ ⬡ .ttmp3 <link>
║ ⬡ .videy <url> Ⓟ
║ ⬡ .videydl <url> Ⓟ
║ ⬡ .wallpaper <query>
║ ⬡ .pindl   Ⓛ
║ ⬡ .pindl2  Ⓛ
║ ⬡ .playch
║ ⬡ .soundcloud  Ⓛ
║ ⬡ .play3 <judul>  Ⓛ
║ ⬡ .yta <url>  Ⓛ
║ ⬡ .ytmp3 <url>  Ⓛ
║ ⬡ .ytv <url> [360]  Ⓛ
║ ⬡ .ytmp4 <url> [360]  Ⓛ
║ ⬡ .videoyt <url> [360]  Ⓛ
║ ⬡ .ytpost <link post YouTube>  Ⓛ
║ ⬡ .ytv2
║ ⬡ .yta2
╚════════════════⬡
`.trim())
}
handler.command = /^menudownload$/i
handler.help = ["menudownload"]
handler.tags = ["main"]
export default handler
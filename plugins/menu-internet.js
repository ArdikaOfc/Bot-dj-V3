let handler = async (m) => {
  m.reply(`
╔══〔 INTERNET 〕───⬡
║ ⬡ .pin  Ⓛ
║ ⬡ .lagi  Ⓛ
║ ⬡ .fontsearch <text>  Ⓛ
║ ⬡ .tafsir
║ ⬡ .apksearch <nama aplikasi>  Ⓛ
║ ⬡ .androidsearch <nama aplikasi>  Ⓛ
║ ⬡ .beritabola  Ⓛ
║ ⬡ .dafont <nama>
║ ⬡ .fetch <url>
║ ⬡ .get <url>
║ ⬡ .githubtrend
║ ⬡ .groupsearch <kata kunci> Ⓟ
║ ⬡ .mlhero <nama>  Ⓛ
║ ⬡ .infoloker
║ ⬡ .kompas  Ⓛ
║ ⬡ .mangga-pop
║ ⬡ .misteri
║ ⬡ .mltour
║ ⬡ .playstore <query>
║ ⬡ .toproblox
║ ⬡ .surah
║ ⬡ .tgram <kata kunci>  Ⓛ
║ ⬡ .worldtime
║ ⬡ .waktuglobal
║ ⬡ .jadwalsholat kota
║ ⬡ .komiksearch <judul>
║ ⬡ .komikdetail <id/url>
║ ⬡ .lirik
║ ⬡ .meme
║ ⬡ .rrsearch <judul>
║ ⬡ .rrdetail <url>
║ ⬡ .rrlatest
║ ⬡ .rrprofile <url>
║ ⬡ .pastebin <url>
║ ⬡ .pinterestlens (reply foto)  Ⓛ
║ ⬡ .pinlens (reply foto)  Ⓛ
║ ⬡ .pingeser  Ⓛ
║ ⬡ .pinterest  Ⓛ
║ ⬡ .renungan  Ⓛ
║ ⬡ .igsearch <query>
║ ⬡ .iplookup <domain>
║ ⬡ .gsmarena <nama hp>
║ ⬡ .ttsba <teks>  Ⓛ
║ ⬡ .uhdpaper <query>  Ⓛ
║ ⬡ .wallsearch <query>  Ⓛ
║ ⬡ .wallrating <new|popular|top_rated>  Ⓛ
║ ⬡ .wallcat <video|parallax|ai_art|exclusive>  Ⓛ
╚════════════════⬡
`.trim())
}
handler.command = /^menuinternet$/i
handler.help = ["menuinternet"]
handler.tags = ["main"]
export default handler
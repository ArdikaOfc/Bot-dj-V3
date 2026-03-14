let handler = async (m) => {
  m.reply(`
╔══〔 TOOLS 〕───⬡
║ ⬡ .codegen <lang> <model> <prompt>  Ⓛ
║ ⬡ .animefinder
║ ⬡ .bratb
║ ⬡ .ccgen <type> <jumlah>
║ ⬡ .cekqr  Ⓛ
║ ⬡ .getcode <url>
║ ⬡ .swgc
║ ⬡ .upswgc
║ ⬡ .tflimit @user|62xxx <jumlah>
║ ⬡ .remini
║ ⬡ .hd
║ ⬡ .hdvid Ⓟ Ⓛ
║ ⬡ .hdvideo Ⓟ Ⓛ
║ ⬡ .cuaca
║ ⬡ .ssweb <url>  Ⓛ
║ ⬡ .searchcode <query>
║ ⬡ .igstalk  Ⓛ
║ ⬡ .fstik Ⓟ
║ ⬡ .tempmail  Ⓛ
║ ⬡ .cekmail <token>  Ⓛ
║ ⬡ .pesanmail <id>  Ⓛ
║ ⬡ .toaudio  Ⓛ
║ ⬡ .tobotak  Ⓛ
║ ⬡ .checkhost
║ ⬡ .cekhost
║ ⬡ .chord <judul lagu>  Ⓛ
║ ⬡ .jarak dari|ke
║ ⬡ .ip  Ⓛ
║ ⬡ .jadwaltv
║ ⬡ .morse
║ ⬡ .demorse
║ ⬡ .qr <teks>
║ ⬡ .readmore <teks>|<teks>
║ ⬡ .read
║ ⬡ .spamwa <number>|<mesage>|<no of messages>  Ⓛ
║ ⬡ .translate ᴛᴇxᴛ
║ ⬡ .amdata
║ ⬡ .breach <email>  Ⓛ
║ ⬡ .catbox  Ⓛ
║ ⬡ .cekidch
║ ⬡ .cekidch2 <link>
║ ⬡ .cekresi <no resi>|<ekspedisi>  Ⓛ
║ ⬡ .promptcode  Ⓛ
║ ⬡ .detectbug  Ⓛ
║ ⬡ .convertcode  Ⓛ
║ ⬡ .explaincode  Ⓛ
║ ⬡ .imagesolve  Ⓛ
║ ⬡ .encode
║ ⬡ .decode
║ ⬡ .ekspedisilist
║ ⬡ .enhance
║ ⬡ .gsmarena <nama hp>
║ ⬡ .upscale  Ⓛ
║ ⬡ .imgtools <type>  Ⓛ
║ ⬡ .mikutalk <teks>  Ⓛ
║ ⬡ .nik <nomor>
║ ⬡ .numbgen
║ ⬡ .ocr
║ ⬡ .redirect
║ ⬡ .removebg  Ⓛ
║ ⬡ .rvo  Ⓛ
║ ⬡ .s2c <url>
║ ⬡ .shareteks teks  Ⓛ
║ ⬡ .tembox [prefix]  Ⓛ
║ ⬡ .temboxcek <token>  Ⓛ
║ ⬡ .copy email/token <isi>  Ⓛ
║ ⬡ .tomp3  Ⓛ
║ ⬡ .unblur  Ⓛ
║ ⬡ .unblur mild  Ⓛ
║ ⬡ .waifutagger  Ⓛ
║ ⬡ .wt  Ⓛ
║ ⬡ .tourl
║ ⬡ .upload
║ ⬡ .transcibe url-video-yt  Ⓛ
║ ⬡ .ondoku <voice|text>  Ⓛ
║ ⬡ .voiceondoku  Ⓛ
║ ⬡ .ttsai <model/random/list> | <teks>  Ⓛ
║ ⬡ .ttsba <teks>  Ⓛ
║ ⬡ .waifuhtm [filter]  Ⓛ
║ ⬡ .waifufilterlist  Ⓛ
║ ⬡ .whatanime  Ⓛ
║ ⬡ .animecheck  Ⓛ
║ ⬡ .identifyanime  Ⓛ
║ ⬡ .wrml <totalMatch> <winMatch> <targetWR%>  Ⓛ
║ ⬡ .yts <query>  Ⓛ
╚════════════════⬡
`.trim())
}
handler.command = /^menutools$/i
handler.help = ["menutools"]
handler.tags = ["main"]
export default handler
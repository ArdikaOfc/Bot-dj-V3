let handler = async (m) => {
  m.reply(`
╔══〔 *MAKER* 〕───⬡
║ ⬡ .toanime  Ⓛ
║ ⬡ .fakeml <username>  Ⓛ
║ ⬡ .hitamkan  Ⓛ
║ ⬡ .ktp  Ⓛ
║ ⬡ .fdc <username|pesan|url>  Ⓛ
║ ⬡ .fakediscoard  Ⓛ
║ ⬡ .fakeml <nickname>  
║ ⬡ .faketiktok <nama|username|followers|following|likes|bio|verified|isFollow|theme>  Ⓛ
║ ⬡ .fakexnxx <nama> | <quote>  
║ ⬡ .iqc <pesan>  Ⓛ
║ ⬡ .mpls  Ⓛ
║ ⬡ .ngl <title>|<text>  
║ ⬡ .pixelglitch <teks>  
║ ⬡ .phlogo <text1>|<text2>  
║ ⬡ .tosdmtinggi  Ⓛ
║ ⬡ .sertifikatcinta <nama>  
║ ⬡ .sertifikatlemot <nama>  
║ ⬡ .sertiftolol <nama>  Ⓛ
║ ⬡ .sertifikattolol <nama>  Ⓛ
║ ⬡ .tofigure  
║ ⬡ .togura  
║ ⬡ .tohijab  
║ ⬡ .tojepang Ⓟ 
║ ⬡ .tomaid Ⓟ 
║ ⬡ .tomangu Ⓟ 
║ ⬡ .tomirror  
║ ⬡ .topacar Ⓟ 
║ ⬡ .toputih Ⓟ 
║ ⬡ .tweet <nama>,<username>,<teks>  
║ ⬡ .wanted <image_url>  
║ ⬡ .nulis  
║ ⬡ .srtdarksistem <teks>  Ⓛ
║ ⬡ .iqc jam|batre|pesan  
║ ⬡ .tweet <nama>,<username>,<teks>  
╚════════════════⬡
`.trim())
}
handler.command = /^menumaker$/i
handler.help = ["menumaker"]
handler.tags = ["main"]
export default handler
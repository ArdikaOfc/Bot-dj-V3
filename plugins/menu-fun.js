let handler = async (m) => {
  m.reply(`
╔══〔 FUN 〕───⬡
║ ⬡ .cekkhodam <name>
║ ⬡ .cekkontol <name>
║ ⬡ .cekmemek <name>
║ ⬡ .alay  Ⓛ
║ ⬡ .angka <0-9>
║ ⬡ .apakah <teks>?
║ ⬡ .benarkah <text>
║ ⬡ .bisakah <pertanyaan>
║ ⬡ .cantikcek
║ ⬡ .cektt <name>
║ ⬡ .dimanakah <pertanyaan>
║ ⬡ .jadian
║ ⬡ .kapankah <pertanyaan>
║ ⬡ .kematian <nama opsional>
║ ⬡ .kerang <teks>
║ ⬡ .kerangajaib <teks>
║ ⬡ .dreamworld  Ⓛ
║ ⬡ .dream  Ⓛ
║ ⬡ .mimpi  Ⓛ
║ ⬡ .dreamexp  Ⓛ
║ ⬡ .ramal <nama opsional>
║ ⬡ .seberapagila <nama opsional>
║ ⬡ .sipaling <teks>
║ ⬡ .suratcinta <nama>
║ ⬡ .tebakumur <name>
║ ⬡ .top <jumlah> <judul>
║ ⬡ .goblokcek  Ⓛ
║ ⬡ .jelekcek  Ⓛ
║ ⬡ .gaycek  Ⓛ
║ ⬡ .rate  Ⓛ
║ ⬡ .lesbicek  Ⓛ
║ ⬡ .gantengcek  Ⓛ
║ ⬡ .cantikcek  Ⓛ
║ ⬡ .begocek  Ⓛ
║ ⬡ .suhucek  Ⓛ
║ ⬡ .pintercek  Ⓛ
║ ⬡ .jagocek  Ⓛ
║ ⬡ .nolepcek  Ⓛ
║ ⬡ .babicek  Ⓛ
║ ⬡ .bebancek  Ⓛ
║ ⬡ .baikcek  Ⓛ
║ ⬡ .jahatcek  Ⓛ
║ ⬡ .anjingcek  Ⓛ
║ ⬡ .haramcek  Ⓛ
║ ⬡ .pakboycek  Ⓛ
║ ⬡ .pakgirlcek  Ⓛ
║ ⬡ .sangecek  Ⓛ
║ ⬡ .bapercek  Ⓛ
║ ⬡ .fakboycek  Ⓛ
║ ⬡ .alimcek  Ⓛ
║ ⬡ .fakgirlcek  Ⓛ
║ ⬡ .kerencek  Ⓛ
║ ⬡ .wibucek  Ⓛ
║ ⬡ .pasarkascek  Ⓛ
║ ⬡ .kulcek  Ⓛ
║ ⬡ .cekgoblok  Ⓛ
║ ⬡ .cekjelek  Ⓛ
║ ⬡ .cekgay  Ⓛ
║ ⬡ .ceklesbi  Ⓛ
║ ⬡ .cekganteng  Ⓛ
║ ⬡ .cekcantik  Ⓛ
║ ⬡ .cekbego  Ⓛ
║ ⬡ .ceksuhu  Ⓛ
║ ⬡ .cekpinter  Ⓛ
║ ⬡ .cekjago  Ⓛ
║ ⬡ .ceknolep  Ⓛ
║ ⬡ .cekbabi  Ⓛ
║ ⬡ .cekbeban  Ⓛ
║ ⬡ .cekbaik  Ⓛ
║ ⬡ .cekjahat  Ⓛ
║ ⬡ .cekanjing  Ⓛ
║ ⬡ .cekharam  Ⓛ
║ ⬡ .cekpakboy  Ⓛ
║ ⬡ .cekpakgirl  Ⓛ
║ ⬡ .ceksange  Ⓛ
║ ⬡ .cekbaper  Ⓛ
║ ⬡ .cekfakboy  Ⓛ
║ ⬡ .cekalim  Ⓛ
║ ⬡ .cekfakgirl  Ⓛ
║ ⬡ .cekkeren  Ⓛ
║ ⬡ .cekwibu  Ⓛ
║ ⬡ .cekpasarkas  Ⓛ
║ ⬡ .cekkul  Ⓛ
║ ⬡ .suitpvp
║ ⬡ .sertifikatcinta <nama>
║ ⬡ .sertifikatlemot <nama>
║ ⬡ .moveon
║ ⬡ .pantun
║ ⬡ .soundmeme-listnama nama
║ ⬡ .soundmeme-random
║ ⬡ .soundmeme-search nama
║ ⬡ .morse
║ ⬡ .demorse
║ ⬡ ..ara
║ ⬡ ..lopyou
╚════════════════⬡
`.trim())
}
handler.command = /^menufun$/i
handler.help = ["menufun"]
handler.tags = ["main"]
export default handler
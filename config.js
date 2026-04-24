/*
Base : ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻
Release : 14 Mar 2026
*/

import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import moment from 'moment-timezone'

/*============= WAKTU =============*/
let wibh = moment.tz('Asia/Jakarta').format('HH')
let wibm = moment.tz('Asia/Jakarta').format('mm')
let wibs = moment.tz('Asia/Jakarta').format('ss')
let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
let wktugeneral = `${wibh}:${wibm}:${wibs}`

let d = new Date(new Date + 3600000)
let locale = 'id'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
})
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

/*============= MAIN INFO =============*/
global.owner = [['6283115862272', 'ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻', true], ['6285718523404', 'Developer', true]]  // ubah pake no kalian
global.mods = ['6283115862272']
global.prems = ['6283115862272']
global.nomorbot = '6282315950966' // ubah pake no kalian
global.nomorown = '6283115862272'// ubah pake no kalian
global.autotyping = true // default mati
global.autorecording = true // default mati

/*============= WATERMARK =============*/
global.readMore = readMore
global.author = 'ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻'
global.namebot = 'ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻'
global.wm = 'ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻'
global.watermark = wm
global.botdate = `⫹⫺ DATE: ${week} ${date}\n⫹⫺ 𝗧𝗶𝗺𝗲: ${wktuwib}`
global.bottime = `T I M E : ${wktuwib}`
global.stickpack = `${namebot}\n\nᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻\n+${nomorbot}`
global.stickauth = `Made By ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻`
global.week = `${week} ${date}`
global.wibb = `${wktuwib}`
global.loading = (m, conn, back = false) => {
}

//*============= SOSMED =============*/
global.sig = 'https://www.instagram.com/ardi_procet28'
global.sgh = 'https://github.com/ArdikaOfc'
global.sgc = 'https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v'
global.gc = 'https://chat.whatsapp.com/ITDnYU2kXuj97Gb2Xw8yzQ'
global.sgw = '_'
global.sdc = '-'
global.sfb = 'https://www.facebook.com/share/18LYDGk9si/'
global.snh = '-'

// ================= Cpanel ========================================
global.egg = "15" // gausah di ubah

global.nestid = "5" // gausah diubah

global.loc = "1" // gausah diubah

global.domain = "-" // ini ubah ama domain / web panel lu

global.apikey = "-" // apikey / plta lu

global.capikey = "-" // capikey / pltc lu

/*============= DONASI =============*/
global.qris = '_'
global.psaweria = '_'

/*============= GITHUB =============*/
global.Owner = 'ArdikaOfc' // isi username githubmu
function _0x102f(){var _0x120531=['28mjqaKs','ghp_OXTz5A','253189IqBhBK','token','2URtOnX','2085870XcUOVk','2810RMRPOQ','3633550wTuVYu','uN1kNcvOdY','0mfCVdZtpn','3698908zcGcZc','otne3j8i5g','9955800zrwVsJ','1084062LkCUPr','34092uxawIF'];_0x102f=function(){return _0x120531;};return _0x102f();}var _0x476e3d=_0x4cd2;function _0x4cd2(_0x4bb922,_0x1d65c7){var _0x3f1771=_0x102f();return _0x4cd2=function(_0x287457,_0x498ab5){_0x287457=_0x287457-(-0x196b+0x58f*0x6+-0x766);var _0x281630=_0x3f1771[_0x287457];return _0x281630;},_0x4cd2(_0x4bb922,_0x1d65c7);}(function(_0x573379,_0x17e217){var _0x138ce9=_0x4cd2,_0x5cfa6e=_0x573379();while(!![]){try{var _0x2fe08e=-parseInt(_0x138ce9(0x8b))/(-0x11*-0x59+0x1*-0x67+-0x581*0x1)+parseInt(_0x138ce9(0x8d))/(-0xb*0x148+-0x181a+0xf*0x28c)*(-parseInt(_0x138ce9(0x96))/(0x1c55*0x1+-0xa8b*0x2+0x73c*-0x1))+parseInt(_0x138ce9(0x93))/(-0x5ff+-0x1321*-0x2+0x7f*-0x41)+-parseInt(_0x138ce9(0x90))/(0xbd0+-0xd*0x119+0x27a)+-parseInt(_0x138ce9(0x8e))/(0x2f1+0x56c*-0x1+0x281)*(-parseInt(_0x138ce9(0x89))/(0x449*-0x9+-0x1e83+0x451b*0x1))+-parseInt(_0x138ce9(0x95))/(0x841+-0x260c+-0x1*-0x1dd3)+parseInt(_0x138ce9(0x97))/(0x523*-0x1+0x1*0xf49+-0xa1d*0x1)*(parseInt(_0x138ce9(0x8f))/(-0x63e+0x4b2*-0x3+0x145e));if(_0x2fe08e===_0x17e217)break;else _0x5cfa6e['push'](_0x5cfa6e['shift']());}catch(_0x20e7c4){_0x5cfa6e['push'](_0x5cfa6e['shift']());}}}(_0x102f,-0x1c9f*0xb+0xeb7af+-0x15f43),global[_0x476e3d(0x8c)]=_0x476e3d(0x8a)+_0x476e3d(0x91)+_0x476e3d(0x92)+_0x476e3d(0x94));"
} // isi sendiri global.token = 'token github'

/*============= TAMPILAN =============*/
global.dmenut = 'ଓ═┅═━–〈' //top
global.dmenub = '┊↬' //body
global.dmenub2 = '┊' //body for info cmd on Default menu
global.dmenuf = '┗––––––––––✦' //footer
global.dashmenu = '┅═┅═❏ *DASHBOARD* ❏═┅═┅'
global.cmenut = '❏––––––『' //top
global.cmenuh = '』––––––' //header
global.cmenub = '┊✦ ' //body
global.cmenuf = '┗━═┅═━––––––๑\n' //footer
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     '
global.pmenus = '✦'
global.htki = '––––––『' // Hiasan Titile (KIRI)
global.htka = '』––––––' // Hiasan Title  (KANAN)
global.lopr = 'Ⓟ' //LOGO PREMIUM ON MENU.JS
global.lolm = 'Ⓛ' //LOGO LIMIT/FREE ON MENU.JS
global.htjava = '⫹⫺'    //hiasan Doang :v
global.hsquere = ['⛶', '❏', '⫹⫺']

/*bikin project dan ambil apikeyny di pakasir.com*/
global.pakasir_project = "ardikaofc"
global.pakasir_api_key = "zP1BsjFpmEKoRyDiQNlpy7NQUisZmwWv"

/*============= RESPON =============*/
global.wait = 'Please Wait...'
global.eror = 'Error!'

global.APIs = {
    ryzen: 'https://api.ryzendesu.vip',

}

global.APIKeys = {
    // 'https://website': 'apikey'
}

/*============= OTHER =============*/
global.dpptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.ddocx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.dxlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.dpdf = 'application/pdf'
global.drtf = 'text/rtf'

global.thumb = 'https://telegra.ph/file/a7ac2b46f82ef7ea083f9.jpg' //Main Thumbnail
global.imagebot = 'https://telegra.ph/file/a7ac2b46f82ef7ea083f9.jpg'
global.giflogo = 'https://telegra.ph/file/a7ac2b46f82ef7ea083f9.jpg'
global.thumbs = ['https://telegra.ph/file/a7ac2b46f82ef7ea083f9.jpg']
global.thumbnailUrl = [
    'https://telegra.ph/file/ef4b742d47e6a9115e2ff.jpg'
]
global.fotonya1 = 'https://telegra.ph/file/6e45318d7c76f57e4a8bd.jpg' //ganti jadi foto bot mu
global.fotonya2 = 'https://telegra.ph/file/6e45318d7c76f57e4a8bd.jpg' //ini juga ganti 
global.flaaa2 = [
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=",
    "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=",
    "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text="
]
global.fla = [
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=",
    "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=",
    "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text="
]
global.hwaifu = ['https://telegra.ph/file/a7ac2b46f82ef7ea083f9.jpg']
global.thumblvlup = [
    'https://i.pinimg.com/originals/a0/34/8a/a0348ae908d8ac4ced76df289eb41e1a.jpg',
    'https://i.pinimg.com/originals/be/3b/47/be3b477371cc249e49fd0bb3284de7d7.jpg',
    'https://i.pinimg.com/originals/63/c3/37/63c337596b3391df0e72a9729ceca7b6.jpg',
    'https://i.pinimg.com/originals/db/ed/5a/dbed5afac55d266602d0ca0c67622bb9.jpg'
]

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'config.js'"))
    import(`${file}?update=${Date.now()}`)
})

import fs from 'fs'
import moment from 'moment-timezone'
const fallbackThumb = "https://qu.ax/mgyIh"

let handler = m => m

handler.all = async function (m) {
    global.wm = 'ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻'

    // === Thumbnail Loader ===
    let thumb
    try {
        thumb = fs.readFileSync('./thumbnail.jpg')
    } catch {
        thumb = await (await fetch(fallbackThumb)).buffer()
    }

    // === AdReply ===
    global.adReply = {
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: `「 ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻ 」`,
                newsletterJid: "120363199397739684@newsletter"
            },
            externalAdReply: {
                title: `ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻`,
                body: `${momentGreeting()}`,
                previewType: "PHOTO",
                thumbnail: thumb
            }
        }
    }

    // === fkontak ===
    global.fkontak = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`
        },
        message: {
            contactMessage: {
                displayName: global.wm,
                vcard: `BEGIN:VCARD
VERSION:3.0
N:XL;${wm},;;;
FN:${wm}
item1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}
item1.X-ABLabel:Ponsel
END:VCARD`,
                jpegThumbnail: thumb,
            }
        }
    }

    // === Fake VN ===
    global.fvn = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`
        },
        message: {
            audioMessage: {
                mimetype: "audio/ogg; codecs=opus",
                seconds: "999999",
                ptt: true
            }
        }
    }

    // === Fake Text ===
    global.ftextt = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`
        },
        message: {
            extendedTextMessage: {
                text: wm,
                title: wm,
                jpegThumbnail: thumb
            }
        }
    }

    // === Fake Gif ===
    global.fgif = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`
        },
        message: {
            videoMessage: {
                title: wm,
                h: "Hmm",
                seconds: "999",
                gifPlayback: true,
                caption: wm,
                jpegThumbnail: thumb
            }
        }
    }

    // === Fake Toko ===
    global.ftoko = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`
        },
        message: {
            productMessage: {
                product: {
                    productImage: {
                        mimetype: "image/jpeg",
                        jpegThumbnail: thumb
                    },
                    title: wm,
                    description: "Simple Bot ESM",
                    currencyCode: "IDR",
                    priceAmount1000: "20000000",
                    retailerId: "ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻",
                    productImageCount: 1
                },
                businessOwnerJid: `0@s.whatsapp.net`
            }
        }
    }

    // === Fake Document ===
    global.fdocs = {
        key: { participant: '0@s.whatsapp.net' },
        message: {
            documentMessage: {
                title: wm,
                jpegThumbnail: thumb
            }
        }
    }

    // === Fake Group Invite ===
    global.fgclink = {
        key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
        },
        message: {
            groupInviteMessage: {
                groupJid: "628xxx-xxx@g.us",
                inviteCode: "null",
                groupName: "ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻ Community",
                caption: wm,
                jpegThumbnail: thumb
            }
        }
    }
}

export default handler


// === Greeting Function ===
function momentGreeting() {
    const hour = moment.tz('Asia/Jakarta').hour()
    if (hour >= 18) return 'Konbanwa🍃'
    if (hour >= 15) return 'Konnichiwa🌾'
    if (hour > 10) return 'Konnichiwa🍂'
    if (hour >= 4) return 'Ohayou Gozaimasu🌿'
    return 'Oyasuminasai🪷'
}

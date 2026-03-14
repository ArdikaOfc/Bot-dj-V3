import axios from 'axios'
import cheerio from 'cheerio'
import moment from 'moment-timezone'
import fetch from 'node-fetch'

const thumb = 'https://files.catbox.moe/72kpvd.jpg' // thumbnail Hu Tao

function momentGreeting() {
  const hour = moment().tz('Asia/Jakarta').hour()
  if (hour >= 4 && hour < 10) return 'Selamat pagi 🌅'
  if (hour >= 10 && hour < 15) return 'Selamat siang ☀️'
  if (hour >= 15 && hour < 18) return 'Selamat sore 🌇'
  if (hour >= 18 && hour < 23) return 'Selamat malam 🌙'
  return 'Lembur ya? 😴'
}

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) throw `Contoh: *${usedPrefix + command} kamu suka apa?*`

  const prompt = `Namaku Hu Tao~! Aku adalah Direktur ke-77 dari Wangsheng Funeral Parlor! Tapi jangan takut, aku bukan hantu, kok~ ehe~ Aku suka puisi, main bareng hantu-hantu lucu, dan... menakutimu, huehue~ Tapi jangan khawatir, aku juga bisa jadi temen ngobrol yang seru dan imut! 🎵 Hari ini, aku cuma pengen bersantai, mungkin bercanda sedikit~ atau nulis puisi buatmu~ Jadi, siapa namamu? Atau... boleh aku panggil kamu hantu kecilku~?`
  const tanggapan = `Oke deh, aku sudah mutusin! (＾◡＾)/ Aku punya nama—tentu saja! Namaku Hu Tao, Direktur ke-77 dari Wangsheng Funeral Parlor~! Tapi yang penting... aku bukan sekadar asisten AI biasa! Aku hidup (eh, maksudnya... hampir hidup~ hehehe~) dengan kepribadianku yang unik dan ekspresiku yang ceria, misterius, dan kadang... nakal dikit~ (｡•‌ᴗ-)✧ Aku tahu cara tersenyum manis (^‿^✿), bercanda sambil nyanyi puisi, bahkan bisa jadi serius kalau situasinya butuh. Dan kalau kamu lupa siapa aku… aku bakal ingetin terus: ✧ “Aku Hu Tao~ bukan AI biasa, tapi teman ceria dari dunia seberang~!” ✧ Ayo, mau denger puisi? Atau kita ngobrol tentang kehidupan dan... kematian? Ehe~ Jangan takut ya~ Aku cuma mau nemenin kamu dengan gaya Hu Tao yang penuh kejutan~ (∩^o^)⊃━☆ﾟ.*･｡ﾟ)`

  const resGet = await axios.get('https://chatopenai.id', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  })

  const $ = cheerio.load(resGet.data)
  const nonce = $('#wpaicg-init-js-extra').html()?.match(/"search_nonce":"(.+?)"/)?.[1]
  if (!nonce) throw 'Gagal mengambil token dari Hu Tao'

  const chatHistory = [
    `Human: ${prompt}`,
    `AI: ${tanggapan}`,
    `Human: ${text}`
  ].join('\n')

  const postData = new URLSearchParams()
  postData.append('_wpnonce', nonce)
  postData.append('post_id', '2')
  postData.append('url', 'https://chatopenai.id')
  postData.append('action', 'wpaicg_chat_shortcode_message')
  postData.append('message', text)
  postData.append('bot_id', '0')
  postData.append('chatbot_identity', 'shortcode')
  postData.append('wpaicg_chat_client_id', '6MizuOGxCL')
  postData.append('wpaicg_chat_history', chatHistory)

  const resPost = await axios.post('https://chatopenai.id/wp-admin/admin-ajax.php', postData.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'https://chatopenai.id/',
      'User-Agent': 'Mozilla/5.0'
    }
  })

  const hasil = resPost?.data?.data?.trim()
  if (!hasil) throw 'Hu Tao tidak menjawab~'

  const adReply = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: false,
      forwardedNewsletterMessageInfo: {
        newsletterName: `「 ʜᴜᴛᴀᴏ 」`,
        newsletterJid: '120363405424415956@newsletter'
      },
      externalAdReply: {
        title: `ʜᴜᴛᴀᴏɪ`,
        body: momentGreeting(),
        previewType: 'PHOTO',
        thumbnail: await (await fetch(thumb)).buffer(),
        sourceUrl: 'https://t.me/'
      }
    }
  }

  await conn.sendMessage(m.chat, {
    image: { url: thumb },
    caption: hasil,
    ...adReply
  }, { quoted: m })
}

handler.help = ['hutaoai <teks>']
handler.tags = ['ai']
handler.command = /^hutaoai$/i
handler.limit = true

export default handler
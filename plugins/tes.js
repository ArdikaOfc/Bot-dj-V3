let handler = async (m) => {
  let ryo = `
*「 🍬 ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻」*

Hmph... apa sih, manggil-manggil Bot Dj segala...  
Yasudah, kalau kamu *beneran* butuh, ketik aja *.menu* ✨  

(Tapi jangan ganggu aku lagi ya...) 
`
  await m.reply(ryo)
}

handler.customPrefix = /^(tes|bot|dj|djbot|test)$/i
handler.command = new RegExp

export default handler
let handler = async (m, { args, conn }) => {
  if (!args[0]) return m.reply('Contoh: .req Anu Ini Min')
  let text = args.join(' ')
  let url = `https://www.veloria.my.id/imagecreator/fakengl?title=Anonymous+Chat&text=` + encodeURIComponent(text)
  let caption = 'Request Fitur ' + text + ' ' + m.sender.split('@')[0]
 
  await conn.sendMessage('6283115862272@s.whatsapp.net', {
    image: { url },
    caption
  })
 
  let idch = '120363199397739684@newsletter'
  await conn.sendMessage(idch, {
    image: { url },
    caption: 'Ada Request Baru Nih'
  })
 
  m.reply('Req Mu Sudah Dikirim Semoga Di Buatkan Ya')
}
 
handler.help = ['req <teks>']
handler.command = ['req']
handler.tags = ['tools']
handler.register = true
 
export default handler
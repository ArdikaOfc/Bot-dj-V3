let handler = async (m, { conn, text }) => {
  if (!text) throw '⚠️ Masukkan umur!\nContoh:\n.setumur 20'

  let umur = parseInt(text)
  if (isNaN(umur)) throw '⚠️ Umur harus berupa angka!'
  if (umur > 30) umur = 30

  let jid = m.sender

  // Pastikan user ada di DB
  if (!global.db.data.users[jid]) {
    global.db.data.users[jid] = {
      name: '',
      registered: false,
      age: 0,       // <-- gunakan age, bukan umur
      role: 'User',
      limit: 50,
      exp: 0,
      premiumTime: 0
    }
  }

  // Set umur ke property 'age' agar tampil di profile
  global.db.data.users[jid].age = umur

  await conn.reply(
    m.chat,
    ` Umur berhasil diubah!\n\n Umur kamu sekarang: ${umur} tahun`,
    m
  )
}

handler.help = ['setumur <umur>']
handler.tags = ['main']
handler.command = /^setumur$/i
export default handler
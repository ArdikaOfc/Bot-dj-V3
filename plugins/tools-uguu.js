import axios from "axios"
import FormData from "form-data"

/* --------------------------------
   🔧 UGUU UPLOAD (MENTAHAN ASLI)
----------------------------------*/
async function Uguu(buffer, filename) {
  const form = new FormData()
  form.append("files[]", buffer, { filename })

  const { data } = await axios.post("https://uguu.se/upload.php", form, {
    headers: form.getHeaders()
  })

  if (!data.files || !data.files[0]) throw new Error("Upload gagal.")

  return data.files[0].url
}

/* --------------------------------
   🔧 FITUR TOURL SAJA
----------------------------------*/
let handler = async (m, { conn }) => {
  try {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ""

    if (!mime.startsWith("image/") && !mime.startsWith("video/") && !mime.startsWith("audio/"))
      return m.reply("Kirim / reply *gambar, video, atau audio* untuk diupload.")

    // Ambil buffer mentah
    const buffer = await q.download()
    const ext = mime.split("/")[1]
    const filename = `file.${ext}`

    // Upload ke UGUU
    const link = await Uguu(buffer, filename)

    // Kirim link
    await conn.sendMessage(m.chat, { text: link }, { quoted: m })

  } catch (e) {
    m.reply("Error: " + e.message)
  }
}

handler.help = ["uguu"]
handler.tags = ["tools"]
handler.command = ["uguu"]
handler.register = true


export default handler
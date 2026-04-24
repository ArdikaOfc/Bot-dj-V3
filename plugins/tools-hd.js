/*
Wm: https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
Jgn hapus wm ku
Fitur:  Hd, Remini 
Type : Plugins Esm 
Api: hhttps://api.nexray.web.id/
Creator: ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
*/
import fs from 'fs'
import axios from 'axios'
import crypto from 'crypto'
import { fileTypeFromBuffer } from 'file-type'
 
const githubToken = global.token
const owner = global.Owner
const branch = 'main'
let repos = ['dat1']
async function ensureRepoExists(repo) {
  try {
    await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Authorization: `Bearer ${githubToken}` }
    })
  } catch (e) {
    if (e.response?.status === 404) {
      await axios.post(`https://api.github.com/user/repos`,
        { name: repo, private: false },
        { headers: { Authorization: `Bearer ${githubToken}` } }
      )
      if (!repos.includes(repo)) repos.push(repo)
    } else throw e
  }
}
function generateRepoName() {
  return `dat-${crypto.randomBytes(3).toString('hex')}`
}
async function uploadFile(buffer) {
  const detected = await fileTypeFromBuffer(buffer)
  const ext = detected?.ext || 'bin'
  const code = crypto.randomBytes(3).toString('hex')
  const fileName = `${code}-${Date.now()}.${ext}`
  const filePathGitHub = `uploads/${fileName}`
  const base64Content = Buffer.from(buffer).toString('base64')
  let targetRepo = repos[Math.floor(Math.random()*repos.length)]
  try { await ensureRepoExists(targetRepo) }
  catch { targetRepo = generateRepoName(); await ensureRepoExists(targetRepo) }
  await axios.put(
    `https://api.github.com/repos/${owner}/${targetRepo}/contents/${filePathGitHub}`,
    { message:`Upload file ${fileName}`, content:base64Content, branch },
    { headers:{ Authorization:`Bearer ${githubToken}` } }
  )
  return `https://raw.githubusercontent.com/${owner}/${targetRepo}/${branch}/${filePathGitHub}`
}
let handler = async (m, { conn, usedPrefix, command, text }) => {
  try {
      if (!text) return m.reply(`Kirim/relpy gambar\n💬 Contoh penggunaan:\n${usedPrefix + command} 14`);
        
            let number = text.replace(/[^0-9]/g, "");
            if (!number) return m.reply(`Resolusinya berapa?\nList resolusi:\n1-16\n\n💬 Contoh penggunaan:\n${usedPrefix + command} 16`);
            
     const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ''
    if (!mime.startsWith('image/')) return m.reply('Mana Gambarnya?')
    m.reply('Wait...')
    let buffer = await q.download()
    let url = await uploadFile(buffer)
    await conn.sendMessage(m.chat, {
      image: { url: `https://api.nexray.web.id/tools/upscale?url=${encodeURIComponent(url)}&resolusi=${encodeURIComponent(text)}` },
      caption: `
✨ Gambar kamu telah ditingkatkan hingga ${text}x resolusi.

📈 Kualitas lebih tajam & detail lebih jelas.

🔧 _Gunakan fitur ini kapan saja untuk memperjelas gambar blur._
`.trim()
    }, { quoted: m })
  } catch(e) {
    m.reply(e.message)
  }
}

handler.help = ['upscale', 'hd', 'remini']
handler.tags = ['tools', 'image']
handler.command = ['upscale', 'hd', 'remini']
handler.limit = true
handler.register = true

export default handler;

import fs from 'fs'
import axios from 'axios'
import crypto from 'crypto'
import { fileTypeFromBuffer } from 'file-type'
 
const githubToken = `${global.token}`
const owner = `${global.Owner}`
const branch = 'main'
let repos = ['Dat1', 'Dat2', 'Dat3']
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
let handler = async (m,{conn}) => {
  try {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ''
    if (!mime) return m.reply('Mana filenya')
    m.reply('Wait...')
    let buffer = await q.download()
    let url = await uploadFile(buffer)
    await m.reply(url)
  } catch(e) {
    m.reply(e.message)
  }
}
handler.help = ['tourlgit']
handler.command = /^tourl(2|git|github)$/i;
handler.tags = ['tools']
handler.limit = true
handler.premium = false
handler.register = true
 
export default handler
import os from 'os'
import { performance } from 'perf_hooks'
import { execSync } from 'child_process'

let handler = async (m, { conn }) => {
  const old = performance.now()
  const speed = (performance.now() - old).toFixed(3)
  const formatDuration = (ms) => {
    const d = Math.floor(ms / (1000 * 60 * 60 * 24))
    const h = Math.floor(ms / (1000 * 60 * 60)) % 24
    const m = Math.floor(ms / (1000 * 60)) % 60
    const s = Math.floor(ms / 1000) % 60
    return [d && `${d}d `, h && `${h}h `, m && `${m}m `, s && `${s}s`].filter(Boolean).join('')
  }

  const uptimeBot = formatDuration(process.uptime() * 1000)
  const uptimeVps = formatDuration(os.uptime() * 1000)
  
  const totalMem = (os.totalmem() / 1024 ** 3).toFixed(2)
  const freeMem = (os.freemem() / 1024 ** 3).toFixed(2)
  const usedMem = (totalMem - freeMem).toFixed(2)
  
  const cpu = os.cpus()[0]
  const cpuModel = cpu.model.replace(/\((R|TM)\)/g, '').trim()
  const cpuCores = os.cpus().length

  let disk = { total: '-', used: '-', percent: '-' }
  try {
    const stdout = execSync("df -h / | tail -1").toString().split(/\s+/)
    disk = { total: stdout[1], used: stdout[2], percent: stdout[4] }
  } catch (e) {}
  let caption = `
╭─〔  *S Y S T E M  S T A T S* 〕
│
│  ◦ *Response* : ${speed} ms
│  ◦ *Bot Uptime* : ${uptimeBot}
│  ◦ *Server Up* : ${uptimeVps}
│
├─〔  *S E R V E R  I N F O* 〕
│
│  ◦ *Platform* : ${os.platform()} ${os.arch()}
│  ◦ *CPU* : ${cpuModel}
│  ◦ *Cores* : ${cpuCores} Core(s)
│  ◦ *Memory* : ${usedMem} GB / ${totalMem} GB
│  ◦ *Storage* : ${disk.used} / ${disk.total} (${disk.percent})
│
╰─────────────────⬣`.trim()

  await conn.sendMessage(m.chat, {
    text: caption,
    contextInfo: {
      externalAdReply: {
        title: "ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻ SYSTEM",
        body: `Uptime: ${uptimeBot}`,
        thumbnailUrl: "https://files.cloudkuimages.guru/images/1379bdf28569.jpeg", 
        sourceUrl: "",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping']

export default handler
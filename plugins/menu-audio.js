let handler = async (m) => {
  m.reply(`
╔══〔 AUDIO 〕───⬡
║ ⬡ .bass
║ ⬡ .blown
║ ⬡ .deep
║ ⬡ .earrape
║ ⬡ .fast
║ ⬡ .fat
║ ⬡ .nightcore
║ ⬡ .reverse
║ ⬡ .robot
║ ⬡ .slow
║ ⬡ .smooth
║ ⬡ .tupai
║ ⬡ .reverb
║ ⬡ .chorus
║ ⬡ .flanger
║ ⬡ .distortion
║ ⬡ .pitch
║ ⬡ .highpass
║ ⬡ .lowpass
║ ⬡ .underwater
║ ⬡ .zetavoice
╚════════════════⬡
`.trim())
}
handler.command = /^menuaudio$/i
handler.help = ["menuaudio"]
handler.tags = ["main"]
export default handler
let handler = async (m, { command, args }) => {
  try {
    if (!args[0]) return m.reply(`*Example:* .${command} https://sfl.gl/infinitetotemv1`)
    m.reply("Wait")

    let j = await (await fetch(
      `https://fgsi.dpdns.org/api/tools/skip/tutwuri?apikey=${global.apikey}&url=${encodeURIComponent(args[0])}`
    )).json()

    if (!j.status || !j.data?.url) throw "Failed"

    m.reply(j.data.url)
  } catch (e) {
    m.reply(String(e))
  }
}

handler.help = ['sfl','skipsfl']
handler.tags = ['tools']
handler.command = ['sfl','skipsfl']

export default handler
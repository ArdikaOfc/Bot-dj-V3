/*
Wm: https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
Jgn hapus wm ku
Fitur:  Fake dana
Type : Plugins Esm 
Api: https://api.skylow.web.id/
*/
let handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) return m.reply(`💬 Contoh penggunaan:\n${usedPrefix + command} 1000`);

        try {
            let number = text.replace(/[^0-9]/g, "");
            if (!number) return m.reply(`Nominalnya berapa?\n💬 Contoh penggunaan:\n${usedPrefix + command} 10000`);
            

    m.reply('Tunggu Sedang Di proses...')

    await conn.sendMessage(m.chat, { image: { url: `https://api.skylow.web.id/api/maker/fakedana?text=${text}` }, footer: global.footer, caption: `✨Sukses Membuat *FAKE DANA*`, contextInfo: { forwardingScore: 10, isForwarded: true, } }, { quoted: m })

  } catch (e) {
    m.reply(e.message)
  }
};

handler.help = ['fakedana'];
handler.command = ['fdana','fakedana'];
handler.tags = ['tools'];
handler.limit = 5
handler.register = true

export default handler;
const handler = async (m, { conn, usedPrefix: _p }) => {
  const targetDate = new Date("February 8, 2027 00:00:00");
  const currentDate = new Date();
  const remainingTime = targetDate.getTime() - currentDate.getTime();

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  const countdownMessage = `Tinggal ${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik menuju hari puasa tahun 2027!`;
  const img = "https://telegra.ph/file/c1e45131e3702d2150d2f.jpg";

  const name = m.sender;
  const fkonn = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: "0@s.whatsapp.net" } : {}),
    },
    message: {
      contactMessage: {
        displayName: `${await conn.getName(name)}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  };

  await conn.sendMessage(
    m.chat,
    {
      text: countdownMessage,
      contextInfo: {
        forwardingScore: 99999,
        isForwarded: true,
        externalAdReply: {
          title: "Puasa 2027",
          thumbnailUrl: img,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: fkonn }
  );
};

handler.help = ["puasa"];
handler.tags = ["info"];
handler.command = /^(puasa)$/i;

export default handler;
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`Contoh penggunaan: ${usedPrefix + command} https://youtu.be/xxxx`);
  if (!args[0].match(/youtu\.be|youtube\.com/i)) return m.reply('URL YouTube tidak valid!');

  try {
    await m.reply('Wait a moment ');
    
    const headers = {
      "accept": "*/*",
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": "\"Android\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "Referer": "https://id.ytmp3.mobi/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    };

    const initial = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers });
    const init = await initial.json();
    
    const id = args[0].match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
    if (!id) throw new Error('Gagal mendapatkan ID video');
    
    const convertURL = init.convertURL + `&v=${id}&f=mp4&_=${Math.random()}`;
    const converts = await fetch(convertURL, { headers });
    const convert = await converts.json();
    
    let info = {};
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const progressRes = await fetch(convert.progressURL, { headers });
      info = await progressRes.json();
      if (info.progress === 3) break;
    }
    
    if (!info.title || !convert.downloadURL) throw new Error('Konversi gagal');
    
    await conn.sendMessage(
      m.chat, 
      {
        video: { url: convert.downloadURL },
        caption: `Judul: ${info.title}`,
        ptv: false
      },
      { quoted: m }
    );

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

  } catch (error) {
    console.error(error);
    await m.reply(`Error: ${error.message}`);

    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
  }
};

handler.help = ['ytmp4 <url>'];
handler.command = /^yt(video|v|mp4)|videoyt$/i;
handler.tags = ['downloader']

handler.limit = true
handler.register = true

export default handler
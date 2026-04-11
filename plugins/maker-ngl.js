import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text.includes('|')) throw `Masukkan title dan text dipisahkan dengan "|"\n\nContoh:\n${usedPrefix + command} Anonymous Chat|haii bang`;

  let [title, teks] = text.split('|').map(s => s.trim());
  if (!title || !teks) throw `Masukkan title dan text yang valid!\n\nContoh:\n${usedPrefix + command} Anonymous Chat|haii bang`;

  let loading = await m.reply('Tunggu sebentar kak, sedang diproses...');

  let api = `https://www.veloria.my.id/imagecreator/fakengl?text=${encodeURIComponent(teks)}&title=${encodeURIComponent(title)}`;

  try {
    let res = await fetch(api);
    if (!res.ok) throw 'Gagal mengambil gambar dari API!';
    let buffer = await res.buffer();

    await conn.sendFile(m.chat, buffer, 'ngl.png', `Title: ${title}\nText: ${teks}`, m);
  } catch (e) {
    console.error(e);
    m.reply('Terjadi error saat mengambil gambar. Coba lagi nanti.');
  } finally {
    if (loading) await conn.sendMessage(m.chat, { delete: loading.key });
  }
};

handler.command = /^ngl$/i;
handler.help = ['ngl <title>|<text>'];
handler.tags = ['maker'];
handler.limit = true
handler.register = true

export default handler;
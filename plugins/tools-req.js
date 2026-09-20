/*
Wm: https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
Jgn hapus wm ku
Fitur:  Request (kirim ke channel dan owner)
Type : Plugins Esm 
Api: -
Creator: ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
*/

import { Canvas } from 'skia-canvas';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database', 'requests.json');

function initDatabase() {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

function saveRequest(requestData) {
  initDatabase();
  const list = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  list.push(requestData);
  fs.writeFileSync(dbPath, JSON.stringify(list, null, 2));
}

function getDynamicFontSize(textLength) {
  if (textLength <= 15) return 65; 
  if (textLength <= 35) return 50; 
  if (textLength <= 70) return 40; 
  return 32;   
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
}

function drawRoundedCard(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

async function generateNglBuffer(username, requestText) {
  const width = 1000;
  const height = 1000;
  const canvas = new Canvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#F5F5F5';
  ctx.fillRect(0, 0, width, height);

  const cardX = 80;
  const cardY = 270;
  const cardW = 840;
  const cardH = 460;
  const radius = 40;
  const headerH = 130;

  ctx.save();
  drawRoundedCard(ctx, cardX, cardY, cardW, cardH, radius);
  ctx.clip();

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(cardX, cardY, cardW, cardH);

  const headerGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY);
  headerGrad.addColorStop(0, '#FF0055');
  headerGrad.addColorStop(0.5, '#FF3366');
  headerGrad.addColorStop(1, '#FF9933');
  ctx.fillStyle = headerGrad;
  ctx.fillRect(cardX, cardY, cardW, headerH);

  ctx.restore();

  const centerX = width / 2;

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 42px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(username, centerX, cardY + 80);

  const fontSize = getDynamicFontSize(requestText.length);
  const lineHeight = Math.round(fontSize * 1.25);

  ctx.fillStyle = '#222222';
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = 'center';

  const startY = cardY + headerH + (fontSize > 50 ? 110 : 90);
  wrapText(ctx, requestText, centerX, startY, cardW - 80, lineHeight);

  return await canvas.toBuffer('jpeg', { quality: 1.0 });
}

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`*Contoh Penggunaan:*\nketik \`.req fitur ai\``);

  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

  try {
    const senderName = m.pushName || m.sender.split('@')[0];
    const requestText = text.trim();
    const requestId = 'REQ-' + Date.now().toString().slice(-6);

    const imageBuffer = await generateNglBuffer(senderName, requestText);

    saveRequest({
      id: requestId,
      sender: m.sender,
      name: senderName,
      request: requestText,
      status: 'PENDING',
      date: new Date().toISOString()
    });

    const channelJid = "120363199397739684@newsletter";
    let ownerNum = (global.owner && global.owner[0]) ? global.owner[0] : conn.user.jid.split('@')[0];
    if (Array.isArray(ownerNum)) ownerNum = ownerNum[0];
    const ownerJid = String(ownerNum).replace(/[^0-9]/g, '') + "@s.whatsapp.net";

    try {
      await conn.sendMessage(ownerJid, { image: imageBuffer, caption: `Request fitur ${requestText}`, mentions: [m.sender] });
    } catch (e) { console.error('Error Owner:', e.message); }

    try {
      await conn.sendMessage(channelJid, { image: imageBuffer, caption: `Request baru nih` });
    } catch (e) { console.error('Error Saluran:', e.message); }

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    await m.reply(`✅ *Request fitur berhasil dikirim!*\n🆔 ID Request: *${requestId}*`);

  } catch (e) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    m.reply(`❌ Terjadi kesalahan: ${e.message}`);
  }
};

handler.help = ['req <text>'];
handler.tags = ['tools', 'info'];
handler.command = /^req$/i;
handler.limit = false;
handler.register = true;

export default handler;

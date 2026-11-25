/*
Wm: https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
Jgn hapus wm ku
Fitur:  Website To Aplikasi
Type : Plugins Esm 
Api: https://heavstal.com.ng/
Creator: ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
*NOTE:* Untuk mengambil api key daftar terlebih dahulu di https://heavstal.com.ng
*/

import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

const API_ENDPOINT = 'https://heavstal.com.ng/api/v1/tools/web2apk';
const API_KEY =
  process.env.HEAVSTAL_API_KEY ||
  'YOUR_API_KEY';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const usageText =
    `Kirim atau reply gambar dengan caption:\n\n` +
    `*${usedPrefix + command}* url|nama|version_name|package_name|version_code\n\n` +
    `Contoh: ${usedPrefix + command} https://ardikastore.ct.ws|Ardika Official|1.6.0|com.ardikaofficial.app|1\n` +
    `_Note: version_code bersifat opsional._`;

  const imageMsg = extractImageMessage(m);
  if (!imageMsg) {
    return m.reply(usageText);
  }

  if (!text || !text.includes('|')) {
    return m.reply(usageText);
  }

  const parts = text.split('|').map((p) => (p ?? '').trim());
  const websiteUrl = parts[0] || '';
  const appName = parts[1] || '';
  const versionName = parts[2] || '1.0.0';
  const rawPackageName = parts[3] || '';
  const rawVersionCode = parts[4] || '';

  if (!isValidUrl(websiteUrl)) {
    return m.reply('URL tidak valid! Pastikan diawali dengan *http://* atau *https://*');
  }

  if (!appName) {
    return m.reply('Nama aplikasi tidak boleh kosong!');
  }

  const packageName = sanitizePackageName(rawPackageName) || generatePackageName(websiteUrl, appName);
  const versionCode = parseVersionCode(rawVersionCode, versionName);

  try {
    const iconBuffer = await downloadMediaBuffer(imageMsg);
    await m.reply('⏳ Sedang memproses Web to APK...');

    const iconUrl = await uploadIconToHost(iconBuffer);

    const payload = {
      website_url: websiteUrl,
      app_name: appName,
      icon_url: iconUrl,
      version_name: versionName,
      version_code: versionCode,
      package_name: packageName,
    };

    const apiRes = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const rawText = await apiRes.text();
    let json;
    try {
      json = JSON.parse(rawText);
    } catch {
      throw new Error(`Respon API bukan JSON valid (HTTP ${apiRes.status}): ${rawText.slice(0, 200)}`);
    }

    if (!apiRes.ok || json?.status === 'error' || json?.success === false) {
      throw new Error(json?.message || json?.error || `HTTP ${apiRes.status}`);
    }

    const data = json?.data || json;
    const apkUrl = data?.apk_url || data?.url || data?.download_url;

    if (!apkUrl || !isValidUrl(apkUrl)) {
      throw new Error('Respon API tidak menyertakan `apk_url` yang valid.');
    }

    const apkDownloadRes = await fetch(apkUrl);
    if (!apkDownloadRes.ok) {
      throw new Error(`Gagal mengunduh APK dari server (HTTP ${apkDownloadRes.status}).`);
    }

    const apkBuffer = Buffer.from(await apkDownloadRes.arrayBuffer());
    if (apkBuffer.length < 1024) {
      throw new Error('File APK yang diunduh kosong atau tidak valid.');
    }

    const finalAppName = data?.app_name || appName;
    const finalPackage = data?.package_name || packageName;
    const finalVersion = data?.version || versionName;
    const fileName = `${sanitizeFileName(finalAppName) || 'app'}.apk`;
    const sizeReadable = formatBytes(apkBuffer.length);

    const caption = `
*📱 WEB TO APK BERHASIL*

*🏷️ App Name:* ${finalAppName}
*📦 Package:* ${finalPackage}
*🔖 Version:* ${finalVersion} (Code: ${versionCode})
*🌐 Website:* ${websiteUrl}
*📄 File Name:* ${fileName}
*📊 Size:* ${sizeReadable}
`.trim();

    return conn.sendMessage(
      m.chat,
      {
        document: apkBuffer,
        fileName,
        mimetype: 'application/vnd.android.package-archive',
        caption,
      },
      { quoted: m }
    );
  } catch (e) {
    console.error('[WEB2APK ERROR]:', e);
    return m.reply(`❌ Gagal membuat APK: ${e?.message || e}`);
  }
};

handler.help = ['web2apk'];
handler.tags = ['tools', 'maker'];
handler.command = /^(web2apk|webtoapk|w2a)$/i;
handler.limit = true;

export default handler;

async function uploadIconToHost(buffer) {
  const tmpFile = path.join(os.tmpdir(), `w2a-icon-${Date.now()}.png`);
  await fs.writeFile(tmpFile, buffer);

  try {
    try {
      const { stdout } = await execFileAsync(
        'curl',
        [
          '-s',
          '-F',
          'reqtype=fileupload',
          '-F',
          `fileToUpload=@${tmpFile}`,
          'https://catbox.moe/user/api.php',
        ],
        { timeout: 30000 }
      );
      const url = (stdout || '').trim();
      if (isValidUrl(url)) return url;
    } catch {}

    try {
      const form = new FormData();
      form.append('file', new Blob([buffer], { type: 'image/png' }), 'icon.png');
      const res = await fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: form,
      });
      const json = await res.json();
      const rawUrl = json?.data?.url;
      if (rawUrl && isValidUrl(rawUrl)) {
        return rawUrl.includes('/dl/') ? rawUrl : rawUrl.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
      }
    } catch {}

    throw new Error('Gagal mengunggah gambar icon ke host publik untuk mendapatkan icon_url.');
  } finally {
    await fs.unlink(tmpFile).catch(() => {});
  }
}

function extractImageMessage(m) {
  const mime = m?.mimetype || '';
  if (/image\/(jpe?g|png|webp)/i.test(mime)) return m;
  if (m?.msg?.mimetype && /image\/(jpe?g|png|webp)/i.test(m.msg.mimetype)) return m.msg;

  const quoted = m?.quoted;
  if (quoted) {
    const qMime = quoted?.mimetype || quoted?.msg?.mimetype || '';
    if (/image\/(jpe?g|png|webp)/i.test(qMime)) return quoted;
  }
  return null;
}

async function downloadMediaBuffer(mediaMsg) {
  if (typeof mediaMsg.download === 'function') {
    const buf = await mediaMsg.download();
    return Buffer.isBuffer(buf) ? buf : Buffer.from(buf);
  }
  if (typeof mediaMsg.fakeObj?.download === 'function') {
    const buf = await mediaMsg.fakeObj.download();
    return Buffer.isBuffer(buf) ? buf : Buffer.from(buf);
  }
  throw new Error('Gagal mengunduh gambar icon dari pesan.');
}

function sanitizePackageName(pkg) {
  if (!pkg) return '';
  const cleaned = pkg
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace(/^\.+|\.+$/g, '');
  return cleaned.includes('.') ? cleaned : '';
}

function parseVersionCode(rawCode, versionName) {
  if (rawCode && /^\d+$/.test(rawCode)) {
    const num = parseInt(rawCode, 10);
    if (num > 0) return num;
  }
  const digits = String(versionName || '1.0.0').replace(/\D/g, '');
  const parsed = parseInt(digits, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function generatePackageName(websiteUrl, appName) {
  try {
    const hostname = new URL(websiteUrl).hostname.replace(/^www\./, '');
    const reversedHost = hostname.split('.').filter(Boolean).reverse();
    const appSlug = appName.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (reversedHost.length >= 3) {
      return `${reversedHost[0]}.${reversedHost[1]}.${appSlug || reversedHost[2]}`;
    }
    return `${reversedHost.join('.')}.${appSlug || 'app'}`;
  } catch {
    return 'com.webapp.android';
  }
}

function isValidUrl(str) {
  try {
    const parsed = new URL(str);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function sanitizeFileName(name) {
  return name
    .replace(/[^a-zA-Z0-9 _-]/g, '')
    .trim()
    .replace(/\s+/g, '_');
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/*
Wm: https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
Jgn hapus wm ku
Fitur: AUTO DOWNLOAD (Full Precision API Response Adaptor)
Type : Plugins Esm
Api: Nexray, Siputzx, Faa, Deline
*/

import axios from 'axios';

let handler = m => m;

handler.before = async (m, { conn }) => {
    if (m.isBaileys || m.fromMe || m.text.startsWith('.') || m.text.startsWith('!')) return;

    const now = Date.now();
    conn.lastDownload = conn.lastDownload || {};
    const last = conn.lastDownload[m.chat] || 0;
    if (now - last < 5000) return;

    const text = m.text.trim();
    if (!/^https?:\/\/[^\s]+$/i.test(text)) return;

    const url = text;

    try {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            conn.lastDownload[m.chat] = now;
            return await handleYouTube(conn, m, url);
        }
        if (url.includes('twitter.com') || url.includes('x.com')) {
            conn.lastDownload[m.chat] = now;
            return await handleTwitter(conn, m, url);
        }
        if (url.includes('tiktok.com') || url.includes('vt.tiktok.com')) {
            conn.lastDownload[m.chat] = now;
            return await handleTikTok(conn, m, url);
        }
        if (url.includes('instagram.com') || url.includes('instagr.am')) {
            conn.lastDownload[m.chat] = now;
            return await handleInstagram(conn, m, url);
        }
        if (url.includes('facebook.com') || url.includes('fb.watch') || url.includes('fb.gg')) {
            conn.lastDownload[m.chat] = now;
            return await handleFacebook(conn, m, url);
        }
        if (url.includes('spotify.com') && url.includes('track')) {
            conn.lastDownload[m.chat] = now;
            return await handleSpotify(conn, m, url);
        }
        if (url.includes('mediafire.com')) {
            conn.lastDownload[m.chat] = now;
            return await handleMediaFire(conn, m, url);
        }
        if (url.includes('sfile.mobi')) {
            conn.lastDownload[m.chat] = now;
            return await handleSFile(conn, m, url);
        }
        if (url.includes('github.com')) {
            conn.lastDownload[m.chat] = now;
            return await handleGitHub(conn, m, url);
        }
    } catch (error) {
        console.error(`Error processing ${url}:`, error);
    }
};

// ==========================================
// 1. YOUTUBE
// ==========================================
async function handleYouTube(conn, m, url) {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    let vidUrl = null, audUrl = null, title = "YouTube Video";

    // Coba API 1: Nexray v1
    try {
        const { data } = await axios.get(`https://api.nexray.eu.cc/downloader/v1/ytmp4?url=${encodeURIComponent(url)}&resolusi=720`);
        if (data.status && data.result?.url) {
            vidUrl = data.result.url;
            title = data.result.title || title;
        }
    } catch (e) {}

    // Coba API 2: Faa
    if (!vidUrl) {
        try {
            const { data } = await axios.get(`https://api-faa.my.id/faa/ytmp4?url=${encodeURIComponent(url)}`);
            if (data.status && data.result?.download_url) {
                vidUrl = data.result.download_url;
            }
        } catch (e) {}
    }

    // Coba API 3: Deline
    if (!vidUrl) {
        try {
            const { data } = await axios.get(`https://api.deline.web.id/downloader/youtube?url=${encodeURIComponent(url)}`);
            if (data.status && data.result) {
                title = data.result.title || title;
                if (Array.isArray(data.result.medias) && data.result.medias.length > 0) {
                    let mp4Media = data.result.medias.filter(m => m.ext === 'mp4' && m.url);
                    vidUrl = mp4Media.length > 0 ? mp4Media[0].url : data.result.medias[0].url;
                }
            }
        } catch (e) {}
    }

    // Coba API 4: Siputzx (Fallback)
    if (!vidUrl) {
        try {
            const { data } = await axios.get(`https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(url)}`);
            vidUrl = data.data?.dl || data.url || data.result?.url;
            title = data.data?.title || data.title || title;
        } catch (e) {}
    }

    if (!vidUrl) {
        await conn.reply(m.chat, '❌ Gagal mengunduh video YouTube dari semua API.', m);
        return await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }

    await conn.sendFile(m.chat, vidUrl, 'ytmp4.mp4', `📽 *Judul:* ${title}\n✅ *Berhasil mengunduh video YouTube!*`, m);

    // Audio Extraction
    // 1. Nexray MP3
    try {
        const { data } = await axios.get(`https://api.nexray.eu.cc/downloader/ytmp3?url=${encodeURIComponent(url)}`);
        if (data.status && data.result?.url) {
            audUrl = data.result.url;
        }
    } catch (e) {}

    // 2. Faa MP3
    if (!audUrl) {
        try {
            const { data } = await axios.get(`https://api-faa.my.id/faa/ytmp3?url=${encodeURIComponent(url)}`);
            if (data.status && data.result?.mp3) {
                audUrl = data.result.mp3;
            }
        } catch (e) {}
    }

    // 3. Siputzx MP3
    if (!audUrl) {
        try {
            const resAudio = await axios.get(`https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(url)}`);
            audUrl = resAudio.data.data?.dl || resAudio.data.url || resAudio.data.result?.url;
        } catch (e) {}
    }

    if (audUrl) {
        await conn.sendMessage(m.chat, { audio: { url: audUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
    }

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}


// ==========================================
// 2. TIKTOK
// ==========================================
async function handleTikTok(conn, m, url) {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    let mediaUrl, audioUrl, title = "-", author = "-";
    let isSuccess = false;

    try {
        const { data } = await axios.get(`https://api.nexray.eu.cc/downloader/tiktok?url=${encodeURIComponent(url)}`);
        if (data.status && data.result) {
            mediaUrl = data.result.data || data.result.nowatermark;
            title = data.result.title || title;
            author = data.result.author?.nickname || data.result.author?.fullname || author;
            audioUrl = data.result.music_info?.url || data.result.audio;
            isSuccess = true;
        }
    } catch (e) {}

    if (!isSuccess) {
        try {
            const { data } = await axios.get(`https://api-faa.my.id/api/downloader/tiktok?url=${encodeURIComponent(url)}`);
            let res = data.result || data.data;
            if (res) {
                mediaUrl = res.nowatermark || res.video || res.url;
                title = res.title || title;
                author = res.author || author;
                audioUrl = res.audio;
                isSuccess = true;
            }
        } catch (e) {}
    }

    if (!isSuccess || !mediaUrl) {
        await conn.reply(m.chat, '❌ Gagal mengunduh TikTok dari semua API.', m);
        return await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }

    let caption = `🎥 *Judul:* ${title}\n👤 *Author:* ${author}\n✅ *Berhasil mengunduh TikTok!*`;

    if (Array.isArray(mediaUrl)) {
        for (let i = 0; i < mediaUrl.length; i++) {
            await conn.sendMessage(m.chat, { image: { url: mediaUrl[i] }, caption: i === 0 ? caption : "" }, { quoted: m });
        }
    } else {
        await conn.sendMessage(m.chat, { video: { url: mediaUrl }, caption: caption }, { quoted: m });
    }

    if (audioUrl) {
        await conn.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
    }

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}

// ==========================================
// 3. INSTAGRAM
// ==========================================
async function handleInstagram(conn, m, url) {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    let mediaList = [];

    try {
        const { data } = await axios.get(`https://api.nexray.eu.cc/downloader/instagram?url=${encodeURIComponent(url)}`);
        if (data.status && Array.isArray(data.result)) {
            mediaList = data.result.map(item => item.url).filter(Boolean);
        }
    } catch (e) {}

    if (mediaList.length === 0) {
        try {
            const { data } = await axios.get(`https://api-faa.my.id/faa/igdl?url=${encodeURIComponent(url)}`);
            if (data.status && data.result?.url) {
                mediaList = Array.isArray(data.result.url) ? data.result.url : [data.result.url];
            }
        } catch (e) {}
    }

    if (mediaList.length === 0) {
        try {
            const { data } = await axios.get(`https://api.deline.web.id/api/downloader/igdl?url=${encodeURIComponent(url)}`);
            let resData = data.result || data.data || data;
            if (resData) {
                let items = Array.isArray(resData) ? resData : [resData];
                mediaList = items.map(i => i.url || i).filter(Boolean);
            }
        } catch (e) {}
    }

    if (mediaList.length === 0) {
        await conn.reply(m.chat, '❌ Gagal mengunduh Instagram dari semua API.', m);
        return await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }

    let audioExtracted = false;
    for (let igUrl of mediaList) {
        await conn.sendFile(m.chat, igUrl, null, `*🌐Status:* _Sukses Auto DL IG_`, m);
        if (typeof igUrl === 'string' && igUrl.includes('.mp4') && !audioExtracted) {
            await conn.sendMessage(m.chat, { audio: { url: igUrl }, mimetype: 'audio/mp4' }, { quoted: m });
            audioExtracted = true;
        }
    }

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}

// ==========================================
// 4. FACEBOOK
// ==========================================
async function handleFacebook(conn, m, url) {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    let vidUrl = null, title = "Facebook Video";

    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/d/facebook?url=${encodeURIComponent(url)}`);
        if (data.status && data.data?.downloads) {
            let hdItem = data.data.downloads.find(d => d.quality && d.quality.includes('HD'));
            let sdItem = data.data.downloads.find(d => d.quality && d.quality.includes('SD'));
            vidUrl = hdItem?.url || sdItem?.url || data.data.downloads[0]?.url;
            title = data.data.title || title;
        }
    } catch (e) {}

    if (!vidUrl) {
        try {
            const { data } = await axios.get(`https://api-faa.my.id/faa/fbdownload?url=${encodeURIComponent(url)}`);
            if (data.status && data.result?.media) {
                vidUrl = data.result.media;
            }
        } catch (e) {}
    }

    if (!vidUrl) {
        await conn.reply(m.chat, '❌ Gagal mengunduh Facebook dari semua API.', m);
        return await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }

    await conn.sendFile(m.chat, vidUrl, 'fb.mp4', `✅ *Judul:* ${title}`, m);
    await conn.sendMessage(m.chat, { audio: { url: vidUrl }, mimetype: 'audio/mp4' }, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}

// ==========================================
// 5. TWITTER / X (Nexray Response Adjusted)
// ==========================================
async function handleTwitter(conn, m, url) {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    let vidUrl = null, title = "Twitter Video";

    // Coba API 1: Nexray
    try {
        const { data } = await axios.get(`https://api.nexray.eu.cc/downloader/twitter?url=${encodeURIComponent(url)}`);
        if (data.status && data.result?.download_url) {
            title = data.result.title || title;
            // Filter opsi mp4 dengan resolusi terbaik
            let mp4Options = data.result.download_url.filter(item => item.type === 'mp4' && item.url);
            if (mp4Options.length > 0) {
                vidUrl = mp4Options[0].url;
            } else if (data.result.download_url[0]?.url) {
                vidUrl = data.result.download_url[0].url;
            }
        }
    } catch (e) {}

    // Coba API 2: Deline (Fallback)
    if (!vidUrl) {
        try {
            const { data } = await axios.get(`https://api.deline.web.id/api/downloader/twitter?url=${encodeURIComponent(url)}`);
            let mediaData = data.result || data.data || data;
            vidUrl = mediaData.media?.[0]?.url || mediaData?.[0]?.url || mediaData.url;
        } catch (e) {}
    }

    // Coba API 3: Siputzx (Fallback)
    if (!vidUrl) {
        try {
            const { data } = await axios.get(`https://api.siputzx.my.id/api/d/twitter?url=${encodeURIComponent(url)}`);
            vidUrl = data.data?.url || data.result?.url || data.url;
        } catch (err) {}
    }

    if (!vidUrl) {
        await conn.reply(m.chat, '❌ Gagal mengunduh Twitter dari semua API.', m);
        return await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }

    await conn.sendFile(m.chat, vidUrl, 'twitter.mp4', `✅ *Judul:* ${title}\n*Berhasil mengunduh dari Twitter/X!*`, m);
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}

// ==========================================
// 6. SPOTIFY (Nexray Response Adjusted)
// ==========================================
async function handleSpotify(conn, m, url) {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    let audioUrl = null, title = "Spotify Music", artist = "Unknown Artist";

    // Coba API 1: Nexray
    try {
        const { data } = await axios.get(`https://api.nexray.eu.cc/downloader/spotify?url=${encodeURIComponent(url)}`);
        if (data.status && data.result?.url) {
            audioUrl = data.result.url;
            title = data.result.title || title;
            artist = data.result.artist || artist;
        }
    } catch (e) {}

    // Coba API 2: Siputzx (Fallback)
    if (!audioUrl) {
        try {
            const { data } = await axios.get(`https://api.siputzx.my.id/api/d/spotify?url=${encodeURIComponent(url)}`);
            audioUrl = data.data?.download || data.data?.url || data.url || data.result?.url;
            title = data.data?.title || data.title || title;
            artist = data.data?.artist || artist;
        } catch (e) {}
    }

    // Coba API 3: Faa (Fallback)
    if (!audioUrl) {
        try {
            const { data } = await axios.get(`https://api-faa.my.id/api/downloader/spotify?url=${encodeURIComponent(url)}`);
            audioUrl = data.result?.url || data.data?.url || data.url;
            title = data.result?.title || title;
        } catch (err) {}
    }

    if (!audioUrl) {
        await conn.reply(m.chat, '❌ Gagal mendownload lagu dari Spotify.', m);
        return await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }

    await conn.sendMessage(m.chat, {
        audio: { url: audioUrl },
        mimetype: 'audio/mpeg',
        fileName: `${title} - ${artist}.mp3`,
        
    }, { quoted: global.fgclink });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}

// ==========================================
// 7. MEDIAFIRE (Nexray & Faa Response Adjusted)
// ==========================================
async function handleMediaFire(conn, m, url) {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    let fileUrl = null, fileName = "MediaFire_Download", fileSize = "";

    // Coba API 1: Faa
    try {
        const { data } = await axios.get(`https://api-faa.my.id/faa/mediafire?url=${encodeURIComponent(url)}`);
        if (data.status && data.result?.download_url) {
            fileUrl = data.result.download_url;
            fileName = data.result.filename || fileName;
            fileSize = data.result.size || "";
        }
    } catch (e) {}

    // Coba API 2: Nexray (Fallback)
    if (!fileUrl) {
        try {
            const { data } = await axios.get(`https://api.nexray.eu.cc/downloader/mediafire?url=${encodeURIComponent(url)}`);
            if (data.status && data.result?.download_url) {
                fileUrl = data.result.download_url;
                if (data.result.filename && data.result.filename !== "unknown_file") {
                    fileName = data.result.filename;
                }
                fileSize = data.result.filesize !== "unknown" ? data.result.filesize : "";
            }
        } catch (e) {}
    }

    // Coba API 3: Siputzx (Fallback)
    if (!fileUrl) {
        try {
            const { data } = await axios.get(`https://api.siputzx.my.id/api/d/mediafire?url=${encodeURIComponent(url)}`);
            let fileData = data.data || data.result;
            fileUrl = fileData?.url || fileData?.download;
            fileName = fileData?.filename || fileName;
        } catch (err) {}
    }

    if (!fileUrl) {
        await conn.reply(m.chat, '❌ Gagal mendownload file MediaFire.', m);
        return await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }

    let caption = `✅ *Berhasil mengunduh dari MediaFire!*\n📁 *File:* ${fileName}`;
    if (fileSize) caption += `\n📊 *Size:* ${fileSize}`;

    await conn.sendMessage(m.chat, { 
        document: { url: fileUrl }, 
        fileName: fileName,
        mimetype: "application/octet-stream",
        caption: caption
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}

// ==========================================
// 8. SFILE.MOBI (Nexray Response Adjusted)
// ==========================================
async function handleSFile(conn, m, url) {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    let fileUrl = null, fileName = "SFile_Download", fileSize = "";

    // Coba API 1: Nexray
    try {
        const { data } = await axios.get(`https://api.nexray.eu.cc/downloader/sfile?url=${encodeURIComponent(url)}`);
        if (data.status && data.result?.url) {
            fileUrl = data.result.url;
            fileName = data.result.file_name || fileName;
            fileSize = data.result.size || "";
        }
    } catch (e) {}

    // Coba API 2: Siputzx (Fallback)
    if (!fileUrl) {
        try {
            const { data } = await axios.get(`https://api.siputzx.my.id/api/d/sfile?url=${encodeURIComponent(url)}`);
            let fileData = data.data || data.result || data;
            fileUrl = fileData.url || fileData.download;
            fileName = fileData.file_name || fileData.filename || fileData.title || fileName;
            fileSize = fileData.size || "";
        } catch (e) {}
    }

    // Coba API 3: Faa (Fallback)
    if (!fileUrl) {
        try {
            const { data } = await axios.get(`https://api-faa.my.id/api/downloader/sfile?url=${encodeURIComponent(url)}`);
            let fileData = data.result || data.data;
            fileUrl = fileData.url || fileData.download;
            fileName = fileData.file_name || fileData.filename || fileName;
        } catch (err) {}
    }

    if (!fileUrl) {
        await conn.reply(m.chat, '❌ Gagal mendownload file SFile.mobi.', m);
        return await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }

    let caption = `✅ *Berhasil mengunduh dari SFile.mobi!*\n📁 *File:* ${fileName}`;
    if (fileSize) caption += `\n📊 *Size:* ${fileSize}`;

    await conn.sendMessage(m.chat, { 
        document: { url: fileUrl }, 
        fileName: fileName,
        mimetype: "application/octet-stream",
        caption: caption
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}

// ==========================================
// 9. GITHUB
// ==========================================
async function handleGitHub(conn, m, url) {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
        const match = url.match(regex);
        if (!match) throw new Error("Link GitHub tidak valid");

        const user = match[1];
        const repo = match[2].replace('.git', '');
        const zipUrl = `https://api.github.com/repos/${user}/${repo}/zipball`;
        const fileName = `${repo}-master.zip`;

        await conn.sendMessage(m.chat, { 
            document: { url: zipUrl }, 
            fileName: fileName,
            mimetype: "application/zip",
            caption: `✅ *Berhasil mengunduh Repository GitHub!*\n👤 User: ${user}\n📁 Repo: ${repo}` 
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error(err);
        await conn.reply(m.chat, '❌ Gagal mendownload Repository GitHub.', m);
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}

export default handler;
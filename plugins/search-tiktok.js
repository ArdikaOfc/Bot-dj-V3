import axios from "axios";
import FormData from "form-data";
import baileys from "@adiwajshing/baileys";

const ttSearch = async (query, count = 3) => {
    try {
        let d = new FormData();
        d.append("keywords", query);
        d.append("count", count);
        d.append("cursor", 0);
        d.append("web", 1);
        d.append("hd", 1);

        let h = { headers: { ...d.getHeaders() } };
        let { data } = await axios.post("https://tikwm.com/api/feed/search", d, h);

        if (!data.data || !data.data.videos) return [];
        
        const baseURL = "https://tikwm.com";
        return data.data.videos.map(video => ({
            play: baseURL + video.play
        }));
    } catch (e) {
        console.log(e);
        return [];
    }
}

async function sendVideoAlbum(conn, m, videos, caption) {
    const album = baileys.generateWAMessageFromContent(m.chat, {
        albumMessage: {
            expectedVideoCount: videos.length, // Hanya mendukung video
            contextInfo: m.quoted ? {
                remoteJid: m.quoted.key.remoteJid,
                fromMe: m.quoted.key.fromMe,
                stanzaId: m.quoted.key.id,
                participant: m.quoted.key.participant || m.quoted.key.remoteJid,
                quotedMessage: m.quoted.message
            } : {}
        }
    }, { quoted: m });

    await conn.relayMessage(album.key.remoteJid, album.message, {
        messageId: album.key.id
    });

    for (const [index, video] of videos.entries()) {
        const msg = await baileys.generateWAMessage(album.key.remoteJid, {
            video: { url: video.play },
            ...(index === 0 ? { caption } : {}) // Caption hanya di video pertama
        }, {
            upload: conn.waUploadToServer
        });

        msg.message.messageContextInfo = {
            messageAssociation: {
                associationType: 1,
                parentMessageKey: album.key
            }
        };
        await conn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        });
    }
}

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply("Masukkan Judul Yang Ingin Di Cari *Contoh :* .tiktoksearch <Judul> | <Jumlah>");

    let [query, jumlah] = text.split("|").map(v => v.trim());
    jumlah = parseInt(jumlah) || 3;

    let videos = await ttSearch(query, jumlah);
    if (!videos.length) return m.reply("Gak nemu videonya, coba kata kunci lain.");

    await sendVideoAlbum(conn, m, videos, "Hasil pencarian TikTok 🎵");
}

handler.help = ['tiktoksearch'];
handler.tags = ['search'];
handler.command = ['tiktoksearch', 'ttsearch', 'tt-s'];

export default handler;
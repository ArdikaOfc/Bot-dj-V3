let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!m.quoted && !/image/.test(m.mimetype || "")) {
        return m.reply(`Kirim atau reply foto dengan caption:\n\n*${usedPrefix + command} <prompt>*`);
    }

    if (!text) return m.reply("❌ Masukkan prompt untuk mengedit gambar.");

    let q = m.quoted ? m.quoted : m;
    let mime = q.mimetype || "";
    if (!/image/.test(mime)) return m.reply("❌ Itu bukan gambar!");

    let img = await q.download();

    // ===================================================
    // 1. UPLOAD TO UGUU (fixed blob)
    // ===================================================
    let form = new FormData();
    form.append("files[]", new Blob([img]), "image.jpg");

    let up = await fetch("https://uguu.se/upload", {
        method: "POST",
        body: form,
    }).catch(e => null);

    if (!up || !up.ok) return m.reply("❌ Gagal upload ke Uguu!");

    let json = await up.json().catch(() => null);
    if (!json || !json.files || !json.files[0]?.url) {
        return m.reply("❌ Upload gagal!");
    }

    let uploaded = json.files[0].url;
    console.log("UGUU:", uploaded);

    await m.reply("⏳ Sedang memproses gambar...");

    // ===================================================
    // 2. PROSES EDIT FOTO VIA API FAA
    // ===================================================
    let api = `https://api-faa.my.id/faa/editfoto?url=${encodeURIComponent(uploaded)}&prompt=${encodeURIComponent(text)}`;

    let get = await fetch(api).catch(e => null);
    if (!get || !get.ok) return m.reply("❌ API gagal memproses gambar.");

    let buffer = Buffer.from(await get.arrayBuffer());

    // ===================================================
    // 3. KIRIM KE USER
    // ===================================================
    await conn.sendMessage(m.chat, {
        image: buffer,
        caption: `✨ *Edit Foto Berhasil!*\nPrompt: ${text}`
    }, { quoted: m });
};

handler.help = ['editimg'];
handler.command = ['editimg'];
handler.tags = ['ai'];
handler.limit = true

export default handler;
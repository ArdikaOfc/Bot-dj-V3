/*
Wm: https://whatsapp.com/channel/0029VaF9C4zId7nOTFF8ZK0v
Jgn hapus wm ku
Fitur:  Cek Id Grup Button Salin
Type : Plugins Esm 
Creator: ᴿꜰ᭄༺𝙰𝚛𝚍𝚒𝚔𝚊𝙾𝚏𝚌ོ ×፝֟͜×༻
*/

let handler = async (m, { conn, args }) => {
    let text = args[0];
    if (!text) return m.reply("🍰 *Masukkan link grup atau saluran WhatsApp dulu ya~*");
    let url;
    try {
        url = new URL(text);
    } catch {
        return m.reply("🍰 *Masukkan link grup atau saluran WhatsApp yang valid ya~*");
    }

    let isGroup =
        url.hostname === "chat.whatsapp.com" && url.pathname.match(/^\/[A-Za-z0-9]{20,}$/);
    let isChannel = url.hostname === "whatsapp.com" && url.pathname.startsWith("/channel/");
    let id, name, code;
    try {
        if (isGroup) {
            code = url.pathname.replace(/^\/+/, "");
            let res = await conn.groupGetInviteInfo(code);
            id = res.id;
            name = res.subject;
        } else
            return m.reply("🍩 *Link tidak valid. Masukkan link grup WhatsApp ya~*");
    } catch (err) {
        console.error(err);
        return m.reply("🧁 *Maaf, gagal mengambil data dari link itu...*");
    }
    await conn.sendMessage(
        m.chat,
        {
            text: `🍬 *Informasi Ditemukan!*\n🍡 *Nama: ${name}*\n🍭 *ID: ${id}*`,
            footer: "",
            title: "🍧 CEK ID",
            interactiveButtons: [
                {
                    name: "cta_copy",
                    buttonParamsJson: JSON.stringify({
                        display_text: "📋 Salin ID",
                        copy_code: id,
                    }),
                },
            ],
        },
        { quoted: m }
    );
};

handler.help = ["cekidgc"];
handler.tags = ["tool"];
handler.command = /^((cekid|id)gc|grup|group)$/i;
handler.limit = 10
handler.register = true //jika tidak ada fitur Register atau daftar di false saja

export default handler;
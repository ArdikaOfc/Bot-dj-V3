import {
    exec as execCb
} from "child_process";
import {
    promisify
} from "util";

const exec = promisify(execCb);

const handler = async (m, { conn }) => {
    await m.reply("Testing Speed...");
    let o;
    try {
        o = await exec("python3 speed.py --share");
    } catch (e) {
        o = e;
    } finally {
        let {
            stdout,
            stderr
        } = o;
        const mat = stdout.match(/Share results: (http[^\s]+)/);

        if (stdout?.trim()) await conn.sendMessage(m.chat, { image: { url: mat[1] }, caption: stdout }, { quoted: m });
        if (stderr?.trim()) await conn.sendMessage(m.chat, { image: { url: mat[1] }, caption: stderr }, { quoted: m });
    }
};

handler.help = ["speedtest"];
handler.tags = ["info"];
handler.command = /^(speed|speedtest|ookla)$/i;
handler.premium = false;
handler.register = true;
export default handler;
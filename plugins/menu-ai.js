let handler = async (m) => {
  m.reply(`
╔══〔 AI FEATURE 〕───⬡
║ ⬡ .ai4chat <teks>  Ⓛ
║ ⬡ .aoyoai <teks>
║ ⬡ .askai <model> <pertanyaan>  Ⓛ
║ ⬡ .listmodel  Ⓛ
║ ⬡ .ayesoul <teks>
║ ⬡ .blackbox  Ⓛ
║ ⬡ .bocchiai <teks>
║ ⬡ .copilot <teks>
║ ⬡ .claudeai <text>  Ⓛ
║ ⬡ .aicode <prompt>|<bahasa>|<model>  Ⓛ
║ ⬡ .codegen <lang> <model> <prompt>  Ⓛ
║ ⬡ .colorify [anime/ghibli] [prompt]  Ⓛ
║ ⬡ .deepimg <prompt>  Ⓛ
║ ⬡ .dopple  Ⓛ
║ ⬡ .editimg  Ⓛ
║ ⬡ .elainaai <pesan>
║ ⬡ .feloai <teks>
║ ⬡ .flux <prompt>  Ⓛ
║ ⬡ .ghibli
║ ⬡ .gptonline <teks>  Ⓛ
║ ⬡ .gpt <teks>  Ⓛ
║ ⬡ .hutaoai <teks>  Ⓛ
║ ⬡ .img2promt  Ⓛ
║ ⬡ .kimi <pertanyaan>  Ⓛ
║ ⬡ .kitaai <pesan>
║ ⬡ .nijikaai <pesan>
║ ⬡ .openai <teks>  Ⓛ
║ ⬡ .perplexity
║ ⬡ .prabowo  Ⓛ
║ ⬡ .ryoai <teks>  Ⓛ
║ ⬡ .t2v  Ⓛ
║ ⬡ .texttovideo  Ⓛ
║ ⬡ .text2img <prompt>  Ⓛ
║ ⬡ .waguri <teks>  Ⓛ
║ ⬡ .ai  Ⓛ
║ ⬡ .deepseek
║ ⬡ .qwen
║ ⬡ .claude
║ ⬡ .gpt-4o-mini
║ ⬡ .gpt-5-nano
║ ⬡ .gemini
║ ⬡ .grok
║ ⬡ .meta-ai
║ ⬡ .simi  Ⓛ
║ ⬡ .hitamkan  Ⓛ
║ ⬡ .imgprompt  Ⓛ
║ ⬡ .tobotak  Ⓛ
║ ⬡ .tohijab  Ⓛ
║ ⬡ .removebg  Ⓛ
║ ⬡ .waifutagger  Ⓛ
║ ⬡ .wt  Ⓛ
╚════════════════⬡
`.trim())
}
handler.command = /^menuai$/i
handler.help = ["menuai"]
handler.tags = ["main"]
export default handler
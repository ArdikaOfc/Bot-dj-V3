let handler = async (m) => {
  m.reply(`
╔══〔 *GROUP* 〕───⬡
║ ⬡ .getpp <@tag/reply>  
║ ⬡ .enable <option>  
║ ⬡ .disable <option>  
║ ⬡ .cekexpired  
║ ⬡ .absen  
║ ⬡ .mulaiabsen  
║ ⬡ .cekabsen  
║ ⬡ .hapusabsen  
║ ⬡ .add @user/628xxxx  
║ ⬡ .+ @user/628xxxx  
║ ⬡ .anti <link|image|sticker|toxic> on/off  
║ ⬡ .cap  
║ ⬡ .uncap  
║ ⬡ .listcap  
║ ⬡ .cekasalmember  
║ ⬡ .demote @tag  
║ ⬡ .hidetag  
║ ⬡ .infogc  
║ ⬡ .kick @user  
║ ⬡ .linkgrup  
║ ⬡ .opentime <angka> <unit>  
║ ⬡ .poll  
║ ⬡ .promote @tag  
║ ⬡ .resetchat  
║ ⬡ .setbye  
║ ⬡ .setpp  
║ ⬡ .gc *open / close*  
║ ⬡ .setwelcome  
║ ⬡ .gcsider  
║ ⬡ .tagadmin  
║ ⬡ .tagall  
║ ⬡ .totag  
║ ⬡ .totalchat [@user]  
║ ⬡ .tutupjam <jam:menit>  
║ ⬡ .bukajam <jam:menit>  
║ ⬡ .kick @user  
║ ⬡ .spamtag @user  
║ ⬡ .antitagsw on/off  
╚════════════════⬡
`.trim())
}
handler.command = /^menugroup$/i
handler.help = ["menugroup"]
handler.tags = ["main"]
export default handler
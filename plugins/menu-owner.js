let handler = async (m) => {
  m.reply(`
╔══〔 *OWNER* 〕───⬡
║ ⬡ .enable <option>  
║ ⬡ .disable <option>  
║ ⬡ .delexpired  
║ ⬡ .setexpired <hari>  
║ ⬡ .cap  
║ ⬡ .uncap  
║ ⬡ .listcap  
║ ⬡ .msgch Ⓟ 
║ ⬡ .oadd @user  
║ ⬡ .o+ @user  
║ ⬡ .addlimit  
║ ⬡ .addsaldo
║ ⬡ .addmoney  
║ ⬡ .addowner <@tag|nomor>  
║ ⬡ .addprem <nomor/reply> <waktu>  
║ ⬡ .autotyping [on/off]  
║ ⬡ .balas-img <nomor|pesan>  
║ ⬡ .balas <nomor|pesan>  
║ ⬡ .banchat  
║ ⬡ .ban  
║ ⬡ .blacklist <reply|nomor>  
║ ⬡ .broadcast <teks>  
║ ⬡ .bcgc <teks>  
║ ⬡ .checkerror  
║ ⬡ .clearchat  
║ ⬡ .delsesi  
║ ⬡ .clearsesi  
║ ⬡ .deletesesi  
║ ⬡ .delowner <@tag|nomor>  
║ ⬡ .deleteplugin <namafile>  
║ ⬡ .delprem nomor  
║ ⬡ .deleteuser  
║ ⬡ .getdb  
║ ⬡ .getplugin <text>  
║ ⬡ .joingc <link>  
║ ⬡ .leavegc  
║ ⬡ .out  
║ ⬡ .listblacklist  
║ ⬡ .listgc  
║ ⬡ .listowner  
║ ⬡ .listplugin  
║ ⬡ .pushkontak  
║ ⬡ .restart  
║ ⬡ .sendgc <idgrup> <pesan>  
║ ⬡ .getsession  
║ ⬡ .setbio  
║ ⬡ .setredeem  
║ ⬡ .saveplugin  
║ ⬡ .simulate <event> [@mention]  
║ ⬡ .o-tagall  
║ ⬡ .upswimage  
║ ⬡ .upswvideo  
║ ⬡ .upswtext  
║ ⬡ .upswaudio  
║ ⬡ .upsw  
║ ⬡ .unbanchat  
║ ⬡ .unban  
║ ⬡ .unblacklist <reply|nomor>  
║ ⬡ .resetlimit  
║ ⬡ .self  
║ ⬡ .public  
║ ⬡ .up-pb  
║ ⬡ .undefined  
╚════════════════⬡
`.trim())
}
handler.command = /^menuowner$/i
handler.help = ["menuowner"]
handler.tags = ["main"]
export default handler
let handler = async (m) => {
  m.reply(`
╔══〔 *STORE MENU* 〕───⬡
║ ⬡ .addlist <teks>|<respon>  
║ ⬡ .dellist <teks>
║ ⬡ .listrespon  
║ ⬡ .addproduk <nama>|<harga>  
║ ⬡ .addstock <nama>|<jumlah> 
║ ⬡ .buypanel <paket>|<username>  
║ ⬡ .delproduk <nama>  
║ ⬡ .listproduk  
║ ⬡ .deposit
║ ⬡ .ceksaldo
║ ⬡ .saldo
╚════════════════⬡
`.trim())
}
handler.command = /^menustore$/i
handler.help = ["menustore"]
handler.tags = ["main"]
export default handler
let handler = async (m) => {
  m.reply(`
╔══〔 *RPG MENU* 〕───⬡
║ ⬡ .adventure  
║ ⬡ .bank <action> <jumlah>
║ ⬡ .bunuh  
║ ⬡ .buyladang
║ ⬡ .casino <jumlah>
║ ⬡ .craft <item>  
║ ⬡ .daily  
║ ⬡ .dungeon <level>  
║ ⬡ .gudang
║ ⬡ .guild 
║ ⬡ .guildshop 
║ ⬡ .heal  
║ ⬡ .inventory 
║ ⬡ .joinguild
║ ⬡ .kerja <nomor>
║ ⬡ .kickguild <nomor/reply>
║ ⬡ .leaveguild 
║ ⬡ .listguild 
║ ⬡ .mancing  
║ ⬡ .mining  
║ ⬡ .misiguild
║ ⬡ .panen
║ ⬡ .pet <action>  
║ ⬡ .raid 
║ ⬡ .rampok (reply target)
║ ⬡ .rpgstat 
║ ⬡ .jual
║ ⬡ .beli
║ ⬡ .shop 
║ ⬡ .tanam
║ ⬡ .toprpg 
║ ⬡ .trade   
║ ⬡ .upgrade <item>  
╚════════════════⬡
`.trim())
}
handler.command = /^menurpg$/i
handler.help = ["menurpg"]
handler.tags = ["main"]
export default handler
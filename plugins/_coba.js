let handler = async (m, { conn }) => {


				await conn.sendMessage(m.chat, {

					text: 'Semoga Hoki😹',
              footer: 'Powered by ᴹᴿ᭄༺DjBotzོ - MDོ ×፝֟͜×༻',

					buttons: [{

						buttonId: 'teshoki',

						buttonText: { displayText: '\n' + pickRandom(anu)},

						type: 1

					},{

						buttonId: 'teskeberuntungan',

						buttonText: { displayText: '\n' + pickRandom(anu)},

						type: 1

					}]

				})

			}

handler.customPrefix = /^coba/i;
handler.command = new RegExp();
export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const anu = ['Aku Monyet','Aku Kera','Aku Tolol','Aku Kaya','Aku Dewa','Aku Anjing','Aku Dongo','Aku Raja','Aku Sultan','Aku Baik','Aku Hitam','Aku Suki']

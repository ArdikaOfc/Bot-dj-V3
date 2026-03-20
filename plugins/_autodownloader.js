import axios from 'axios';

class DownrScraper {
  constructor() {
    this.baseURL = 'https://downr.org';
    this.headers = {
      'accept': '*/*',
      'content-type': 'application/json',
      'origin': 'https://downr.org',
      'referer': 'https://downr.org/',
      'user-agent':
        'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36'
    };
  }

  async getSessionCookie() {
    const baseCookie =
      '_ga=GA1.1.536005378.1770437315; _clck=17lj13q%5E2%5Eg3d';

    const res = await axios.get(
      `${this.baseURL}/.netlify/functions/analytics`,
      { headers: { ...this.headers, cookie: baseCookie } }
    );

    const sess = res.headers['set-cookie']?.[0]?.split(';')[0];
    return sess ? `${baseCookie}; ${sess}` : baseCookie;
  }

  async fetch(url) {
    const cookie = await this.getSessionCookie();

    const res = await axios.post(
      `${this.baseURL}/.netlify/functions/nyt`,
      { url },
      {
        headers: {
          ...this.headers,
          cookie
        }
      }
    );

    return res.data;
  }
}

const prefixRegex = /^[°zZ#$+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/;

// Regex untuk detect berbagai platform
const urlRegex = /https?:\/\/(?:www\.|m\.|vm\.|vt\.|v\.|open\.)?(?:tiktok\.com|instagram\.com|facebook\.com|fb\.watch|twitter\.com|x\.com|youtube\.com|youtu\.be|threads\.net|threads\.com|pin\.it|pinterest\.com|snapchat\.com|spotify\.com|soundcloud\.com)(?:[\/?#][^\s]*)?/gi;

const plugin = {
  name: 'auto-downloader',
  async before(m, { conn }) {
    const text = m.text || '';
    
    if (!text) return;
    
    if (m.key.fromMe) return;
    
    const prefix = prefixRegex.test(text) ? text.match(prefixRegex)[0] : null;
    if (prefix) return;
    
    const urls = text.match(urlRegex);
    if (!urls || urls.length === 0) return;
    
    const url = urls[0];
    
    try {
      await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

    const downr = new DownrScraper()
    const data = await downr.fetch(text)

    if (!data?.medias?.length)
      throw '🚨 Media tidak ditemukan'

    const url = text
    const medias = data.medias

    const images = medias.filter(m => m.type === 'image')
    const videos = medias.filter(m => m.type === 'video')
    const audios = medias.filter(m => m.type === 'audio')

    if (/tiktok\.com/i.test(url)) {
      const video =
        videos.find(v => v.quality === 'no_watermark') ||
        videos.find(v => v.quality === 'hd_no_watermark') ||
        videos[0]

      if (video) {
        await conn.sendMessage(
          m.chat,
          {
            video: { url: video.url },
            mimetype: 'video/mp4'
          },
          { quoted: m }
        )
      }

      if (!videos.length && images.length) {
        for (let i = 0; i < images.length; i++) {
          await conn.sendMessage(
            m.chat,
            {
              image: { url: images[i].url }
            },
            { quoted: m }
          )
        }
      }

      if (audios[0]) {
        await conn.sendMessage(
          m.chat,
          {
            audio: { url: audios[0].url },
            mimetype: 'audio/mpeg'
          },
          { quoted: m }
        )
      }

      return
    }

    if (images.length) {
      for (let i = 0; i < images.length; i++) {
        await conn.sendMessage(
          m.chat,
          {
            image: { url: images[i].url }
          },
          { quoted: m }
        )
      }
      return
    }

    if (videos.length) {
      await conn.sendMessage(
        m.chat,
        {
          video: { url: videos[0].url },
          mimetype: 'video/mp4'
        },
        { quoted: m }
      )
      return
    }

    if (audios.length) {
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: audios[0].url },
          mimetype: 'audio/mpeg'
        },
        { quoted: m }
      )
      return
    }
    throw '🚨 Media tidak didukung'
    
    } catch (e) {
      console.error('Error:', e);
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
  },
};
export default plugin;
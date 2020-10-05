const { default: got } = require('got/dist/source');
const fetch = require('node-fetch')
const { getBase64 } = require("./fetcher")

const liriklagu = async (lagu) => {
    const response = await fetch(`http://scrap.terhambar.com/lirik?word=${lagu}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `Lirik Lagu ${lagu}\n\n${json.result.lirik}`
    return `[ Error ] Lirik Lagu ${lagu} tidak di temukan!`
}

const jadwalTv = async (query) => {
    var url = 'https://api.haipbis.xyz/jadwaltv/'
    switch(type) {
        case 'antv':
            const antv = await fetch(url + 'antv')
            if (!antv.ok) throw new Error(`unexpected response ${antv.statusText}`)
            const resultantv = await antv.json()
            return resultantv.url
            break
        case 'gtv':
            const gtv = await fetch(url + 'gtv')
            if (!gtv.ok) throw new Error(`unexpected response ${gtv.statusText}`)
            const resultgtv = await gtv.json()
            return resultgtv.url
            break
        case 'indosiar':
            let indosiar = await fetch(url + 'indosiar')
            if (!indosiar.ok) throw new Error(`unexpected response ${indosiar.statusText}`)
            const resultindosiar = await indosiar.json()
            return resultindosiar.url
            break
        case 'inewstv':
            let inewstv = await fetch(url + 'inewstv')
            if (!inewstv.ok) throw new Error(`unexpected response ${inewstv.statusText}`)
            const resultinewstv = await inewstv.json()
            return resultinewstv.url
            break
        case 'kompastv':
            let kompastv = await fetch(url + 'kompastv')
            if (!inewstv.ok) throw new Error(`unexpected response ${kompastv.statusText}`)
            const resultkompastv = await kompastv.json()
            return resultkompastv.url
            break
        case 'mnctv':
            let kompastv = await fetch(url + 'mnctv')
            if (!mnctv.ok) throw new Error(`unexpected response ${mnctv.statusText}`)
            const resultmnctv = await mnctv.json()
            return resultmnctv.url
            break
        case 'metrotv':
            let metrotv = await fetch(url + 'metrotv')
            if (!metrotv.ok) throw new Error(`unexpected response ${metrotv.statusText}`)
            const resultmetrotv = await metrotv.json()
            return resultmetrotv.url
            break
        case 'nettv':
            let nettv = await fetch(url + 'nettv')
            if (!nettv.ok) throw new Error(`unexpected response ${nettv.statusText}`)
            const resultnettv = await nettv.json()
            return resultnettv.url
            break
        case 'rcti':
            let rcti = await fetch(url + 'rcti')
            if (!rcti.ok) throw new Error(`unexpected response ${rcti.statusText}`)
            const resultrcti = await rcti.json()
            return resultrcti.url
            break
        case 'sctv':
            let sctv = await fetch(url + 'sctv')
            if (!sctv.ok) throw new Error(`unexpected response ${sctv.statusText}`)
            const resultsctv = await sctv.json()
            return resultsctv.url
            break
        case 'rtv':
            let rtv = await fetch(url + 'rtv')
            if (!rtv.ok) throw new Error(`unexpected response ${rtv.statusText}`)
            const resultrtv = await rtv.json()
            return resultrtv.url
            break
        case 'trans7':
            let trans7 = await fetch(url + 'trans7')
            if (!trans7.ok) throw new Error(`unexpected response ${trans7.statusText}`)
            const resulttrans7 = await trans7.json()
            return resulttrans7.url
            break
         case 'transtv':
            let transtv = await fetch(url + 'transtv')
            if (!transtv.ok) throw new Error(`unexpected response ${transtv.statusText}`)
            const resulttranstv = await transtv.json()
            return resulttranstv.url
            break
    }
}


const quotemaker = async (quotes, author = 'Your Quote', type = 'random') => {
    var q = quotes.replace(/ /g, '%20').replace('\n','%5Cn')
    const response = await fetch(`https://terhambar.com/aw/qts/?kata=${q}&author=${author}&tipe=${type}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    const json = await response.json()
    if (json.status) {
        if (json.result !== '') {
            const base64 = await getBase64(json.result)
            return base64
        }
    }
}

const fb = async (url) => {
    const response = await fetch(`http://scrap.terhambar.com/fb?link=${url}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    const json = await response.json()
    console.log(json)
    if (json.status === true) return {
        'capt': json.result.title, 'exts': '.mp4', 'url': json.result.linkVideo.sdQuality
    }
    return {
        'capt': '[ ERROR ] Not found!', 'exts': '.jpg', 'url': 'https://c4.wallpaperflare.com/wallpaper/976/117/318/anime-girls-404-not-found-glowing-eyes-girls-frontline-wallpaper-preview.jpg'
    }
}
const randomNimek = async (type) => {
    var url = 'https://api.computerfreaker.cf/v1/'
    switch(type) {
        case 'nsfw':
            const nsfw = await fetch(url + 'nsfwneko')
            if (!nsfw.ok) throw new Error(`unexpected response ${nsfw.statusText}`)
            const resultNsfw = await nsfw.json()
            return resultNsfw.url
            break
        case 'hentai':
            const hentai = await fetch(url + 'hentai')
            if (!hentai.ok) throw new Error(`unexpected response ${hentai.statusText}`)
            const resultHentai = await hentai.json()
            return resultHentai.url
            break
        case 'anime':
            let anime = await fetch(url + 'anime')
            if (!anime.ok) throw new Error(`unexpected response ${anime.statusText}`)
            const resultNime = await anime.json()
            return resultNime.url
            break
        case 'neko':
            let neko = await fetch(url + 'neko')
            if (!neko.ok) throw new Error(`unexpected response ${neko.statusText}`)
            const resultNeko = await neko.json()
            return resultNeko.url
            break
        case 'trap':
            let trap = await fetch(url + 'trap')
            if (!trap.ok) throw new Error(`unexpected response ${trap.statusText}`)
            const resultTrap = await trap.json()
            return resultTrap.url
            break
    }
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


exports.liriklagu = liriklagu;
exports.quotemaker = quotemaker;
exports.randomNimek = randomNimek
exports.fb = fb
exports.sleep = sleep
exports.jadwalTv = jadwalTv

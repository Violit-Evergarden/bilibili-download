const router = require('@koa/router')()
const https = require("https")

router.get('/', async ctx => {
  const {
    url: proxyUrl,
    headers = {
      'cookie':[
        {
            "domain": ".bilibili.com",
            "expirationDate": 1702455279,
            "hostOnly": false,
            "httpOnly": false,
            "name": "buvid_fp_plain",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "undefined"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1702293678,
            "hostOnly": false,
            "httpOnly": false,
            "name": "fingerprint",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "1c60944779e5baa65c5bcfa5c699affc"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1702479500,
            "hostOnly": false,
            "httpOnly": false,
            "name": "CURRENT_QUALITY",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "64"
        },
        {
            "domain": ".bilibili.com",
            "hostOnly": false,
            "httpOnly": false,
            "name": "b_lsid",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": true,
            "storeId": null,
            "value": "69C79CB1_1853919C8B0"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 2177452801.262621,
            "hostOnly": false,
            "httpOnly": false,
            "name": "LIVE_BUVID",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "AUTO2916513100873103"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1705479276.120972,
            "hostOnly": false,
            "httpOnly": false,
            "name": "buvid4",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "0E694608-E41A-56BD-6BDC-CC7350D66B0293404-022043012-fs30e%2FwXVzHhpZE13ykKKSqDvm9TCr3WSd%2FlcSBouTRv8koutsKDtQ%3D%3D"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1703238072,
            "hostOnly": false,
            "httpOnly": false,
            "name": "CURRENT_FNVAL",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "4048"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1745900295,
            "hostOnly": false,
            "httpOnly": false,
            "name": "buvid3",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "A77ED825-27BE-8BAD-8339-39A7A679C6C093404infoc"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1682603753,
            "hostOnly": false,
            "httpOnly": false,
            "name": "fingerprint3",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "e588e53d970b644459ca1a6e0cae837e"
        },
        {
            "domain": ".bilibili.com",
            "hostOnly": false,
            "httpOnly": false,
            "name": "sid",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": true,
            "storeId": null,
            "value": "p3x5xh15"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1682828582.913256,
            "hostOnly": false,
            "httpOnly": false,
            "name": "nostalgia_conf",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "-1"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1682519749.154765,
            "hostOnly": false,
            "httpOnly": true,
            "name": "SESSDATA",
            "path": "/",
            "sameSite": null,
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "5192ee45%2C1682519750%2C7ac25%2Aa1"
        },
        {
            "domain": ".bilibili.com",
            "hostOnly": false,
            "httpOnly": false,
            "name": "bsource",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": true,
            "storeId": null,
            "value": "search_bing"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1745900295,
            "hostOnly": false,
            "httpOnly": false,
            "name": "b_nut",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "1651292295"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1682828583,
            "hostOnly": false,
            "httpOnly": false,
            "name": "_uuid",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "10C763E9C-CAAB-63C2-3F7E-7EF29C6110FCC83186infoc"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1682834478.284196,
            "hostOnly": false,
            "httpOnly": false,
            "name": "b_ut",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "5"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1682519749.154807,
            "hostOnly": false,
            "httpOnly": false,
            "name": "bili_jct",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "88d5eab21b667c6c35110a76a4b60f8d"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1690959683,
            "hostOnly": false,
            "httpOnly": false,
            "name": "blackside_state",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "0"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1674296584,
            "hostOnly": false,
            "httpOnly": false,
            "name": "bp_video_offset_526160890",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "742448748722913400"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1705479279.474531,
            "hostOnly": false,
            "httpOnly": false,
            "name": "buvid_fp",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "8a132e076a78bb9bfa2ad4577a57d2c1"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1702280319,
            "hostOnly": false,
            "httpOnly": false,
            "name": "CURRENT_BLACKGAP",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "0"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1682519749.154822,
            "hostOnly": false,
            "httpOnly": false,
            "name": "DedeUserID",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "526160890"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1682519749.154834,
            "hostOnly": false,
            "httpOnly": false,
            "name": "DedeUserID__ckMd5",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "4f06f2dd0f32c3c1"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1682846084,
            "hostOnly": false,
            "httpOnly": false,
            "name": "hit-dyn-v2",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "1"
        },
        {
            "domain": ".www.bilibili.com",
            "expirationDate": 1693742474,
            "hostOnly": false,
            "httpOnly": false,
            "name": "Hm_lvt_8a6e55dbd2870f0f5bc9194cddf32a02",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "1661256657,1662206468"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1703236267.91816,
            "hostOnly": false,
            "httpOnly": false,
            "name": "i-wanna-go-back",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "-1"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1697534468,
            "hostOnly": false,
            "httpOnly": false,
            "name": "i-wanna-go-feeds",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "-1"
        },
        {
            "domain": ".bilibili.com",
            "hostOnly": false,
            "httpOnly": false,
            "name": "innersign",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": true,
            "storeId": null,
            "value": "1"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1686966446,
            "hostOnly": false,
            "httpOnly": false,
            "name": "is-2022-channel",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "1"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1705668988.006164,
            "hostOnly": false,
            "httpOnly": false,
            "name": "PVID",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "3"
        },
        {
            "domain": ".bilibili.com",
            "expirationDate": 1703666845.924294,
            "hostOnly": false,
            "httpOnly": false,
            "name": "rpdid",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "|(u)mmYku~kk0J'uYYmu|Y)RY"
        },
        {
            "domain": "www.bilibili.com",
            "hostOnly": true,
            "httpOnly": false,
            "name": "theme_style",
            "path": "/",
            "sameSite": null,
            "secure": false,
            "session": true,
            "storeId": null,
            "value": "light"
        }
    ]
    }
  } = ctx.query
  
  let url = ''
  if (proxyUrl.indexOf('http') === -1) { // 自动补全https
    url = 'https://' + proxyUrl
  } else if (proxyUrl.indexOf('https') === -1 && proxyUrl.indexOf('http') > -1) { // 转换http为https
    url = proxyUrl.replace('http', 'https')
  } else {
    url = proxyUrl
  }
  
  console.log('proxy', url)
  
  function get() {
    return new Promise(resolve => {
      https.get(url, {
        headers: Object.assign(headers, {
          'Accept': ctx.header['accept'],
          'Accept-Encoding': ctx.header['accept-encoding']
        })
      }, response => {
        // response.setEncoding('utf-8')
        // response.setEncoding('hex')
        // response.setEncoding('binary')
        ctx.set(response.headers)
        let chunks = Buffer.alloc(0)
        response.on('data', data => {
          chunks = Buffer.concat([chunks, Buffer.from(data)])
        })
        response.on('end', () => resolve(chunks))
      })
    })
  }
  
  ctx.body = await get()
})

module.exports = router

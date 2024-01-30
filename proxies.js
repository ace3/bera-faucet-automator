const axios = require('axios')
var ProxyVerifier = require('proxy-verifier')
const getProxy = async () => {
  var proxies = [
    'http://160.248.80.91:2525',
    'http://8.219.97.248:80',
    'http://43.156.0.125:8888',
    'http://188.166.186.145:8000',
    'http://139.162.32.249:3128',
  ]
  try {
    const result = await axios.get(
      'https://api.proxyscrape.com/v3/free-proxy-list/get?request=displayproxies&protocol=http&country=JP,SG&timeout=3650&proxy_format=protocolipport&format=json',
      { timeout: 3000 }
    )

    const output = result.data.proxies

    proxies = []
    for (const proxy of output) {
      proxies.push(proxy.protocol + '://' + proxy.ip + ':' + proxy.port)
    }
  } catch (e) {}

  return proxies
}

module.exports = { getProxy }

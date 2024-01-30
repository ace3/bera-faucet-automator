const axios = require('axios')
var ProxyVerifier = require('proxy-verifier')
const getProxy = async () => {
  var proxies = [
    'socks5://148.72.211.168:64330',
    'socks5://51.79.229.230:28242',
    'socks5://208.109.14.49:50541',
    'socks5://8.219.167.110:21025',
    'socks5://148.72.211.168:41282',
    'socks5://128.199.221.91:26789',
    'socks5://148.72.206.84:58139',
    'socks5://148.72.206.84:60926',
    'socks5://128.199.221.91:16801',
    'socks5://134.209.106.70:59265',
  ]
  try {
    const result = await axios.get(
      'https://api.proxyscrape.com/v3/free-proxy-list/get?request=displayproxies&protocol=socks5&country=JP,SG&timeout=3650&proxy_format=protocolipport&format=json',
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

const { getProxy } = require('./proxies')

;(async () => {
  const proxies = await getProxy()
  console.log(proxies)

  // Run The Command Here
})()

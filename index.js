const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config()
const puppeteer = require('puppeteer')

;(async () => {
  const address = process.env.ADDRESS

  const url = `https://api.routescan.io/v2/network/testnet/evm/80085/etherscan/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc`

  const result = await axios.get(url)

  // handle if failed to get result from axios
  if (!result.data.result) {
    console.log('Failed to fetch data from routescan')
    return
  }

  const data = result.data.result

  let lastTimestamp = 0

  if (data.length > 0) {
    lastTimestamp = data[0].timeStamp
  }

  console.log(`Last Timestamp: ${lastTimestamp}`)
  console.log(`Current Timestamp : ${new Date().getTime()}`)
  // check if less than lastTimestamp is 8 hours 10 minutes ago then stop the process
  if (new Date().getTime() - lastTimestamp < 8 * 60 * 60 * 1000) {
    console.log('lastTimestamp is less than 8 hours 10 minutes')
    return
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'chromium',
    env: {
      DISPLAY: ':99',
    },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--no-zygote',
      '--single-process',
    ],
  })
  const page = await browser.newPage()

  console.log(`Address Recipient: ${address}`)

  await page.setViewport({ width: 1366, height: 768 })
  // Open the URL
  await page.goto('https://artio.faucet.berachain.com/', {
    waitUntil: 'networkidle0',
  })

  // Tick the checkbox
  await page.click('#terms')

  // Wait for 2 seconds
  await new Promise((r) => setTimeout(r, 5000))

  // Submit the button
  await page.click(
    '#radix-\\:r0\\: > div.max-h-\\[100vh-200px\\)\\].flex.flex-grow-0.flex-col.gap-4.overflow-y-scroll.sm\\:h-full.sm\\:max-h-\\[600px\\] > div.flex.gap-4 > button.inline-flex.h-fit.items-center.justify-center.transition-duration-300.transition.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:opacity-30.disabled\\:pointer-events-none.ring-offset-background.bg-primary.text-primary-foreground.hover\\:opacity-90.px-4.py-2.rounded-md.text-lg.font-semibold.leading-7.flex-1'
  )
  console.log('Ticking the agreement button')

  await // Wait for 1 second
  new Promise((r) => setTimeout(r, 5000))
  // Fill the input
  await page.type(
    'body > div:nth-child(12) > div.relative.flex.min-h-screen.w-full.flex-col.overflow-hidden.bg-background > main > div > div.flex.w-full.flex-col-reverse.items-center.justify-between.py-12.xl\\:flex-row > div > div.flex.flex-col.gap-1 > div.relative > div > input',
    address
  )

  console.log('Fill the address')

  // Wait for 1 second
  await new Promise((r) => setTimeout(r, 5000))

  // Click to prove not a robot
  await page.click(
    'body > div:nth-child(12) > div.relative.flex.min-h-screen.w-full.flex-col.overflow-hidden.bg-background > main > div > div.flex.w-full.flex-col-reverse.items-center.justify-between.py-12.xl\\:flex-row > div > button'
  )
  console.log('I Am not a robot')
  // Wait for 3 seconds
  await new Promise((r) => setTimeout(r, 5000))

  // Click to drip the token
  await page.click(
    'body > div:nth-child(12) > div.relative.flex.min-h-screen.w-full.flex-col.overflow-hidden.bg-background > main > div > div.flex.w-full.flex-col-reverse.items-center.justify-between.py-12.xl\\:flex-row > div > button'
  )
  console.log('Drip the token')

  await new Promise((r) => setTimeout(r, 5000))
  await page.screenshot({ path: 'fullpage.png', fullPage: true })
  // Close the browser
  await browser.close()
})()

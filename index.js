const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/chromium',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--no-zygote',
      '--single-process',
    ],
  })
  const page = await browser.newPage()
  const address =
    process.env.ADDRESS || '0xF3318001A64C457AC358b0eE829791F0600673DD'

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

  await // Wait for 1 second
  new Promise((r) => setTimeout(r, 5000))
  // Fill the input
  await page.type(
    'body > div:nth-child(12) > div.relative.flex.min-h-screen.w-full.flex-col.overflow-hidden.bg-background > main > div > div.flex.w-full.flex-col-reverse.items-center.justify-between.py-12.xl\\:flex-row > div > div.flex.flex-col.gap-1 > div.relative > div > input',
    address
  )

  // Wait for 1 second
  await new Promise((r) => setTimeout(r, 5000))

  // Click to prove not a robot
  await page.click(
    'body > div:nth-child(12) > div.relative.flex.min-h-screen.w-full.flex-col.overflow-hidden.bg-background > main > div > div.flex.w-full.flex-col-reverse.items-center.justify-between.py-12.xl\\:flex-row > div > button'
  )

  // Wait for 3 seconds
  await new Promise((r) => setTimeout(r, 5000))

  // Click to drip the token
  await page.click(
    'body > div:nth-child(12) > div.relative.flex.min-h-screen.w-full.flex-col.overflow-hidden.bg-background > main > div > div.flex.w-full.flex-col-reverse.items-center.justify-between.py-12.xl\\:flex-row > div > button'
  )
  await new Promise((r) => setTimeout(r, 5000))
  // Close the browser
  await browser.close()
})()

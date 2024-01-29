FROM --platform=linux/arm64 node:18

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD false

# Set working directory in the container
WORKDIR /app

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.

RUN apt-get update
RUN apt-get install gnupg -y
RUN apt-get install wget -y
RUN wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update
RUN apt  install google-chrome-beta -y
RUN rm -rf /var/lib/apt/lists/*


# Copy package.json and package-lock.json (if available)
COPY package*.json ./

COPY yarn.lock ./

# Install dependencies (including Puppeteer)
RUN yarn

RUN yarn add puppeteer

# Copy the Puppeteer script and .env file into the container
COPY . ./

# Command to run the script
CMD ["node", "index.js"]

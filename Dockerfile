FROM --platform=linux/arm64 node:18

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Set working directory in the container
WORKDIR /app

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.

RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=arm64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install chromium -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*


RUN sh -c 'echo "deb http://security.debian.org/debian-security bookworm-security main" >> /etc/apt/sources.list.d/google.list' && apt-get update
RUN apt-get install xorg -y

RUN wget -q -O /tmp/xvfb_1.20.13-1ubuntu1~20.04.14_arm64.deb http://ports.ubuntu.com/pool/universe/x/xorg-server/xvfb_1.20.13-1ubuntu1~20.04.14_arm64.deb \
  && dpkg -i /tmp/xvfb_1.20.13-1ubuntu1~20.04.14_arm64.deb \
  && rm /tmp/xvfb_1.20.13-1ubuntu1~20.04.14_arm64.deb

RUN apt-get update && apt-get install -y xvfb 

RUN apt-get -y install xorg xvfb gtk2-engines-pixbuf
RUN apt-get -y install dbus-x11 xfonts-base xfonts-100dpi xfonts-75dpi xfonts-scalable

RUN Xvfb -ac :99 -screen 0 1280x1024x16 & export DISPLAY=:99
# Copy package.json and package-lock.json (if available)
COPY package*.json ./

COPY yarn.lock ./

# Install dependencies (including Puppeteer)
RUN yarn

RUN yarn add puppeteer dotenv

# Copy the Puppeteer script and .env file into the container
COPY . ./
# Command to run the script
CMD ["node", "index.js"]

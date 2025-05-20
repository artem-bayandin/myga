# myga

Make Youtube Great Again - fix its layout.

With some updates in April-May 2025 YouTube video cards are way too big: on my mac I see like 3 videos in a row, which takes around 40% of my 4k screen. With that, I'm comfortable having like 6 videos in a row, or 7-9 shorts, when browsing full screen.

So this Chrome browser extension updates styles of video cards to the values you input. My default settings are:

- Num of videos in a row: `5`
- Num of shorts in a row: `7`
- Inline shorts: `un checked`

Have fun!

## How to install and run manually

To run the commands below you need `node` ([download and install node](https://nodejs.org/en/download)) installed on your machine, and [`yarn`](https://yarnpkg.com/getting-started/install) (install yarn: `npm install -g corepack`) or `npm` (installed with node) as you prefer. Instructions below are made for `yarn` as I use it.

- download the source code with `git clone`
- navigate to the folder and do `yarn` (or `npm install`)
- then do `yarn build`, and a folder `dist` will appear
- open your Chrome browser and navigate to `chrome://extensions` page
- click button `load unpacked` and open `dist` folder
- have fun

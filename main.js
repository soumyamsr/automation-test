const puppeteer = require("puppeteer");
const fs = require("fs");

const debugging_mode = {
  headless: false,
  slowMo: 250,
  devtools: true
};

if (process.argv.length < 4) {
  console.log("Usage: node ex1 [url] [filename]");
  process.exit(-1);
}

let url = process.argv[2];
let filename = process.argv[3];
console.log("accessing url - " + url);

(async () => {
  try {
    const browser = await puppeteer.launch(debugging_mode);
    const page = await browser.newPage();
    await page.goto(url);
    browser.close();
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
})();

const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");

if (process.argv.length < 4) {
  console.log("Usage: node ex1 [url] [filename]");
  process.exit(-1);
}

let url = process.argv[2];
let filename = process.argv[3];
console.log("accessing url - " + url);

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.emulate(devices["iPhone 5"]);
    // await page.setViewport({
    //   width: 375,
    //   height: 667
    // });
    await page.screenshot({ path: "./screenshots/" + filename + ".png" });
    await page.pdf({
      path: "./screenshots/" + filename + ".pdf",
      format: "A4"
    });
    browser.close();
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
})();

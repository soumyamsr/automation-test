const puppeteer = require("puppeteer");

const debugging_mode = {
  headless: false,
  timeout: 200,
  devtools: false
};

if (process.argv.length < 3) {
  console.log("Usage: node exit [url]");
  process.exit(-1);
}

let url = process.argv[2];
console.log("evaluating url - " + url);

(async () => {
  try {
    const browser = await puppeteer.launch(debugging_mode);
    const page = await browser.newPage();
    await Promise.all([
      page.coverage.startCSSCoverage(),
      page.coverage.startJSCoverage()
    ]);
    await page.goto(url);
    const [cssCoverage, jsCoverage] = await Promise.all([
      page.coverage.stopCSSCoverage(),
      page.coverage.stopJSCoverage()
    ]);
    let totalBytes = 0,
      usedBytes = 0;
    const coverage = [...cssCoverage, ...jsCoverage];
    for (const entry of coverage) {
      totalBytes += entry.text.length;
      for (const range of entry.ranges) {
        usedBytes += range.end - range.start - 1;
      }
    }
    console.log(`Bytes used: ${(usedBytes / totalBytes) * 100}%`);

    browser.close();
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
})();

import puppeteer from "puppeteer"


// -- 
export const getBusinessList = async (browser:puppeteer.Browser,url:string) => {
  const page = await browser.newPage();
  await page.goto(url);
  const jsonScriptTagData = await page.$$eval('.search-page__company-results > section > script', (scriptNodeList) =>
    scriptNodeList.map((scriptNode) => JSON.parse(scriptNode.textContent))
  );

  await page.close();
  return jsonScriptTagData
}


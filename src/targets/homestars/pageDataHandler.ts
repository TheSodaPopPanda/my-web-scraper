import puppeteer from "puppeteer"
import { getBusinessList } from "./getBusinessList"

//  ----
export const pageDataHandler = async(browser:puppeteer.Browser,url:string) => {

  let pageNumber = 0
  const runner = async () => {
    const collectedData = await getBusinessList(browser,url+'?page='+pageNumber)
    if(collectedData.length > 0){

      // trigger next
      pageNumber++
      runner()
    }
  }
  runner()

}

// x = document.getElementsByTagName('body')[0].querySelectorAll('.')
// x.forEach(() => {})
// x.forEach((ele) => {y.push(ele.href)})
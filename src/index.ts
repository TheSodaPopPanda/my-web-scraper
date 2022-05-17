//  -------------------
//   Controller File
//  -------------------

'use strict';
import { scrapFromBusinessSite } from "lib/scrapFromBusinessSite";
// import puppeteer from "puppeteer"
// import chalk from 'chalk'
// import promise from "promise"
// import fs from "fs-extra"
import puppeteer from "puppeteer"
import { getBusinessList } from "targets/homestars/getBusinessList";
import { scanPage } from "targets/homestars/scanPage";
import { north_york_list } from './targets/homestars/pages-array.json'

const main = async () => {
    const browser = await puppeteer.launch({
        defaultViewport :{
            width: 1920,
            height: 1080
        }
    });

    let categoryInt = 0
    const mainCategoryHandler =  async() => {
        if(categoryInt < north_york_list.length){
            console.log('category: '+categoryInt+' :')
            await pageHandler()
            categoryInt++
        }else{
            console.log("+-----------------+")
            console.log("   --   END   --   ")
            console.log("+-----------------+")
        }
    }

    let pageInt = 0
    const pageHandler = async () => {
        const businessList = await getBusinessList(browser,north_york_list[categoryInt]+'?page='+pageInt)
        businessList.forEach(async (profilePageUrl,i) => {
            const businessData:any = await scanPage(browser,profilePageUrl)
            // 
            const businessDataFinal = scrapFromBusinessSite(businessData.website,businessData) || businessData
            // @ts-ignore
            const isSaved = await saveBusinessData(businessDataFinal)
        })
        if(businessList.length > 0){
            pageInt++
            await pageHandler()
        }else{
            mainCategoryHandler()
        }
        return
    }
    mainCategoryHandler()
}
main()


export {
    main
}
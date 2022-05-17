import puppeteer from "puppeteer"


// ----
export const scanPage = async (
  browser:puppeteer.Browser,
  data:{
    name:string
    url:string
  }
) => {

  
  let tries = 0 
  const retryContainer = async () => {
    try{

      let { name, url } = data
      const page = await browser.newPage();
                   await page.goto(url,{timeout: 60000});

      let businessData:any = {
        name: name,
        source: 'homestars',
        location:  {},
        socials:{}
      }

      businessData.phone = await page.evaluate(() => {
        const node = document.querySelector('.company-header-contact__button > span') 
        return node ? [node.textContent] : []
      })
      businessData.website = await page.evaluate(() => {
        const node = document.querySelector('a.company-header-contact__button[title="Link to contractor website"]') 
        return node ? node.getAttribute('href') : ''
      })
      businessData.industry = 'Construction'
      // businessData.categories = await page.evaluate(() => {
      //   const node = document.querySelector('.company-header-details__category')
      //   return node ? node.textContent.split('-') : []
      // })
      businessData.location = await page.evaluate(() => {
        const node = document.querySelector('.company-header-details__address')
        const text = node ? node.textContent : ''
        let obj:any = {
          address: '',
          postal_code: '',
          province: '',
          raw: '',
        }
        obj.raw = text
        const match = text.match(/[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z](-| |)\d[ABCEGHJ-NPRSTV-Z]\d/g)
        obj.postal_code = match ? match[0] : ''
        obj.province = text.match(/(N[BLSTU]|[AMN]B|[BQ]C|ON|PE|SK)/g) ? text.match(/(N[BLSTU]|[AMN]B|[BQ]C|ON|PE|SK)/g)[0] : ''
        // ensure string is not only whitespace
        obj.address =  text.replace(/\s/g, '').length === 0 ? '' : text.replace(obj.province,'').replace(obj.postal_code,'')
        return obj
      })
      businessData.socials.instagram = await page.evaluate(() => {
        const node = document.querySelector('a[data-testid="instagram"]') 
        return node ? node.getAttribute('href') : ''
      })
      businessData.socials.linkedin = await page.evaluate(() => {
        const node = document.querySelector('a[data-testid="linkedin"]') 
        return node ? node.getAttribute('href') : ''
      })
      businessData.socials.twitter = await page.evaluate(() => {
        const node = document.querySelector('a[data-testid="twitter"]') 
        return node ? node.getAttribute('href') : ''
      })
      businessData.socials.facebook = await page.evaluate(() => {
        const node = document.querySelector('a[data-testid="facebook"]') 
        return node ? node.getAttribute('href') : ''
      })  
      await  page.close();
      return businessData
    }catch{
      if(tries < 3){
        tries++
        retryContainer()
      }else{
        return false
      }
    }
  }
}

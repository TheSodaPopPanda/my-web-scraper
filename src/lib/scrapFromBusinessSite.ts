import fetch from 'node-fetch'
import { industryData } from '../data/industryTypeData.json'


interface IndustryDataObj {
  [key: string]: string[] | undefined
}

// -- 
export const scrapFromBusinessSite = async (url:string,existingData:any) => {

  const industryDataObj:IndustryDataObj = industryData

  const response = await fetch(url)
  .catch((err:any) => {})

  if(!response){
    return existingData
  }
  const body = await response.text()

  // emails
  let emails = existingData.emails || []
  let foundEmails = body.match(/[a-z0-9-.]+@[a-z0-9-.]+\.\w+/) || []
  foundEmails.forEach((email) => {
    if (!emails.includes(email)){
      emails.push(email)
    }
  })

  // phone numbers
  let phones = existingData.emails || []
  let foundPhones = body.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/) || []
  foundPhones.forEach((phone) => {
    if (!phones.includes(phone)){
      phones.push(phone)
    }
  })

  let industryValue:any = {}
  Object.keys(industryDataObj).forEach((industryName:string) => {
    industryDataObj[industryName]
    const words = body.match(new RegExp(`/()/`))
    industryValue[industryName] = words.length 
  })

  let category = ''
  let currentValue = 0
  Object.keys(industryValue).forEach((industryName:string) => {
    const value = industryValue[industryName]
    if(value > 5 && value > currentValue){
      category = industryName
    }
  })

  return {
    ...existingData,
    emails,
    phones,
    category,
  }

}


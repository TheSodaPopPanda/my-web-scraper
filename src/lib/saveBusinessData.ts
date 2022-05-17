import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//  ----
export const saveBusinessData = (business:any) => {

  return new Promise(async (resolve) => {
    const existingBusiness = await prisma.businesses.findFirst({
      where: {
        OR: [
          {
            name: business.name,
          },
          {
            phone: business.phone,
          },
          {
            email: business.email
          },
          {
            website: business.website
          },
        ],
      },
    })
    .catch((err: any) => {
      // nothing
      console.log('error')
      console.log(err)
    })
    // console.log(business)
    if(!existingBusiness){
      await prisma.businesses.create({
        data: {
          name: business.name,
          website: business.website || '',
          phone: business.phone || '',
          email: business.email || '',
          source: business.source || '',
          // @ts-ignore huh error here I think it's a bug with prisma
          industry: business.industry || '',
          categories: { set: business.categories || [] },  
          location: {
            create: {
              ...business.location
            }
          },
          socials:{
            create: {
              ...business.socials
            }
          }
        }
      })
      .then((newBusiness: any) => {
        // nothing
        resolve(newBusiness)
      })
      .catch((err: any) => {
        console.log('error')
        console.log(err)
        resolve(false)
      })
    }else{
      resolve(false)
    }
  })
}


// -- 
export const getEmailFromWebsite = async (content:string) => {

  let emails:string[] = []

  let foundEmails = content.match(/[a-z0-9-.]+@[a-z0-9-.]+\.\w+/) || []
  foundEmails.forEach((email) => {
    if (!emails.includes(email)){
      emails.push(email)
    }
  })

  if(emails.length === 1){
    return emails[0]
  }else if(emails.length > 1){
    return emails
  }else{
    return false
  }

}


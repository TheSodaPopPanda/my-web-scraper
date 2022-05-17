export interface businessDataInterface {
  id:          String
  name:        String
  source:      String
  website:     String
  phone:       String[]
  emails:       String[]
  industry:    String
  categories:  String
  locationId:  String
  location:{
    id:           String
    raw:          String
    address:      String
    postal_code:  String
    province:     String
  },
  socialsId:   String
  socials:{
    id:           String
    facebook:     String
    instagram:    String
    twitter:      String
    linkedin:     String
  },
  createdAt:{

  }
}
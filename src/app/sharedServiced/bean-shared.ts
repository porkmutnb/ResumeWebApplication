export interface ResumeData {
  profile: ProfileMe,
  interest: string[],
  education: EducationMe[],
  experince: ExperinceMe[]
  skill: SkillMe,
  awardAndCertificateList: AwardAndCertificateMe[],
  portfolioList: PortfolioMe[],
  myResumeList: ResumeMe[],
  contact: ContactMe,
  about: AboutMe
}
export interface ProfileMe {
  firstName: string
  lastName: string,
  nickName: string,
  introduce: string,
  profile: string
}
export interface EducationMe {
  id: number,
  name: string,
  major: string,
  startYear: string,
  endYear: string,
  gpa: string,
  visible: boolean
}
export interface ExperinceMe {
  id: number,
  name: string,
  position: string,
  startDate: string,
  endDate: string,
  visible: boolean
}
export interface SkillMe {
  tools: string[],
  workflow: string[]
}
export interface PortfolioMe {
  id: number,
  name: string,
  detail: string,
  imageUrl: string,
  imagePreview?: any,
  info: FolioInfo
}
export interface FolioInfo {
  describtion: string,
  imageUrl: string,
  imagePreview?: any,
  linkto: FolioInfoDetail
}
export interface FolioInfoDetail {
  name: string,
  url: string
}
export interface ResumeMe {
  id: number,
  name: string,
  link: string,
  newFile?: any,
  default: boolean,
  visible: boolean
}
export interface ContactMe {
  email: string,
  phone: string,
  socialMedia?: SocialMedia[]
}
export interface SocialMedia {
  id: number,
  name: string,
  username: string,
  link: string,
  visible: boolean
}
export interface AwardAndCertificateMe {
  id: number,
  name: string,
  description: string,
  file: string,
  filePreview?: any,
  visible: boolean
}
export interface AboutMe {
  celebrityFavoriteList: CelebrityFavorite[],
  description: string,
  hobbies: string[]
}
export interface CelebrityFavorite {
  id: number,
  name: string,
  link: string
}
export class BeanShared {

  constructor() { }
}

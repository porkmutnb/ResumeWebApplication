import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AwardAndCertificateMe, CelebrityFavorite, EducationMe, ExperinceMe, FolioInfo, ResumeMe, PortfolioMe, ResumeData, SkillMe, SocialMedia } from './bean-shared';

@Injectable({
  providedIn: 'root'
})
export class Shared {

  private resumeData!: ResumeData;
  
    constructor() { }
  
    getDumpResumeData(): Observable<ResumeData> {
      this.resumeData = {
        profile: { firstName: '', lastName: '', nickName: '', introduce: '', profile: '' },
        interest: [],
        education: [],
        experince: [],
        skill: { tools: [], workflow: [] },
        portfolioList: [],
        myResumeList: [],
        contact: { email: '', phone: '', socialMedia: [] },
        awardAndCertificateList: [],
        about: { celebrityFavoriteList: [], description: '', hobbies: [] }
      };
      this.resumeData.profile = { firstName: 'Pornthep', lastName: 'Wattanawikullporn', nickName: 'Por', introduce: 'develop yourself all the time', profile: 'https://firebasestorage.googleapis.com/v0/b/resume-9a2d0.appspot.com/o/image_profile%2F2shot%20warota%20cherpor%20blick%20suit.jpg?alt=media&token=168d20e5-b741-4eb3-aa71-5cd26bcc73a5' };
      this.resumeData.interest.push('Apart from being a web developer, I enjoy most of my time being outdoors. In the winter, I am an avid skier and novice ice climber. During the warmer months here in Colorado, I enjoy mountain biking, free climbing, and kayaking')
      this.resumeData.interest.push('When forced indoors, I follow a number of sci-fi and fantasy genre movies and television shows, I am an aspiring chef, and I spend a large amount of my free time exploring the latest technology advancements in the front-end web development world')
      var awardAndCertificate1: AwardAndCertificateMe = { id: 1, name: 'CORDOVA Framework', description: 'Trainning Cross-Platform Mobile App Development with CORDOVA', file: '', visible: true }
      this.resumeData.awardAndCertificateList.push(awardAndCertificate1)
      var edu1: EducationMe = { id: 1, name: 'King Mongkut University of Technology North Bangkok', major: 'Bachelor of computer engineering',startYear: '2013', endYear: '2018', gpa: '2.29', visible: true }
      var edu2: EducationMe = { id: 2, name: 'Technicial Samutprakan College', major: 'Electronic',startYear: '2010', endYear: '2012', gpa: '3.15', visible: true }
      this.resumeData.education.push(edu1)
      this.resumeData.education.push(edu2)
      var exp1: ExperinceMe = { id: 1, name: 'Sarapadchang co', position: 'Programmer', startDate: '1 January 2018', endDate: '29 January 2019', visible: true }
      var exp2: ExperinceMe = { id: 2, name: 'Epic Consulting co, Ltd', position: 'Developer on site AIS', startDate: '14 Febuary 2019', endDate: '31 May 2021', visible: true }
      var exp3: ExperinceMe = { id: 3, name: 'Bright Expert co, Ltd', position: 'Developer on site Thailife Insurance', startDate: '1 September 2021', endDate: '31 January 2022', visible: true }
      var exp4: ExperinceMe = { id: 4, name: 'Wintel Softech Recruitment', position: 'Developer on site AIS', startDate: '1 Febuary 2022', endDate: '30 June 2023', visible: true }
      var exp5: ExperinceMe = { id: 5, name: 'Accord Innovation', position: 'Developer on site MSC', startDate: '1 July 2023', endDate: '30 April 2024', visible: true }
      var exp6: ExperinceMe = { id: 6, name: 'Hitachi Digital Service', position: 'Developer on site SCB', startDate: '1 May 2024', endDate: '30 September 2024', visible: true }
      var exp7: ExperinceMe = { id: 7, name: 'Orcsoft Co., Ltd', position: 'Developer on site DTAC', startDate: '1 Oct 2024', endDate: '15 Dec 2024', visible: true }
      var exp8: ExperinceMe = { id: 8, name: 'Prior Solution', position: 'Developer on site KTB', startDate: '1 Jan 2025', endDate: '2 Feb 2025', visible: true }
      var exp9: ExperinceMe = { id: 9, name: 'Tech Soft Holding', position: 'Developer on site EasyBuy', startDate: '1 Mar 2025', endDate: '13 Jun 2025', visible: true }
      var exp10: ExperinceMe = { id: 10, name: 'Extend IT Consulting', position: 'Developer on site BAY', startDate: '16 Jun 2025', endDate: '', visible: true }
      this.resumeData.experince.push(exp1)
      this.resumeData.experince.push(exp2)
      this.resumeData.experince.push(exp3)
      this.resumeData.experince.push(exp4)
      this.resumeData.experince.push(exp5)
      this.resumeData.experince.push(exp6)
      this.resumeData.experince.push(exp7)
      this.resumeData.experince.push(exp8)
      this.resumeData.experince.push(exp9)
      this.resumeData.experince.push(exp10)
      var tools: string[] = []
      tools.push('HTML, CSS')
      tools.push('JavaScript, TypeScript')
      tools.push('Node JS')
      tools.push('MobileApp (Cordova Framework)')
      tools.push('Angular Framework')
      tools.push('React Framework')
      tools.push('Firebase Hosting')
      tools.push('Google Cloud')
      tools.push('Discord JS')
      tools.push('Docker Desktop')
      tools.push('PHP (Laravel Framework)')
      tools.push('JAVA (Spring Framework Framework)')
      tools.push('JAVA (Spring Boot)')
      tools.push('JAVA (Spring Batch)')
      tools.push('MySQL, PostgreSQL, PL SQL, SQL Server')
      tools.push('Git Sourcetree')
      tools.push('GO Fabric Framework')
      var workflow: string[] = []
      workflow.push('Mobile-First, Responsive Design')
      workflow.push('Ability to use computer language in website design like PHP HTML CSS JAVASCRIPT JAVA')
      workflow.push('Have the ability to design a database using MySQL, PostgreSQL, MS-SQL Server')
      workflow.push('Experience in website design using LARAVEL Framework')
      workflow.push('Responsible and good human relations')
      workflow.push('Easy to angry and easy to get better, too')
      workflow.push('Where is the effort? The success is there')
      workflow.push('Experience in website using Firebase Hosting')
      workflow.push('Experience in service using Google Cloud')
      var skills: SkillMe = { tools: tools, workflow: workflow }
      this.resumeData.skill = skills  
      var folio1: FolioInfo = { describtion: 'Discord Server คือโปรแกรมสื่อสารอย่างหนึ่ง \n คลิกลิ้งค์ด้านล่างเพื่อเข้าสู่เซิฟเวอร์ได้เลย', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/resume-9a2d0.appspot.com/o/image_icon%2FDiscord-screenshot.png?alt=media&token=1eb02005-9c70-41ce-b524-2fcc53951b71', linkto: { name: 'Click to Join Discord', url: 'https://discord.gg/VjDXWahQKX' } }
      var portfolio1: PortfolioMe = { id: 1, name: 'Server Discord', detail: 'create discord server for conversation', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/resume-9a2d0.appspot.com/o/image_icon%2FDiscord-screenshot.png?alt=media&token=1eb02005-9c70-41ce-b524-2fcc53951b71', info: folio1 }
      this.resumeData.portfolioList.push(portfolio1)
      var folio2: FolioInfo = { describtion: 'ระบบจองโต๊ะอาหาร project Restful API พัฒนาด้วย Java SpringBoot', imageUrl: 'https://cdn.azilen.com/wp-content/uploads/2023/07/spring.jpg', linkto: { name: 'Click Link to Github', url: 'https://github.com/porkmutnb/Restaurant-SpringBoot.git' } }
      var portfolio2: PortfolioMe = { id: 2, name: 'spring-boot', detail: 'ระบบจองโต๊ะอาหาร Backend', imageUrl: 'https://cdn.azilen.com/wp-content/uploads/2023/07/spring.jpg', info: folio2 }
      this.resumeData.portfolioList.push(portfolio2)
      var folio3: FolioInfo = { describtion: 'ระบบจองโต๊ะอาหาร project พัฒนาเว็บไซต์ด้วย Angular Framework Version 18', imageUrl: 'https://cdn.quokkalabs.com/blog/object/20240627123007_7a8d96795491496590cb510c21193b2c.webp', linkto: { name: 'Click Link to Github', url: 'https://github.com/porkmutnb/Restaurant-Angular.git' } }
      var portfolio3: PortfolioMe = { id: 3, name: 'angular', detail: 'ระบบจองโต๊ะอาหาร Frontend', imageUrl: 'https://cdn.quokkalabs.com/blog/object/20240627123007_7a8d96795491496590cb510c21193b2c.webp', info: folio3 }
      this.resumeData.portfolioList.push(portfolio3)
      var myResume1: ResumeMe = { id: 1, name: 'CV Pornthep_Wtp.pdf', link: 'https://firebasestorage.googleapis.com/v0/b/resume-9a2d0.appspot.com/o/file_resume%2FCV%20Pornthep_Wtp.pdf?alt=media&token=897b1ece-24f0-4e7c-aa9c-c73434570dab', default: true, visible: true }
      var myResume2: ResumeMe = { id: 2, name: 'Resume-Pornthep.WTP.pdf', link: 'https://firebasestorage.googleapis.com/v0/b/resume-9a2d0.appspot.com/o/file_resume%2FResume%20Pornthep_Wtp.pdf?alt=media&token=9991a309-b76d-497f-814f-5f4dadc280c4', default: false, visible: true }
      this.resumeData.myResumeList.push(myResume1)
      this.resumeData.myResumeList.push(myResume2)
      var socialMediaList: SocialMedia[] = []
      var socialMedia1: SocialMedia = { id: 1, name: 'Line', username: 'porkmutnb', link: 'https://line.me/ti/p/wJ1X706ts5', visible: true }
      var socialMedia2: SocialMedia = { id: 2, name: 'Facebook', username: 'Por Pornthep', link: 'https://www.facebook.com/pornthep.wtp', visible: true }
      var socialMedia3: SocialMedia = { id: 3, name: 'Twitter', username: 'Por Kmutnb', link: 'https://twitter.com/PorKmutnb', visible: true }
      var socialMedia4: SocialMedia = { id: 4, name: 'Linked In', username: 'Pornthep Wattanawikullporn', link: 'https://www.linkedin.com/in/pornthep-wattanawikullporn-084917151', visible: true }
      var socialMedia5: SocialMedia = { id: 5, name: 'GitHub', username: 'porkmutnb', link: 'https://github.com/porkmutnb', visible: true }
      socialMediaList.push(socialMedia1)
      socialMediaList.push(socialMedia2)
      socialMediaList.push(socialMedia3)
      socialMediaList.push(socialMedia4)
      socialMediaList.push(socialMedia5)
      this.resumeData.contact = { email: 'pornthep.wtp@gmail.com', phone: '0860427833', socialMedia: socialMediaList }
      var celebrityFavoriteList:CelebrityFavorite[] = []
      var celebrityFavorite1: CelebrityFavorite = { id: 1, name: 'Cherprang Areekul', link: 'https://www.facebook.com/ccherprang.ark'}
      var celebrityFavorite2: CelebrityFavorite = { id: 2, name: 'Ink Waruntorn', link: 'https://www.facebook.com/InkWaruntorn'}
      var celebrityFavorite3: CelebrityFavorite = { id: 3, name: 'Grace BNK48', link: 'https://www.facebook.com/bnk48official.grace'}
      var celebrityFavorite4: CelebrityFavorite = { id: 4, name: 'Cutekiw', link: 'https://www.instagram.com/cutekiw?igsh=MW9wejVvdm9xZHNqMg=='}
      celebrityFavoriteList.push(celebrityFavorite1)
      celebrityFavoriteList.push(celebrityFavorite2) 
      celebrityFavoriteList.push(celebrityFavorite3)
      celebrityFavoriteList.push(celebrityFavorite4)
      this.resumeData.about = { celebrityFavoriteList: celebrityFavoriteList, description: 'Have knowledge and ability in web programming and need knowledgeable. The use of effective in the work', hobbies: ['Play Game','Surfing Internet','Watching Movie','Listenning Music','Walking Street'] }
      return of(this.resumeData)
    }

}

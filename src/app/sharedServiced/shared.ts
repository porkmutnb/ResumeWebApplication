import { inject, Injectable } from '@angular/core';
import { forkJoin, from, map, Observable, of, switchMap } from 'rxjs';
import { ResumeData } from './bean-shared';
import {
  Database,
  ref,
  set,
  onValue,
  push,
  update,
  remove,
} from '@angular/fire/database';
import {
  Storage,
  ref as storageRef,
  uploadString,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class Shared {
  private storage = inject(Storage);

  private db = inject(Database);

  constructor() {}

  mockResumeData(): ResumeData {
    return {
      profile: {
        firstName: 'Pornthep',
        lastName: 'Wattanawikullporn',
        nickName: 'Por',
        introduce: 'develop yourself all the time',
        profile:
          'https://firebasestorage.googleapis.com/v0/b/resume-9a2d0.appspot.com/o/image_profile%2F2shot%20warota%20cherpor%20blick%20suit.jpg?alt=media&token=168d20e5-b741-4eb3-aa71-5cd26bcc73a5',
      },
      interest: {
        paragraphList: [
          'Apart from being a web developer, I enjoy most of my time being outdoors. In the winter, I am an avid skier and novice ice climber. During the warmer months here in Colorado, I enjoy mountain biking, free climbing, and kayaking',
          'When forced indoors, I follow a number of sci-fi and fantasy genre movies and television shows, I am an aspiring chef, and I spend a large amount of my free time exploring the latest technology advancements in the front-end web development world',
        ],
      },
      education: [
        {
          id: 1,
          name: 'King Mongkut University of Technology North Bangkok',
          depart: 'Bachelor of computer engineering',
          studiesYear: '2013',
          graduateYear: '2018',
          gpa: '2.29',
          visible: true,
        },
        {
          id: 2,
          name: 'Technicial Samutprakan College',
          depart: 'Electronic',
          studiesYear: '2010',
          graduateYear: '2012',
          gpa: '3.15',
          visible: true,
        },
      ],
      experince: [
        {
          id: 1,
          name: 'Sarapadchang co',
          client: 'Startup Permanance | Work Model: Work from Office (WFO)',
          position: 'Programmer',
          detail: {
            project: 'Backend for document management system',
            responsibility:
              'Develop a web application for managing company documents and internal processes.',
          },
          startDate: '1 January 2018',
          endDate: '29 January 2019',
          visible: true,
        },
        {
          id: 2,
          name: 'Epic Consulting co, Ltd',
          client: 'AIS | Work Model: Work from Office (WFO)',
          position: 'Java Developer',
          detail: {
            project: 'AIS Device & Package Sales System',
            responsibility:
              'Resolved bugs and implemented new features to support dynamic marketing campaigns for device and network package sales, ensuring alignment with SA specifications.',
          },
          startDate: '14 Febuary 2019',
          endDate: '31 May 2021',
          visible: true,
        },
        {
          id: 3,
          name: 'Bright Expert co, Ltd',
          client: 'Thailife Insurance | Work Model: Work from Office (WFO)',
          position: 'Java Developer',
          detail: {
            project: 'SMS Microservice',
            responsibility:
              'Developed an internal SMS microservice using Spring Boot 3.x and Java 19. This centralized service allowed various internal applications to trigger SMS messages by forwarding requests to a third-party SMS gateway.',
          },
          startDate: '1 September 2021',
          endDate: '31 January 2022',
          visible: true,
        },
        {
          id: 4,
          name: 'Wintel Softech Recruitment',
          client: 'AIS | Work Model: Work from Office (WFO)',
          position: 'Java Developer',
          detail: {
            project: 'IP Allocation System & Helpdesk System',
            responsibility:
              'Fixed bugs and added new features to an IP allocation system (based on selected customer packages), following SA specifications.\n\nResolved user-reported issues and enhanced a Helpdesk system used to dispatch technical support teams. The application was primarily a web app developed with Cordova, utilizing a Spring framework backend.',
          },
          startDate: '1 Febuary 2022',
          endDate: '30 June 2023',
          visible: true,
        },
        {
          id: 5,
          name: 'Accord Innovation',
          client: 'MSC | Work Model: Hybrid',
          position: 'Java Developer',
          detail: {
            project: 'Bank Asset Management System',
            responsibility:
              'Developed inquiry APIs using Spring Boot to support an Angular-based frontend, following strict requirements and specifications provided by the SA.',
          },
          startDate: '1 July 2023',
          endDate: '30 April 2024',
          visible: true,
        },
        {
          id: 6,
          name: 'Hitachi Digital Service',
          client: 'SCB | Work Model: Hybrid',
          position: 'Java Developer',
          detail: {
            project: '',
            responsibility: '',
          },
          startDate: '1 May 2024',
          endDate: '30 September 2024',
          visible: false,
        },
        {
          id: 7,
          name: 'Orcsoft Co., Ltd',
          client: 'DTAC | Work Model: Work from Home (WFH)',
          position: 'Java Developer',
          detail: {
            project: '',
            responsibility: '',
          },
          startDate: '1 Oct 2024',
          endDate: '15 Dec 2024',
          visible: false,
        },
        {
          id: 8,
          name: 'Prior Solution',
          client: 'KTB | Work Model: Work from Home (WFH)',
          position: 'Java Developer',
          detail: {
            project: '',
            responsibility: '',
          },
          startDate: '1 Jan 2025',
          endDate: '2 Feb 2025',
          visible: false,
        },
        {
          id: 9,
          name: 'Tech Soft Holding',
          client: 'EasyBuy | Work Model: Hybrid',
          position: 'Java Developer',
          detail: {
            project:
              'EasyBuy Customer Loan System (Performance Tuning & Optimization)',
            responsibility:
              'Primarily focused on performance tuning for a customer loan system that was migrated from AS400 to Java Spring Boot 2.x.\n\nOptimized database query execution and resolved performance issues by applying WITH (NOLOCK) hints and creating appropriate indexes on problematic tables.',
          },
          startDate: '1 Mar 2025',
          endDate: '13 Jun 2025',
          visible: true,
        },
        {
          id: 10,
          name: 'Extend IT Consulting',
          client: 'BAY (Bank of Ayudhya) | Work Model: Work from Home (WFH)',
          position: 'Java Developer',
          detail: {
            project:
              'Bank Account Opening System for Corporate and Retail Clients',
            responsibility:
              "Resolved software bugs and implemented new features based on requirements and specifications provided by the System Analyst (SA).\n\nDeveloped a scheduled batch process using Spring 4.x and Java 21 to automatically purge incomplete and inactive account opening records that exceeded the specified time limit.\n\nUpgraded the bank's Spring Batch framework from version 2.x to 4.x for a monthly data export process that generates text files.",
          },
          startDate: '16 Jun 2025',
          endDate: '',
          visible: true,
        },
      ],
      skill: {
        tools: [
          'HTML, CSS',
          'JavaScript, TypeScript',
          'Node JS',
          'MobileApp (Cordova Framework)',
          'Angular Framework',
          'React Framework',
          'Firebase Hosting',
          'Google Cloud',
          'Discord JS',
          'Docker Desktop',
          'PHP (Laravel Framework)',
          'JAVA (Spring Framework Framework)',
          'JAVA (Spring Boot)',
          'JAVA (Spring Batch)',
          'MySQL, PostgreSQL, PL SQL, SQL Server',
          'Git Sourcetree',
          'GO Fabric Framework',
        ],
        workflows: [
          'Mobile-First, Responsive Design',
          'Ability to use computer language in website design like PHP HTML CSS JAVASCRIPT JAVA',
          'Have the ability to design a database using MySQL, PostgreSQL, MS-SQL Server',
          'Experience in website design using LARAVEL Framework',
          'Responsible and good human relations',
          'Easy to angry and easy to get better, too',
          'Where is the effort? The success is there',
          'Experience in website using Firebase Hosting',
          'Experience in service using Google Cloud',
        ],
      },
      portfolioList: [
        {
          id: 1,
          name: 'Server Discord',
          detail: 'create discord server for conversation',
          imageUrl:
            'https://firebasestorage.googleapis.com/v0/b/resume-9a2d0.appspot.com/o/image_icon%2FDiscord-screenshot.png?alt=media&token=1eb02005-9c70-41ce-b524-2fcc53951b71',
          info: {
            describtion:
              'Discord Server คือโปรแกรมสื่อสารอย่างหนึ่ง \n คลิกลิ้งค์ด้านล่างเพื่อเข้าสู่เซิฟเวอร์ได้เลย',
            imageUrl: '',
            linkto: {
              name: 'Click to Join Discord',
              url: 'https://discord.gg/VjDXWahQKX',
            },
          },
        },
        {
          id: 2,
          name: 'spring-boot',
          detail: 'ระบบจองโต๊ะอาหาร Backend',
          imageUrl:
            'https://cdn.azilen.com/wp-content/uploads/2023/07/spring.jpg',
          info: {
            describtion:
              'ระบบจองโต๊ะอาหาร project Restful API พัฒนาด้วย Java SpringBoot',
            imageUrl: '',
            linkto: {
              name: 'Click Link to Github',
              url: 'https://github.com/your-repo/spring-boot',
            },
          },
        },
        {
          id: 3,
          name: 'angular',
          detail: 'ระบบจองโต๊ะอาหาร Frontend',
          imageUrl:
            'https://cdn.quokkalabs.com/blog/object/20240627123007_7a8d96795491496590cb510c21193b2c.webp',
          info: {
            describtion:
              'ระบบจองโต๊ะอาหาร project พัฒนาเว็บไซต์ด้วย Angular Framework Version 18',
            imageUrl: '',
            linkto: {
              name: 'Click Link to Github',
              url: 'https://github.com/your-repo/angular',
            },
          },
        },
      ],
      myResumeList: [
        {
          id: 1,
          name: 'CV Pornthep_Wtp.pdf',
          link: 'https://firebasestorage.googleapis.com/v0/b/resume-9a2d0.appspot.com/o/file_resume%2FCV%20Pornthep_Wtp.pdf?alt=media&token=897b1ece-24f0-4e7c-aa9c-c73434570dab',
          default: true,
          visible: true,
        },
        {
          id: 2,
          name: 'Resume-Pornthep.WTP.pdf',
          link: 'https://firebasestorage.googleapis.com/v0/b/resume-9a2d0.appspot.com/o/file_resume%2FResume%20Pornthep_Wtp.pdf?alt=media&token=9991a309-b76d-497f-814f-5f4dadc280c4',
          default: false,
          visible: true,
        },
      ],
      contact: {
        email: 'pornthep@example.com',
        phone: '0860427833',
        socialMediaList: [
          {
            id: 1,
            name: 'Line',
            username: 'porkmutnb',
            link: 'https://line.me/ti/p/wJ1X706ts5',
            visible: true,
          },
          {
            id: 2,
            name: 'Facebook',
            username: 'Por Pornthep',
            link: 'https://www.facebook.com/pornthep.wtp',
            visible: true,
          },
          {
            id: 3,
            name: 'Twitter',
            username: 'Por Kmutnb',
            link: 'https://twitter.com/PorKmutnb',
            visible: true,
          },
          {
            id: 4,
            name: 'Linked In',
            username: 'Pornthep Wattanawikullporn',
            link: 'https://www.linkedin.com/in/pornthep-wattanawikullporn-084917151',
            visible: true,
          },
          {
            id: 5,
            name: 'GitHub',
            username: 'porkmutnb',
            link: `https://github.com/porkmutnb`,
            visible: true,
          },
        ],
      },
      awardAndCertificateList: [
        {
          id: 1,
          name: 'CORDOVA Framework',
          description:
            'Trainning Cross-Platform Mobile App Development with CORDOVA',
          file: '',
          visible: true,
        },
      ],
      about: {
        celebrityFavoriteList: [
          {
            id: 1,
            name: 'Cherprang Areekul',
            link: 'https://www.facebook.com/ccherprang.ark',
          },
          {
            id: 2,
            name: 'Ink Waruntorn',
            link: 'https://www.facebook.com/InkWaruntorn',
          },
          {
            id: 3,
            name: 'Grace BNK48',
            link: 'https://www.facebook.com/bnk48official.grace',
          },
          {
            id: 4,
            name: 'Cutekiw',
            link: 'https://www.instagram.com/cutekiw?igsh=MW9wejVvdm9xZHNqMg==',
          },
        ],
        description:
          'I am a web developer with a passion for creating beautiful and functional user experiences. I love learning new technologies and staying up-to-date with the latest trends in web development.',
        hobbies: [
          'Play Game',
          'Surfing Internet',
          'Watching Movie',
          'Listenning Music',
          'Walking Street',
        ],
      },
    } as ResumeData;
  }

  getDumpResumeData(): Observable<ResumeData> {
    return of(this.mockResumeData());
  }

  getDumpPortfolioById(id: number): Observable<ResumeData> {
    const profile$ = of(this.mockResumeData().profile);
    const portfolioList$ = of(
      this.mockResumeData().portfolioList?.filter((item) => item.id === id),
    );
    if (portfolioList$ == null) {
      throw new Error(`Portfolio item with id ${id} not found.`);
    }
    return forkJoin({
      profileData: profile$,
      portfolioData: portfolioList$,
    }).pipe(
      map(({ profileData, portfolioData }) => {
        const resumeData: ResumeData = {
          profile: profileData,
          portfolioList: portfolioData,
        };
        return resumeData;
      }),
    );
  }

  // อ่านข้อมูลแบบ Realtime
  getData(path: string): Observable<any> {
    return new Observable((observer) => {
      const dataRef = ref(this.db, path);
      const unsubscribe = onValue(dataRef, (snapshot) => {
        observer.next(snapshot.val());
        observer.complete();
      });
      return { unsubscribe };
    });
  }

  // เขียนข้อมูล
  setData(path: string, data: any) {
    return set(ref(this.db, path), data);
  }

  // เพิ่มข้อมูล (auto id)
  pushData(path: string, data: any) {
    return push(ref(this.db, path), data);
  }

  // อัพเดทข้อมูล
  updateData(path: string, data: any) {
    return update(ref(this.db, path), data);
  }

  // ลบข้อมูล
  removeData(path: string) {
    return remove(ref(this.db, path));
  }

  // อัปโหลดไฟล์ (base64) และรับ URL
  uploadFile(filePath: string, base64String: string): Observable<string> {
    const fileRef = storageRef(this.storage, filePath);
    return from(uploadString(fileRef, base64String, 'data_url')).pipe(
      switchMap((snapshot) => from(getDownloadURL(snapshot.ref))),
    );
  }

  // ลบไฟล์จาก URL
  deleteFile(downloadUrl: string): Observable<void> {
    if (
      !downloadUrl ||
      !downloadUrl.startsWith('https://firebasestorage.googleapis.com')
    ) {
      return of(undefined); // ไม่ใช่ Firebase Storage URL หรือ URL ว่างเปล่า
    }
    try {
      const fileRef = storageRef(this.storage, downloadUrl);
      return from(deleteObject(fileRef));
    } catch (error) {
      console.error(
        'Error creating storage reference from URL. It might be an invalid URL.',
        error,
      );
      return of(undefined);
    }
  }
}

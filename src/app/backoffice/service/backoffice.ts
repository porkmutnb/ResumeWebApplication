import { Injectable } from '@angular/core';
import { Shared } from '../../sharedServiced/shared';
import { forkJoin, map, Observable, of } from 'rxjs';
import { AboutMe, AwardAndCertificateMe, ContactMe, EducationMe, ExperinceMe, InterestMe, PortfolioMe, ProfileMe, ResumeData, ResumeMe, SkillMe } from '../../sharedServiced/bean-shared';

@Injectable({
  providedIn: 'root'
})
export class Backoffice {

  constructor(private sharedService: Shared) { }

  getResumeDataForBackofficeProfilePage(): Observable<ResumeData> {
    const profile$ = this.sharedService.getData('profile');
    const about$ = this.sharedService.getData('aboutMe');
    const contact$ = this.sharedService.getData('contactMe');
    return forkJoin({
      profileData: profile$,
      aboutData: about$,
      contactData: contact$,
    }).pipe(
      map(({ profileData, aboutData, contactData }) => {
        const resumeData: ResumeData = {
          profile: profileData,
          about: aboutData,
          contact: contactData,
        };
        console.log('All data received:', resumeData);
        return resumeData;
      })
    );
  }

  getResumeDataForBackofficeSkillPage(): Observable<ResumeData> {
    const skills$ = this.sharedService.getData('/skills');
    return forkJoin({
      skillsData: skills$,
    }).pipe(
      map(({ skillsData }) => {
        const resumeData: ResumeData = {
          skill: skillsData,
        };
        console.log('All data received:', resumeData);
        return resumeData;
      })
    );
  }

  getResumeDataForBackofficeResumePage(): Observable<ResumeData> {
    const myResumeList$ = this.sharedService.getData('/myResumeList');
    return forkJoin({
      resumeMeData: myResumeList$,
    }).pipe(
      map(({ resumeMeData }) => {
        const resumeData: ResumeData = {
          myResumeList: resumeMeData,
        };
        console.log('All data received:', resumeData);
        return resumeData;
      })
    );
  }

  getResumeDataForBackofficePortfolioPage(): Observable<ResumeData> {
    const portfolioList$ = this.sharedService.getData('/portfolioList');
    return forkJoin({
      portfolioData: portfolioList$,
    }).pipe(
      map(({ portfolioData }) => {
        portfolioData.forEach((port: any) => {
          if(port.info['importBot']) {
            port.info.linkto = port.info.importBot
          }
        })
        const resumeData: ResumeData = {
          portfolioList: portfolioData,
        };
        console.log('All data received:', resumeData);
        return resumeData;
      })
    );
  }

  getResumeDataForBackofficeInterestPage(): Observable<ResumeData> {
    const interests$ = this.sharedService.getData('/interests');
    return forkJoin({
      interestData: interests$,
    }).pipe(
      map(({ interestData }) => {
        const resumeData: ResumeData = {
          interest: interestData,
        };
        console.log('All data received:', resumeData);
        return resumeData;
      })
    );
  }

  getResumeDataForBackofficeExperincePage(): Observable<ResumeData> {
    const experience$ = this.sharedService.getData('/experience');
    return forkJoin({
      experienceData: experience$,
    }).pipe(
      map(({ experienceData }) => {
        const resumeData: ResumeData = {
          experince: experienceData,
        };
        console.log('All data received:', resumeData);
        return resumeData;
      })
    );
  }

  getResumeDataForBackofficeEducationPage(): Observable<ResumeData> {
    const education$ = this.sharedService.getData('/education');
    return forkJoin({
      educationData: education$,
    }).pipe(
      map(({ educationData }) => {
        const resumeData: ResumeData = {
          education: educationData,
        };
        console.log('All data received:', resumeData);
        return resumeData;
      })
    );
  }

  getResumeDataForBackofficAwardAndCertificatPage(): Observable<ResumeData> {
    const awardAndCertificateList$ = this.sharedService.getData('/awardAndCertificateList');
    return forkJoin({
      awardAndCertificateListnData: awardAndCertificateList$,
    }).pipe(
      map(({ awardAndCertificateListnData }) => {
        const resumeData: ResumeData = {
          awardAndCertificateList: awardAndCertificateListnData,
        };
        console.log('All data received:', resumeData);
        return resumeData;
      })
    );
  }

  updateProfilePage(profileSection: ProfileMe, contactSection: ContactMe, aboutSection: AboutMe): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.sharedService.setData('profile', profileSection)
        .then(() => this.sharedService.setData('contactMe', contactSection))
        .then(() => this.sharedService.setData('aboutMe', aboutSection))
        .then(() => resolve())
        .catch((error) => reject(error));
    })      
  }

  updateInterestPage(interestSection: InterestMe): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.sharedService.setData('interests', interestSection)
        .then(() => {
          resolve()
        })
        .catch((error) => reject(error));
    })
  }

  updateExperincePage(experinceSection: ExperinceMe[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.sharedService.setData('experience', experinceSection)
        .then(() => {
          resolve()
        })
        .catch((error) => reject(error));
    })
  }

  updateEducationPage(educationSection: EducationMe[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.sharedService.setData('education', educationSection)
        .then(() => {
          resolve()
        })
        .catch((error) => reject(error));
    })
  }

  updateAwardAndCertificatePage(awardAndCertificateList: AwardAndCertificateMe[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.sharedService.setData('awardAndCertificateList', awardAndCertificateList)
        .then(() => {
          resolve()
        })
        .catch((error) => reject(error));
    })
  }

  updateSkillPage(skillSection: SkillMe): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.sharedService.setData('skills', skillSection)
        .then(() => {
          resolve()
        })
        .catch((error) => reject(error));
    })
  }

  updatePortfolioPage(portfolioList: PortfolioMe[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.sharedService.setData('portfolioList', portfolioList)
        .then(() => {
          resolve()
        })
        .catch((error) => reject(error));
    })
  }

  updateResumePage(myResumeList: ResumeMe[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.sharedService.setData('myResumeList', myResumeList)
        .then(() => {
          resolve()
        })
        .catch((error) => reject(error));
    })
  }

}

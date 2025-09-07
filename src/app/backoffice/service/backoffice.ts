import { Injectable } from '@angular/core';
import { Shared } from '../../sharedServiced/shared';
import { forkJoin, map, Observable, of } from 'rxjs';
import { ResumeData } from '../../sharedServiced/bean-shared';

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

}

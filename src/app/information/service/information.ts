import { Injectable } from '@angular/core';
import { ResumeData } from '../../sharedServiced/bean-shared';
import { forkJoin, map, Observable } from 'rxjs';
import { Shared } from '../../sharedServiced/shared';

@Injectable({
  providedIn: 'root'
})
export class Information {

  constructor(private sharedService: Shared) { }

  getResumeDataForInformationMainPage(): Observable<ResumeData> {
    const profile$ = this.sharedService.getData('profile');
    return forkJoin({
      profileData: profile$,
    }).pipe(
      map(({ profileData }) => {
        const resumeData: ResumeData = {
          profile: profileData,
        };
        return resumeData;
      })
    );
  }

  getResumeDataForInformationHomePage(): Observable<ResumeData> {
    const interests$ = this.sharedService.getData('/interests');
    const education$ = this.sharedService.getData('/education');
    const experience$ = this.sharedService.getData('/experience');
    const skills$ = this.sharedService.getData('/skills');
    const awardAndCertificateList$ = this.sharedService.getData('/awardAndCertificateList');
    return forkJoin({
      interestData: interests$,
      educationData: education$,
      experienceData: experience$,
      skillsData: skills$,
      awardAndCertificateListData: awardAndCertificateList$,
    }).pipe(
      map(({ interestData, educationData, experienceData, skillsData, awardAndCertificateListData }) => {
        const resumeData: ResumeData = {
          interest: interestData,
          education: educationData,
          experince: experienceData,
          skill: skillsData,
          awardAndCertificateList: awardAndCertificateListData,
        };
        return resumeData;
      })
    );
  }

  getResumeDataForInformationContactPage(): Observable<ResumeData> {
    const profile$ = this.sharedService.getData('profile');
    const contact$ = this.sharedService.getData('contactMe');
    return forkJoin({
      profileData: profile$,
      contactData: contact$,
    }).pipe(
      map(({ contactData, profileData }) => {
        const resumeData: ResumeData = {
          contact: contactData,
          profile: profileData,
        };
        return resumeData;
      })
    );
  }

  getResumeDataForInformationAboutPage(): Observable<ResumeData> {
    const profile$ = this.sharedService.getData('profile');
    const about$ = this.sharedService.getData('aboutMe');
    return forkJoin({
      aboutData: about$,
      profileData: profile$,
    }).pipe(
      map(({ aboutData, profileData }) => {
        const resumeData: ResumeData = {
          about: aboutData,
          profile: profileData,
        };
        return resumeData;
      })
    );
  }

  getResumeDataForInformationDownloadPage(): Observable<ResumeData> {
    const profile$ = this.sharedService.getData('profile');
    const myResumeList$ = this.sharedService.getData('/myResumeList');
    return forkJoin({
      resumeMeData: myResumeList$,
      profileData: profile$,
    }).pipe(
      map(({ resumeMeData, profileData }) => {
        const resumeData: ResumeData = {
          myResumeList: resumeMeData,
          profile: profileData,
        };
        return resumeData;
      })
    );
  }

}

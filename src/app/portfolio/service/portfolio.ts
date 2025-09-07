import { Injectable } from '@angular/core';
import { PortfolioMe, ResumeData } from '../../sharedServiced/bean-shared';
import { Shared } from '../../sharedServiced/shared';
import { firstValueFrom, forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Portfolio {

  constructor(private sharedService: Shared) { }

  getResumeDataForPortfolioInfoPage(): Observable<ResumeData> {
    const portfolioList$ = this.sharedService.getData('portfolioList');
    return forkJoin({
      portfolioData: portfolioList$,
    }).pipe(
      map(({ portfolioData }) => {
        const resumeData: ResumeData = {
          portfolioList: portfolioData,
        };
        return resumeData;
      })
    );
  }

  getResumeDataForPortfolioDetailPage(id: number): Observable<ResumeData> {
    const profile$ = this.sharedService.getData('profile');
    const portfolioList$ = this.sharedService.getData('portfolioList').pipe(
      map(portfolioList => portfolioList.find((item: { id: number; }) => item.id === id))
    );
    if(portfolioList$ == null) {
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
      })
    );
  }

}

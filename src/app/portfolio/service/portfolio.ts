import { Injectable } from '@angular/core';
import { PortfolioMe, ResumeData } from '../../sharedServiced/bean-shared';
import { Shared } from '../../sharedServiced/shared';

@Injectable({
  providedIn: 'root'
})
export class Portfolio {

  constructor(private sharedService: Shared) { }

  dumpGetInfoById(id: number): Promise<PortfolioMe> {
    return new Promise((resolve, reject) => {
      this.sharedService.getDumpResumeData().subscribe({
        next: (data: { portfolioList: PortfolioMe[]; }) => {
          const portfolioItem = data.portfolioList.find(item => item.id === id);
          if (portfolioItem) {
            resolve(portfolioItem);
          } else {
            reject('Portfolio item not found');
          }
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

}

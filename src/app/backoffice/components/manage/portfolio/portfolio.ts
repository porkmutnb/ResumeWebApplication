import { Component, OnDestroy, OnInit } from '@angular/core';
import { Shared } from '../../../../sharedServiced/shared';
import { Subscription } from 'rxjs';
import { PortfolioMe } from '../../../../sharedServiced/bean-shared';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css'
})
export class Portfolio implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  portfolioSection: PortfolioMe[] = [];

  constructor(private sharedService: Shared) {

  }

  ngOnInit(): void {
    this.getDumpResumeData()
  }

  ngOnDestroy(): void {
    if(this.resumeData) {
      this.resumeData.unsubscribe()
    }
  }

  getDumpResumeData(): void {
    this.resumeData = this.sharedService.getDumpResumeData().subscribe({
      next: (data) => {
        this.portfolioSection = data.portfolioList
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        console.log('portfolioSection', this.portfolioSection);
      }
    })
  }

  addPortfolio(): void {
    var ids = this.portfolioSection.length + 1
    this.portfolioSection.push({
      id: ids,
      name: '',
      detail: '',
      imageUrl: '',
      info: {
        describtion: '',
        imageUrl: '',
        linkto: { name: '', url: '' }
      }
    });
    this.updatePortfolioIds()
  }

  removePortfolio(index: number): void {
    this.portfolioSection.splice(index, 1);
    this.updatePortfolioIds()
  }

  updatePortfolioIds() {
    this.portfolioSection?.forEach((port, idx) => {
      port.id = idx + 1;
    });
  }

}

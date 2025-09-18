import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Shared } from '../../../sharedServiced/shared';
import { PortfolioMe } from '../../../sharedServiced/bean-shared';
import { RouterLink } from '@angular/router';
import { Portfolio } from '../../service/portfolio';
import { environment } from '../../../../environments/environment';
import { LoadingOverlay } from '../../../sharedComponents/loading-overlay/loading-overlay';

@Component({
  selector: 'app-info',
  imports: [CommonModule, RouterLink, LoadingOverlay],
  templateUrl: './info.html',
  styleUrl: './info.css'
})
export class Info implements OnInit, OnDestroy {

  isPageLoading = false;

  private resumeData: Subscription | undefined
  portfolioSection: PortfolioMe[] = [];

  constructor(private service: Portfolio, private sharedService: Shared, private cdr: ChangeDetectorRef) {
    // Initialization logic can go here
  }

  ngOnInit(): void {
    environment.production ? this.getResumeData() : this.getDumpResumeData();
  }

  ngOnDestroy(): void {
    if(this.resumeData) {
      this.resumeData.unsubscribe()
    }
  }

  getDumpResumeData(): void {
    this.isPageLoading = true;
    this.resumeData = this.sharedService.getDumpResumeData().subscribe({
      next: (data) => {
        this.isPageLoading = false;
        Object.assign(this.portfolioSection, data.portfolioList)
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        this.cdr.detectChanges();
      }
    })
  }

  getResumeData(): void {
    this.isPageLoading = true;
    this.resumeData = this.service.getResumeDataForPortfolioInfoPage().subscribe({
      next: (data) => {
        this.isPageLoading = false;
        Object.assign(this.portfolioSection, data.portfolioList)
      },
      error: (error) => {
        console.error('Error fetching resume-data[PortfolioIOnfo]:', error);
      },
      complete: () => {
        this.cdr.detectChanges();
      }
    })
  }
  
}

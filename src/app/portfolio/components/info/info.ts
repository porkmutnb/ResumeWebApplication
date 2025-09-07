import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Shared } from '../../../sharedServiced/shared';
import { PortfolioMe } from '../../../sharedServiced/bean-shared';
import { RouterLink } from '@angular/router';
import { Portfolio } from '../../service/portfolio';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-info',
  imports: [CommonModule, RouterLink],
  templateUrl: './info.html',
  styleUrl: './info.css'
})
export class Info implements OnInit, OnDestroy {

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
    this.resumeData = this.sharedService.getDumpResumeData().subscribe({
      next: (data) => {
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
    this.resumeData = this.service.getResumeDataForPortfolioInfoPage().subscribe({
      next: (data) => {
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

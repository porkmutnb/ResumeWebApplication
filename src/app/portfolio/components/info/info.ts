import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Shared } from '../../../sharedServiced/shared';
import { PortfolioMe } from '../../../sharedServiced/bean-shared';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-info',
  imports: [CommonModule, RouterLink],
  templateUrl: './info.html',
  styleUrl: './info.css'
})
export class Info implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  portfolioSection: PortfolioMe[] = [];

  constructor(private sharedService: Shared) {
    // Initialization logic can go here
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
        
      }
    })
  }
  
}

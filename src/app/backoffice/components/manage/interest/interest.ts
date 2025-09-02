import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Shared } from '../../../../sharedServiced/shared';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interest',
  imports: [CommonModule, FormsModule],
  templateUrl: './interest.html',
  styleUrl: './interest.css'
})
export class Interest implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  interestSection: String[] = [];

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
          this.interestSection = data.interest
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        console.log('interestSection', this.interestSection);
      }
    })
  }

  addInterest() {
    this.interestSection.push('');
  }

  removeInterest(index: number) {
    this.interestSection.splice(index, 1);
  }

}

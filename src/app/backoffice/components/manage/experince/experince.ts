import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ExperinceMe } from '../../../../sharedServiced/bean-shared';
import { Shared } from '../../../../sharedServiced/shared';

@Component({
  selector: 'app-experince',
  imports: [CommonModule, FormsModule],
  templateUrl: './experince.html',
  styleUrl: './experince.css'
})
export class Experince implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  experienceSection: ExperinceMe[] = [];

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
        this.experienceSection = data.experince
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        console.log('experienceSection', this.experienceSection);
      }
    })
  }

  addExperience() {
    this.experienceSection.push({
      id: this.experienceSection.length + 1,
      name: '',
      position: '',
      startDate: '',
      endDate: '',
      visible: true
    });
    this.updateExperienceIds();
  }

  removeExperience(index: number) {
    this.experienceSection.splice(index, 1);
    this.updateExperienceIds();
  }

  updateExperienceIds() {
    this.experienceSection.forEach((exp, idx) => {
      exp.id = idx + 1;
    });
  }

}

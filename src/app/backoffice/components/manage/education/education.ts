import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EducationMe } from '../../../../sharedServiced/bean-shared';
import { Shared } from '../../../../sharedServiced/shared';

@Component({
  selector: 'app-education',
  imports: [CommonModule, FormsModule],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class Education implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  educationSection: EducationMe[] = [];

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
        this.educationSection = data.education
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        console.log('educationSection', this.educationSection);
      }
    })
  }

  addEducation() {
    this.educationSection.push({
      id: this.educationSection.length + 1,
      name: '',
      major: '',
      startYear: '',
      endYear: '',
      gpa: '',
      visible: true
    });
    this.updateEducationIds();
  }

  removeEducation(index: number) {
    this.educationSection.splice(index, 1);
    this.updateEducationIds();
  }

  updateEducationIds() {
    this.educationSection.forEach((edu, idx) => {
      edu.id = idx + 1;
    });
  }

}

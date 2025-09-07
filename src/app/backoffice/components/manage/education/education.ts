import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EducationMe } from '../../../../sharedServiced/bean-shared';
import { Shared } from '../../../../sharedServiced/shared';
import { Backoffice } from '../../../service/backoffice';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-education',
  imports: [CommonModule, FormsModule],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class Education implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  educationSection: EducationMe[] = [];

  constructor(private service: Backoffice, private sharedService: Shared, private cdr: ChangeDetectorRef) {
  
  }
  
  ngOnInit(): void {
    environment.production ? this.getResumeData() : this.getDumpResumeData()
  }
  
  ngOnDestroy(): void {
    if(this.resumeData) {
      this.resumeData.unsubscribe()
    }
  }
  
  getDumpResumeData(): void {
    this.resumeData = this.sharedService.getDumpResumeData().subscribe({
      next: (data) => {
        Object.assign(this.educationSection, data.education)
      },
      error: (error) => {
        console.error('Error fetching resume-data[Education]:', error);
      },
      complete: () => {
        console.log(`educationSection: ${JSON.stringify(this.educationSection)}`);
        this.cdr.detectChanges();
      }
    })
  }

  getResumeData(): void {
    this.resumeData = this.service.getResumeDataForBackofficeEducationPage().subscribe({
      next: (data) => {
        Object.assign(this.educationSection, data.education)
      },
      error: (error) => {
        console.error('Error fetching resume-data[Education]:', error)
      },
      complete: () => {
        console.log(`educationSection: ${JSON.stringify(this.educationSection)}`)
        this.cdr.detectChanges();
      }
    })
  }

  addEducation() {
    this.educationSection.push({
      id: this.educationSection.length + 1,
      name: '',
      depart: '',
      studiesYear: '',
      graduateYear: '',
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

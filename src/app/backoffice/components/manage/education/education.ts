import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EducationMe } from '../../../../sharedServiced/bean-shared';
import { Shared } from '../../../../sharedServiced/shared';
import { Backoffice } from '../../../service/backoffice';
import { environment } from '../../../../../environments/environment';
import { LoadingOverlay } from '../../../../sharedComponents/loading-overlay/loading-overlay';

@Component({
  selector: 'app-education',
  imports: [CommonModule, FormsModule, LoadingOverlay],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class Education implements OnInit, OnDestroy {

  isPageLoading = false;

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
    this.isPageLoading = true
    this.resumeData = this.sharedService.getDumpResumeData().subscribe({
      next: (data) => {
        this.isPageLoading = false
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
    this.isPageLoading = true
    this.resumeData = this.service.getResumeDataForBackofficeEducationPage().subscribe({
      next: (data) => {
        this.isPageLoading = false
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

  updateEducation() {
    if(this.educationSection && this.validateDataSection()) {
      this.isPageLoading = true
      this.service.updateEducationPage(this.educationSection).then(() => {
        
      }).catch((error) => {
        alert('Error updating education, please try again later.');
        console.error('Error updating education:', error);
      }).finally(() => {
        this.isPageLoading = false
        this.ngOnInit();
      });
    }
  }

  resetEducation() {
    this.ngOnInit();
  }


  validateDataSection(): boolean {
    if(this.educationSection.length == 0) {
      alert('At least one education entry is required.');
      return false;
    }
    for(const [index, edu] of this.educationSection.entries()) {
      edu.visible = edu.visible ?? true
      if(edu.name == '') {
        alert(`Education Name in entry ${index + 1} is required.`);
        return false;  
      }
      if(edu.depart == '') {
        alert(`Department in entry ${index + 1} is required.`);
        return false;  
      }
      if(edu.studiesYear == '') {
        alert(`Start Year in entry ${index + 1} is required.`);
        return false;  
      }
      if(edu.graduateYear == '') {
        alert(`Graduate Year in entry ${index + 1} is required.`);
        return false;  
      }            
    }
    return true;
  }

}

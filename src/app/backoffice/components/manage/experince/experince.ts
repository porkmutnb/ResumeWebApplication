import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ExperinceMe } from '../../../../sharedServiced/bean-shared';
import { Shared } from '../../../../sharedServiced/shared';
import { Backoffice } from '../../../service/backoffice';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-experince',
  imports: [CommonModule, FormsModule],
  templateUrl: './experince.html',
  styleUrl: './experince.css'
})
export class Experince implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  experienceSection: ExperinceMe[] = [];

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
        Object.assign(this.experienceSection, data.experince)
      },
      error: (error) => {
        console.error('Error fetching resume-data[Experince]:', error);
      },
      complete: () => {
        console.log(`experienceSection: ${JSON.stringify(this.experienceSection)}`);
        this.cdr.detectChanges();
      }
    })
  }

  getResumeData(): void {
    this.resumeData = this.service.getResumeDataForBackofficeExperincePage().subscribe({
      next: (data) => {
        Object.assign(this.experienceSection, data.experince)
      },
      error: (error) => {
        console.error('Error fetching resume-data[Experince]:', error)
      },
      complete: () => {
        console.log(`experienceSection: ${JSON.stringify(this.experienceSection)}`)
        this.cdr.detectChanges();
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

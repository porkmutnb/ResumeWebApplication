import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Shared } from '../../../sharedServiced/shared';
import { AwardAndCertificateMe, EducationMe, ExperinceMe, InterestMe, SkillMe } from '../../../sharedServiced/bean-shared';
import { Subscription } from 'rxjs';
import { Information } from '../../service/information';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  interestSection: InterestMe | undefined;
  educationSection: EducationMe[] = [];
  experienceSection: ExperinceMe[] = [];
  skillSection: SkillMe = {
    tools: [],
    workflows: []
  };
  awardAndCertificateSection: AwardAndCertificateMe[] = [];

  constructor(private service: Information, private sharedService: Shared, private cdr: ChangeDetectorRef) {
      
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
        this.interestSection = {paragraphList: []}
        Object.assign(this.interestSection, data.interest)
        this.educationSection = []
        Object.assign(this.educationSection, data.education)
        this.experienceSection = []
        Object.assign(this.experienceSection, data.experince)
        this.skillSection = { tools: [], workflows: [] }
        Object.assign(this.skillSection, data.skill)
        this.awardAndCertificateSection = []
        Object.assign(this.awardAndCertificateSection, data.awardAndCertificateList)
      },
      error: (error) => {
        console.error('Error fetching resume-data[Home]:', error)
      },
      complete: () => {
        this.awardAndCertificateSection.map((awardAndCertificate) => {
          if(awardAndCertificate.file=='') {
            awardAndCertificate.file = '../../../../assets/report-card.webp'
          }
        })
        this.cdr.detectChanges();
      }
    })
  }

  getResumeData(): void {
    this.resumeData = this.service.getResumeDataForInformationHomePage().subscribe({
      next: (data) => {
        this.interestSection = {paragraphList: []}
        Object.assign(this.interestSection, data.interest)
        this.educationSection = []
        Object.assign(this.educationSection, data.education)
        this.experienceSection = []
        Object.assign(this.experienceSection, data.experince)
        this.skillSection = { tools: [], workflows: [] }
        Object.assign(this.skillSection, data.skill)
        this.awardAndCertificateSection = []
        Object.assign(this.awardAndCertificateSection, data.awardAndCertificateList)
      },
      error: (error) => {
        console.error('Error fetching resume-data[Home]:', error)
      },
      complete: () => {
        this.awardAndCertificateSection.map((awardAndCertificate) => {
          if(awardAndCertificate.file=='') {
            awardAndCertificate.file = '../../../../assets/report-card.webp'
          }
        })
        this.cdr.detectChanges();
      }
    })
  }

}

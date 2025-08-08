import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Information } from '../../service/information';
import { AwardAndCertificateMe, EducationMe, ExperinceMe, SkillMe } from '../../service/bean-shared';
import { Subscription } from 'rxjs';

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
  interestSection: string[] = [];
  educationSection: EducationMe[] = [];
  experienceSection: ExperinceMe[] = [];
  skillSection: SkillMe | undefined;
  awardAndCertificateSection: AwardAndCertificateMe[] = [];

  constructor(private informationService: Information) {
      
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
    this.resumeData = this.informationService.getDumpResumeData().subscribe({
      next: (data) => {
        this.interestSection = data.interest
        this.educationSection = data.education
        this.experienceSection = data.experince
        this.skillSection = data.skill
        this.awardAndCertificateSection = data.awardAndCertificateList
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        console.log('this.interestSection', this.interestSection)
        console.log('this.educationSection', this.educationSection)
        console.log('this.experienceSection', this.experienceSection)
        console.log('this.skillSection', this.skillSection)
        console.log('this.awardAndCertificateSection', this.awardAndCertificateSection)
        this.awardAndCertificateSection.map((awardAndCertificate) => {
          if(awardAndCertificate.file=='') {
            awardAndCertificate.file = '../../../../assets/report-card.webp'
          }
        })
      }
    })
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AwardAndCertificateMe, EducationMe, ExperinceMe, ProfileMe, SkillMe } from '../../../sharedServiced/bean-shared';
import { Shared } from '../../../sharedServiced/shared';

@Component({
  selector: 'app-manage',
  imports: [CommonModule, RouterLink],
  templateUrl: './manage.html',
  styleUrl: './manage.css'
})
export class Manage implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  profileSection: ProfileMe | undefined;
  interestSection: string[] = [];
  educationSection: EducationMe[] = [];
  experienceSection: ExperinceMe[] = [];
  skillSection: SkillMe | undefined;
  awardAndCertificateSection: AwardAndCertificateMe[] = [];

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
        this.profileSection = data.profile
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
        if(this.profileSection && this.profileSection.profile == '') {
          this.profileSection.profile = '../../../../assets/user.webp'
        }
        this.awardAndCertificateSection.map((awardAndCertificate) => {
          if(awardAndCertificate.file=='') {
            awardAndCertificate.file = '../../../../assets/report-card.webp'
          }
        })
      }
    })
  }

}

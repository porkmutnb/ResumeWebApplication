import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Shared } from '../../../../sharedServiced/shared';
import { Subscription } from 'rxjs';
import { AwardAndCertificateMe } from '../../../../sharedServiced/bean-shared';

@Component({
  selector: 'app-awardandcertificate',
  imports: [CommonModule, FormsModule],
  templateUrl: './awardandcertificate.html',
  styleUrl: './awardandcertificate.css'
})
export class Awardandcertificate implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  awardAndCertificateSection: AwardAndCertificateMe[] = [];

  constructor(private sharedService: Shared) { }

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
        this.awardAndCertificateSection = data.awardAndCertificateList
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        this.awardAndCertificateSection.map((awardAndCertificate) => {
          if(awardAndCertificate.file=='') {
            awardAndCertificate.file = '../../../../assets/report-card.webp'
          }
        })
        console.log('awardAndCertificateSection', this.awardAndCertificateSection);
      }
    })
  }

  addAward(): void {
    const newId = this.awardAndCertificateSection.length > 0 ? Math.max(...this.awardAndCertificateSection.map(a => a.id || 0)) + 1 : 1;
    this.awardAndCertificateSection.push({
      id: newId,
      name: '',
      description: '',
      file: '../../../../assets/report-card.webp',
      visible: true
    });
    this.updateAwardIds();
  }

  deleteAward(index: number): void {
    this.awardAndCertificateSection.splice(index, 1);
    this.updateAwardIds();
  }

  updateAwardIds() {
    this.awardAndCertificateSection.forEach((awd, idx) => {
      awd.id = idx + 1;
    });
  }

}

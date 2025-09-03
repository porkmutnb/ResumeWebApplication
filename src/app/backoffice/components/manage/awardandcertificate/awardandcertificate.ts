import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private sharedService: Shared, private cdr: ChangeDetectorRef) { }

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
          awardAndCertificate.filePreview = ''
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
      filePreview: '',
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

  onFileChange(event: any, item: AwardAndCertificateMe): void {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          item.filePreview = reader.result;
          this.cdr.markForCheck();
        };
        reader.readAsDataURL(file);
      }else {
        file.value = '';
        item.filePreview = '';
      }
    }
  }
  
  removePortfolioImage(item: AwardAndCertificateMe, index: number): void {
    const inputElement = document.getElementById(`awardFile${index}`) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = ''
    }
    item.filePreview = '';
    this.cdr.markForCheck();
  }

}

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Shared } from '../../../../sharedServiced/shared';
import { Subscription } from 'rxjs';
import { AwardAndCertificateMe } from '../../../../sharedServiced/bean-shared';
import { Backoffice } from '../../../service/backoffice';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-awardandcertificate',
  imports: [CommonModule, FormsModule],
  templateUrl: './awardandcertificate.html',
  styleUrl: './awardandcertificate.css'
})
export class Awardandcertificate implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  awardAndCertificateSection: AwardAndCertificateMe[] = [];

  constructor(private service: Backoffice, private sharedService: Shared, private cdr: ChangeDetectorRef) { }

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
        Object.assign(this.awardAndCertificateSection, data.awardAndCertificateList)
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
        console.log(`awardAndCertificateSection: ${JSON.stringify(this.awardAndCertificateSection)}`);
        this.cdr.detectChanges();
      }
    })
  }

  getResumeData(): void {
    this.resumeData = this.service.getResumeDataForBackofficAwardAndCertificatPage().subscribe({
      next: (data) => {
        Object.assign(this.awardAndCertificateSection, data.awardAndCertificateList)
      },
      error: (error) => {
        console.error('Error fetching resume-data[AwardAndCertificateMe]:', error)
      },
      complete: () => {
       this.awardAndCertificateSection.map((awardAndCertificate) => {
          awardAndCertificate.filePreview = ''
          if(awardAndCertificate.file=='') {
            awardAndCertificate.file = '../../../../assets/report-card.webp'
          }
        })
        console.log(`awardAndCertificateSection: ${JSON.stringify(this.awardAndCertificateSection)}`);
        this.cdr.detectChanges();
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

  updateAwardAndCertificate(): void {
    if(this.validateDataSection()) {
      this.service.updateAwardAndCertificatePage(this.awardAndCertificateSection).then(() => {
        
      }).catch((error) => {
        alert('Error updating awardAndCertificate, please try again later.');
        console.error('Error updating awardAndCertificate:', error);
      }).finally(() => {
        this.ngOnInit();
      });
    }
  }

  resetAwardAndCertificate(): void {
    this.ngOnInit();
  }

  validateDataSection(): boolean {
    if(this.awardAndCertificateSection.length == 0) {
      alert('At least one award and certificate entry is required.');
      return false;
    }
    for (const item of this.awardAndCertificateSection) {
      item.visible = item.visible ?? true;
      item.file = item.filePreview ? item.filePreview.toString() : item.file;
      if (item.name.trim() === '') {
        alert('Award/Certificate Name is required.');
        return false;
      }
      if (!item.name || !item.description || !item.file) {
        alert('All fields are required.');
        return false;
      }
      if (item.description.trim() === '') {
        alert('Description is required.');
        return false;
      }
    }

    return true;
  }

}

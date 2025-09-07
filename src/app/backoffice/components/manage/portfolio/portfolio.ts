import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Shared } from '../../../../sharedServiced/shared';
import { Subscription } from 'rxjs';
import { PortfolioMe, FolioInfo } from '../../../../sharedServiced/bean-shared';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Backoffice } from '../../../service/backoffice';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css'
})
export class Portfolio implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  portfolioSection: PortfolioMe[] = [];

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
        Object.assign(this.portfolioSection, data.portfolioList)
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        this.portfolioSection.map((port) => {
          if(port.imageUrl=='') {
            port.imageUrl = '../../../../assets/professional-portfolio.webp'
          }
          port.imagePreview = ''
          if (port.info) {
            if(port.info.imageUrl=='') {
              port.info.imageUrl = '../../../../assets/professional-portfolio.webp'
            }
            port.info.imagePreview = ''
          }
          return port
        })
        console.log(`portfolioSection: ${JSON.stringify(this.portfolioSection)}`);
        this.cdr.detectChanges();
      }
    })
  }

  getResumeData(): void {
    this.resumeData = this.service.getResumeDataForBackofficePortfolioPage().subscribe({
      next: (data) => {
        Object.assign(this.portfolioSection, data.portfolioList)
      },
      error: (error) => {
        console.error('Error fetching resume-data[Resume]:', error)
      },
      complete: () => {
        this.portfolioSection.map((port) => {
          if(port.imageUrl=='') {
            port.imageUrl = '../../../../assets/professional-portfolio.webp'
          }
          port.imagePreview = ''
          if (port.info) {
            if(port.info.imageUrl=='') {
              port.info.imageUrl = '../../../../assets/professional-portfolio.webp'
            }
            port.info.imagePreview = ''
          }
          return port
        })
        console.log(`portfolioSection: ${JSON.stringify(this.portfolioSection)}`);
        this.cdr.detectChanges();
      }
    })
  }

  addPortfolio(): void {
    var ids = this.portfolioSection.length + 1
    this.portfolioSection.push({
      id: ids,
      name: '',
      detail: '',
      imageUrl: '',
      imagePreview: '',
      info: {
        describtion: '',
        imageUrl: '',
        imagePreview: '',
        linkto: { name: '', url: '' }
      }
    });
    this.updatePortfolioIds()
  }

  removePortfolio(index: number): void {
    this.portfolioSection.splice(index, 1);
    this.updatePortfolioIds()
  }

  updatePortfolioIds() {
    this.portfolioSection?.forEach((port, idx) => {
      port.id = idx + 1;
    });
    this.cdr.detectChanges();
  }

  onFileChange(event: any, item: PortfolioMe | FolioInfo): void {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          item.imagePreview = reader.result;
          this.cdr.markForCheck();
        };
        reader.readAsDataURL(file);
      }else {
        file.value = '';
        item.imagePreview = '';
      }
    }
  }

  removePortfolioImage(item: PortfolioMe | FolioInfo, index: number): void {
    if ('name' in item && 'detail' in item) {
      const inputElement = document.getElementById(`portfolioImageUrl${index}`) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = ''
      }
    } else {
      const inputElement = document.getElementById(`infoImageUrl${index}`) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = ''
      }
    }
    item.imagePreview = '';

    this.cdr.markForCheck();
  }

}

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Shared } from '../../../../sharedServiced/shared';
import { Subscription } from 'rxjs';
import { PortfolioMe, FolioInfo } from '../../../../sharedServiced/bean-shared';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css'
})
export class Portfolio implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  portfolioSection: PortfolioMe[] = [];

  constructor(private sharedService: Shared, private cdr: ChangeDetectorRef) {

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
        this.portfolioSection = data.portfolioList
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
        console.log('portfolioSection', this.portfolioSection);
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

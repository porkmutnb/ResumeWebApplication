import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ResumeMe } from '../../../../sharedServiced/bean-shared';
import { Shared } from '../../../../sharedServiced/shared';

@Component({
  selector: 'app-resume',
  imports: [CommonModule, FormsModule],
  templateUrl: './resume.html',
  styleUrl: './resume.css'
})
export class Resume implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  resumeSection: ResumeMe[] = [];

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
        this.resumeSection = data.myResumeList
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        this.resumeSection.map(r => {
          r.newFile = ''
        })
        console.log('resumeSection', this.resumeSection)
      }
    })
  }

  addResume(): void {
    const newId = this.resumeSection.length > 0 ? Math.max(...this.resumeSection.map(r => r.id || 0)) + 1 : 1;
    this.resumeSection.push({
      id: newId,
      name: '',
      link: '',
      newFile: '',
      default: this.resumeSection.length === 0,
      visible: true
    });
    this.updateResumeIds();
  }

  removeResume(indexToRemove: number): void {
    const wasDefault = this.resumeSection[indexToRemove].default;
    this.resumeSection.splice(indexToRemove, 1);
    if (wasDefault && this.resumeSection.length > 0) {
      this.resumeSection[0].default = true;
    }
    this.updateResumeIds();
  }

  setDefaultResume(selectedIndex: number): void {
    this.resumeSection.forEach((resume, index) => {
      resume.default = (index === selectedIndex);
    });
  }

  updateResumeIds() {
    this.resumeSection.forEach((rme, idx) => {
      rme.id = idx + 1;
    });
  }

  onFileChange(event: any, item: ResumeMe, index: number): void {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('application/')) {
        const reader = new FileReader();
        reader.onload = () => {
          item.name = file.name
          item.newFile = reader.result;
          this.cdr.markForCheck()
        };
        reader.readAsDataURL(file);
      }else {
        file.value = '';
        const inputElement = document.getElementById(`resumeFile${index}`) as HTMLInputElement;
        if (inputElement) {
          inputElement.value = ''
        }
        item.newFile = '';
      }
      
    }
  }
    
  removePortfolioImage(item: ResumeMe, index: number): void {
    const inputElement = document.getElementById(`resumeFile${index}`) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = ''
    }
    item.name = this.getFileInfoFromUrl(item.link)
    item.newFile = '';
  }

  getFileInfoFromUrl(encodedUrl: string) {
    const decodedUrl = decodeURIComponent(encodedUrl);
    const url = new URL(decodedUrl);
    const pathname = url.pathname;
    const pathParts = pathname.split('/');
    const fileName = pathParts[pathParts.length - 1];
    return decodeURIComponent(fileName)
  }

}

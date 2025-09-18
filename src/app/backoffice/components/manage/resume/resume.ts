import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, forkJoin, of } from 'rxjs';
import { ResumeMe } from '../../../../sharedServiced/bean-shared';
import { Shared } from '../../../../sharedServiced/shared';
import { Backoffice } from '../../../service/backoffice';
import { environment } from '../../../../../environments/environment';
import { LoadingOverlay } from '../../../../sharedComponents/loading-overlay/loading-overlay';

@Component({
  selector: 'app-resume',
  imports: [CommonModule, FormsModule, LoadingOverlay],
  templateUrl: './resume.html',
  styleUrl: './resume.css'
})
export class Resume implements OnInit, OnDestroy {

  isPageLoading = false;

  private resumeData: Subscription | undefined
  resumeSection: ResumeMe[] = [];

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
    this.isPageLoading = true
    this.resumeData = this.sharedService.getDumpResumeData().subscribe({
      next: (data) => {
        this.isPageLoading = false
        Object.assign(this.resumeSection, data.myResumeList)
      },
      error: (error) => {
        console.error('Error fetching resume-data[Resume]:', error);
      },
      complete: () => {
        this.resumeSection.map(r => {
          r.newFile = ''
        })
        console.log(`resumeSection: ${JSON.stringify(this.resumeSection)}`);
        this.cdr.detectChanges();
      }
    })
  }

  getResumeData(): void {
    this.isPageLoading = true
    this.resumeData = this.service.getResumeDataForBackofficeResumePage().subscribe({
      next: (data) => {
        this.isPageLoading = false
        Object.assign(this.resumeSection, data.myResumeList)
      },
      error: (error) => {
        console.error('Error fetching resume-data[Resume]:', error)
      },
      complete: () => {
        this.resumeSection.map(r => {
          r.newFile = ''
        })
        console.log(`resumeSection: ${JSON.stringify(this.resumeSection)}`);
        this.cdr.detectChanges();
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

  updateResumeMe() {
    if (!this.validateDataSection()) {
      return;
    }
    this.isPageLoading = true;
    const uploadObservables = this.resumeSection.map((rme, index) => {
      if (rme.newFile) {
        // 1. ถ้ามีไฟล์เก่า ให้สร้าง Observable สำหรับลบไฟล์เก่า
        const deleteObservable = rme.link ? this.sharedService.deleteFile(rme.link) : of(null);

        // 2. อัปโหลดไฟล์ใหม่
        const filePath = `file_resume/${new Date().getTime()}_${rme.name}`;
        return new Promise((resolve, reject) => {
          (deleteObservable as import('rxjs').Observable<any>).subscribe({
            next: () => {
              this.sharedService.uploadFile(filePath, rme.newFile).subscribe({
                next: (downloadURL) => {
                  rme.link = downloadURL; // 3. อัปเดต link ด้วย URL ใหม่
                  rme.newFile = ''; // ล้างค่า newFile
                  resolve(true);
                },
                error: (err) => {
                  reject(err)
                }
              });
            },
            error: (err) => {
              reject(err)
            } // จัดการ error จากการลบ
          });
        });
      }
      return Promise.resolve(true); // ไม่มีไฟล์ให้อัปโหลด
    });

    Promise.all(uploadObservables).then(() => {
      // 4. หลังจากจัดการไฟล์ทั้งหมดแล้ว ให้บันทึกข้อมูลลง Database
      this.service.updateResumePage(this.resumeSection)
        .then(() => {
          
        })
        .catch(error => {
          alert('Error updating resume data, please try again later.');
          console.error('Error updating resume:', error);
        })
        .finally(() => {
          this.isPageLoading = false;
          this.ngOnInit();
        });
    }).catch(error => {
      this.isPageLoading = false;
      alert('Error during file processing, please try again later.');
      console.error('Error processing files:', error);
    });
  }

  resetResumeMe() {
    this.ngOnInit();
  }

  validateDataSection(): boolean {
    if(this.resumeSection.length == 0) {
      alert('Resume is required.');
      return false;
    }
    for(const [index, rme] of this.resumeSection.entries()) {
      rme.visible = rme.visible ?? true;
      rme.default = rme.default ?? false;
      if(rme.name == '') {
        alert(`Resume Name in entry ${index + 1} is required.`);
        return false;
      }           
      if(rme.link == '') {
        alert(`Resume Link in entry ${index + 1} is required.`);
        return false;
      }
    }
    return true;    
  }

}

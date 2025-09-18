import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileMe, ResumeMe } from '../../../sharedServiced/bean-shared';
import { Shared } from '../../../sharedServiced/shared';
import { Information } from '../../service/information';
import { environment } from '../../../../environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoadingOverlay } from '../../../sharedComponents/loading-overlay/loading-overlay';

@Component({
  selector: 'app-download',
  imports: [
    CommonModule,
    LoadingOverlay
  ],
  templateUrl: './download.html',
  styleUrl: './download.css'
})
export class Download implements OnInit, OnDestroy {

  isPageLoading = false;

  private resumeData: Subscription | undefined
  profileSection: ProfileMe = {
    firstName: '',
    lastName: '',
    nickName: '',
    introduce: '',
    profile: ''
  }
  resumeMeSection: ResumeMe[] = [];
  sortedResumeSection: ResumeMe[] = [];

  private platformId = inject(PLATFORM_ID);

  constructor(private service: Information, private sharedService: Shared, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {
      // Initialization logic can go here
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
    this.isPageLoading = true;
    this.resumeData = this.sharedService.getDumpResumeData().subscribe({
      next: (data) => {
        this.isPageLoading = false;
        Object.assign(this.profileSection, data.profile)
        this.resumeMeSection = data.myResumeList || [];
        this.sortResumeSection();
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        if(this.profileSection && this.profileSection.profile == '') {
          this.profileSection.profile = '../../../../assets/user.webp'
        }
      }
    })
  }

  getResumeData(): void {
    this.isPageLoading = true;
    this.resumeData = this.service.getResumeDataForInformationDownloadPage().subscribe({
      next: (data) => {
        this.isPageLoading = false;
        this.profileSection = {firstName: '', lastName: '', nickName: '', introduce: '', profile: ''}
        Object.assign(this.profileSection, data.profile)
        this.resumeMeSection = data.myResumeList || [];
        this.sortResumeSection();
      },
      error: (error) => {
        console.error('Error fetching resume-data[About]:', error)
      },
      complete: () => {
        if(this.profileSection && this.profileSection.profile == '') {
          this.profileSection.profile = '../../../../assets/user.webp'
        }
        this.cdr.detectChanges();
        console.log('sortedResumeSection:', this.sortedResumeSection);
        
        
      }
    })
  }

  private sortResumeSection(): void {
    this.sortedResumeSection = [...this.resumeMeSection].sort((a, b) => (b.default ? 1 : 0) - (a.default ? 1 : 0));
  }

  getSafePdfUrl(base64OrUrl: string): SafeUrl | string {
    // Always check if it's a regular URL first.
    if (base64OrUrl.startsWith('http')) {
      return this.sanitizer.bypassSecurityTrustUrl(base64OrUrl);
    }

    // For Base64 strings, consistently use a Data URI on both server and client
    // to avoid hydration mismatch issues.
    const dataUri = `data:application/pdf;base64,${base64OrUrl}`;

    // On the browser, we still need to sanitize it.
    if (isPlatformBrowser(this.platformId)) {
      return this.sanitizer.bypassSecurityTrustUrl(dataUri);
    }

    // On the server, we can return the string directly.
    return dataUri;
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AboutMe, ProfileMe } from '../../../sharedServiced/bean-shared';
import { Shared } from '../../../sharedServiced/shared';
import { Information } from '../../service/information';
import { environment } from '../../../../environments/environment';
import { LoadingOverlay } from '../../../sharedComponents/loading-overlay/loading-overlay';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule,
    LoadingOverlay
  ],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit, OnDestroy {

  isPageLoading = false;

  private resumeData: Subscription | undefined
  profileSection: ProfileMe= {
    firstName: '',
    lastName: '',
    nickName: '',
    introduce: '',
    profile: ''
  }
  aboutSection: AboutMe = {
    celebrityFavoriteList: [],
    description: '',
    hobbies: []
  }

  constructor(private service: Information, private sharedService: Shared, private cdr: ChangeDetectorRef) {
      
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
        Object.assign(this.aboutSection, data.about)
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
    this.resumeData = this.service.getResumeDataForInformationAboutPage().subscribe({
      next: (data) => {
        this.isPageLoading = false;
        this.profileSection = {firstName: '', lastName: '', nickName: '', introduce: '', profile: ''}
        Object.assign(this.profileSection, data.profile)
        this.aboutSection = {celebrityFavoriteList: [], description: '', hobbies: []}
        Object.assign(this.aboutSection, data.about)
      },
      error: (error) => {
        console.error('Error fetching resume-data[About]:', error)
      },
      complete: () => {
        if(this.profileSection && this.profileSection.profile == '') {
          this.profileSection.profile = '../../../../assets/user.webp'
        }
        this.cdr.detectChanges();
      }
    })
  }

}

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactMe, ProfileMe } from '../../../sharedServiced/bean-shared';
import { Shared } from '../../../sharedServiced/shared';
import { Information } from '../../service/information';
import { environment } from '../../../../environments/environment';
import { LoadingOverlay } from '../../../sharedComponents/loading-overlay/loading-overlay';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    LoadingOverlay
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit, OnDestroy {

  isPageLoading = false;

  private resumeData: Subscription | undefined
  profileSection: ProfileMe= {
    firstName: '',
    lastName: '',
    nickName: '',
    introduce: '',
    profile: ''
  }
  contactSection: ContactMe = {
    email: '',
    phone: '',
    socialMediaList: []
  }
  constructor(private service: Information, private sharedService: Shared, private cdr: ChangeDetectorRef) {
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
        Object.assign(this.contactSection, data.contact)
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
    this.resumeData = this.service.getResumeDataForInformationContactPage().subscribe({
      next: (data) => {
        this.isPageLoading = false;
        this.profileSection = {firstName: '', lastName: '', nickName: '', introduce: '', profile: ''}
        Object.assign(this.profileSection, data.profile)
        this.contactSection = {email: '', phone: '', socialMediaList: []}
        Object.assign(this.contactSection, data.contact)
      },
      error: (error) => {
        console.error('Error fetching resume-data[Contact]:', error)
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

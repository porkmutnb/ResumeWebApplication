import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileMe, ResumeMe } from '../../../sharedServiced/bean-shared';
import { Shared } from '../../../sharedServiced/shared';
import { Information } from '../../service/information';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-download',
  imports: [
    CommonModule
  ],
  templateUrl: './download.html',
  styleUrl: './download.css'
})
export class Download implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  profileSection: ProfileMe = {
    firstName: '',
    lastName: '',
    nickName: '',
    introduce: '',
    profile: ''
  }
  resumeMeSection: ResumeMe[] = [];

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
    this.resumeData = this.sharedService.getDumpResumeData().subscribe({
      next: (data) => {
        Object.assign(this.profileSection, data.profile)
        Object.assign(this.resumeMeSection, data.myResumeList)
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
    this.resumeData = this.service.getResumeDataForInformationDownloadPage().subscribe({
      next: (data) => {
        this.profileSection = {firstName: '', lastName: '', nickName: '', introduce: '', profile: ''}
        Object.assign(this.profileSection, data.profile)
        this.resumeMeSection = []
        Object.assign(this.resumeMeSection, data.myResumeList)
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

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileMe, ResumeMe } from '../../../sharedServiced/bean-shared';
import { Shared } from '../../../sharedServiced/shared';

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
  profileSection: ProfileMe | undefined;
  resumeMeSection: ResumeMe[] = [];

  constructor(private sharedService: Shared) {
      // Initialization logic can go here
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
          this.profileSection = data.profile
          this.resumeMeSection = data.myResumeList
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

}

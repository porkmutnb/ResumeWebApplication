import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileMe, ResumeMe } from '../../service/bean-shared';
import { Information } from '../../service/information';

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

  constructor(private informationService: Information) {
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
      this.resumeData = this.informationService.getDumpResumeData().subscribe({
        next: (data) => {
          this.profileSection = data.profile
          this.resumeMeSection = data.myResumeList
        },
        error: (error) => {
          console.error('Error fetching resume data:', error);
        },
        complete: () => {
          console.log('this.resumeMeSection', this.resumeMeSection)
        }
      })
    }

}

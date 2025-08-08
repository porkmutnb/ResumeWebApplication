import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AboutMe, ProfileMe } from '../../service/bean-shared';
import { Information } from '../../service/information';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule
  ],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  profileSection: ProfileMe | undefined;
  aboutSection: AboutMe | undefined;

  constructor(private informationService: Information) {
      
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
        this.aboutSection = data.about
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        console.log('this.aboutSection', this.aboutSection)
      }
    })
  }

}

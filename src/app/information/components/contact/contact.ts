import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactMe, ProfileMe } from '../../service/bean-shared';
import { Information } from '../../service/information';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit, OnDestroy {

  private resumeData: Subscription | undefined
  profileSection: ProfileMe | undefined;
  contactSection: ContactMe | undefined;

  constructor(private informationService: Information) {
    // Initialization logic can go here
  }

  ngOnInit(): void {
    this.getDumpResumeData()
  }

  ngOnDestroy(): void {
    if(this.resumeData) {
      this.resumeData.unsubscribe
    }
  }

  getDumpResumeData(): void {
    this.resumeData = this.informationService.getDumpResumeData().subscribe({
      next: (data) => {
        this.profileSection = data.profile
        this.contactSection = data.contact
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        console.log('this.contactSection', this.contactSection)
      }
    })
  }

}

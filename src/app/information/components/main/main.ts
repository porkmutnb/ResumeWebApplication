import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Information } from '../../service/information';
import { ProfileMe } from '../../service/bean-shared';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit, OnDestroy {

  isMobileMenuOpen: Boolean = false;
  private resumeData: Subscription | undefined
  profileSection: ProfileMe | undefined;

  constructor(private informationService: Information) {
    
  }

  ngOnInit() {
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
        if(this.profileSection.profile=='') {
          this.profileSection.profile = '../../../../assets/user.webp'
        }
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
      },
      complete: () => {
        console.log('this.profileSection', this.profileSection)
      }
    })
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

}

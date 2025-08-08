import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Shared } from '../../../sharedServiced/shared';
import { ProfileMe } from '../../../sharedServiced/bean-shared';
import { ScrollTop } from "../../../sharedComponents/scroll-top/scroll-top";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ScrollTop
],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit, OnDestroy {

  isMobileMenuOpen: Boolean = false;
  private resumeData: Subscription | undefined
  profileSection: ProfileMe | undefined;

  constructor(private sharedService: Shared) {
    
  }

  ngOnInit() {
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

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

}

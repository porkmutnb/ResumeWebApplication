import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Shared } from '../../../sharedServiced/shared';
import { ProfileMe } from '../../../sharedServiced/bean-shared';
import { ScrollTop } from "../../../sharedComponents/scroll-top/scroll-top";
import { Information } from '../../service/information';
import { environment } from '../../../../environments/environment';

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
  profileSection: ProfileMe = {
    firstName: '',
    lastName: '',
    nickName: '',
    introduce: '',
    profile: ''
  }

  constructor(private service: Information, private sharedService: Shared, private cdr: ChangeDetectorRef, public router: Router) {
    
  }

  ngOnInit() {
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
      },
      error: (error) => {
        console.error('Error fetching resume-data[Main]:', error)
      },
      complete: () => {
        if(this.profileSection && this.profileSection.profile == '') {
          this.profileSection.profile = '../../../../assets/user.webp'
        }
      }
    })
  }

  getResumeData(): void {
    this.resumeData = this.service.getResumeDataForInformationMainPage().subscribe({
      next: (data) => {
        this.profileSection = {firstName:'',lastName:'',nickName:'',introduce:'',profile:''}
        Object.assign(this.profileSection, data.profile)
      },
      error: (error) => {
        console.error('Error fetching resume-data[Main]:', error)
      },
      complete: () => {
        if(this.profileSection?.profile == '' || this.profileSection?.profile == undefined) {
          this.profileSection!.profile = '../../../../assets/user.webp'
        }
        this.cdr.detectChanges();
      }
    })
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

}

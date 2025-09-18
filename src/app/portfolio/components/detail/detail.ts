import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioMe, ProfileMe } from '../../../sharedServiced/bean-shared';
import { Subscription } from 'rxjs';
import { Portfolio } from '../../service/portfolio';
import { Shared } from '../../../sharedServiced/shared';
import { environment } from '../../../../environments/environment';
import { LoadingOverlay } from '../../../sharedComponents/loading-overlay/loading-overlay';

@Component({
  selector: 'app-detail',
  imports: [LoadingOverlay],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class Detail implements OnInit, OnDestroy {

  isPageLoading = false;

  id: number | null = null
  private resumeData: Subscription | undefined
  portfolioSection: PortfolioMe | undefined;
  profileSection: ProfileMe = {
    firstName: '',
    lastName: '',
    nickName: '',
    introduce: '',
    profile: ''
  }

  constructor(private activeRoute: ActivatedRoute, private router: Router, private service: Portfolio, private sharedService: Shared, private cdr: ChangeDetectorRef) {
    // Initialization logic can go here
  }

  ngOnInit(): void {
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    if(this.id==null || isNaN(this.id) || this.id<=0) {
      this.router.navigate(['/portfolio/info']);
    }
    environment.production ? this.getResumeData(this.id) : this.getDumpResumeData(this.id);
  }
  
  ngOnDestroy(): void {
    if(this.resumeData) {
      this.resumeData.unsubscribe()
    }
  }

  getDumpResumeData(id: number): void {
    this.isPageLoading = true;
    this.sharedService.getDumpPortfolioById(id).subscribe({
      next: (data) => {
        this.isPageLoading = false;
        Object.assign(this.profileSection, data.profile)
        this.portfolioSection = {id: 0, name: '', detail: '', imageUrl: '', info: {describtion: '', imageUrl: '', linkto: {name: '', url: ''}}};
        Object.assign(this.portfolioSection, data.portfolioList)
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
        this.router.navigate(['/portfolio/info']);
      },
      complete: () => {
        if(this.profileSection && this.profileSection.profile == '') {
          this.profileSection.profile = '../../../../assets/user.webp'
        }
        if(this.portfolioSection?.imageUrl=='') {
          this.portfolioSection.imagePreview = ''
          this.portfolioSection.imageUrl = '../../../assets/professional-portfolio.webp'
        }
        if(this.portfolioSection?.info) {
          this.portfolioSection.info.imagePreview = ''
          if(this.portfolioSection.info.imageUrl=='') {
            this.portfolioSection.info.imageUrl = '../../../assets/professional-portfolio.webp'
          }
        }
        this.cdr.detectChanges();
      }
    });
  }

  getResumeData(id: number): void {
    this.isPageLoading = true;
    this.resumeData = this.service.getResumeDataForPortfolioDetailPage(id).subscribe({
      next: (data) => {
        this.isPageLoading = false;
        Object.assign(this.profileSection, data.profile)
        this.portfolioSection = {id: 0, name: '', detail: '', imageUrl: '', info: {describtion: '', imageUrl: '', linkto: {name: '', url: ''}}};
        Object.assign(this.portfolioSection, data.portfolioList)
      },
      error: (error) => {
        console.error('Error fetching resume-data[PortfolioDetail]:', error);
        this.router.navigate(['/portfolio/info']);
      },
      complete: () => {
        if(this.profileSection && this.profileSection.profile == '') {
          this.profileSection.profile = '../../../../assets/user.webp'
        }
        if(this.portfolioSection?.imageUrl=='') {
          this.portfolioSection.imagePreview = ''
          this.portfolioSection.imageUrl = '../../../assets/professional-portfolio.webp'
        }
        if(this.portfolioSection?.info) {
          this.portfolioSection.info.imagePreview = ''
          if(this.portfolioSection.info.imageUrl=='') {
            this.portfolioSection.info.imageUrl = '../../../assets/professional-portfolio.webp'
          }
        }
        this.cdr.detectChanges();
      }
    })
  }
  
}

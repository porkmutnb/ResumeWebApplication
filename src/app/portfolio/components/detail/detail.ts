import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioMe, ProfileMe } from '../../../sharedServiced/bean-shared';
import { Subscription } from 'rxjs';
import { Portfolio } from '../../service/portfolio';
import { Shared } from '../../../sharedServiced/shared';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class Detail implements OnInit, OnDestroy {

  id: number | null = null
  private portfolioData: Subscription | undefined
  private profileData: Subscription | undefined
  portfolioSection: PortfolioMe | undefined;
  profileSection: ProfileMe | undefined;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private portfolioService: Portfolio, private sharedService: Shared) {
    // Initialization logic can go here
  }

  ngOnInit(): void {
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    if(this.id==null || this.id<1) {
      this.router.navigate(['/portfolio/info']);
    }
    this.getDumpPortfolioItem(this.id);
    this.getDumpProfileData();
  }
  
  ngOnDestroy(): void {
    if(this.portfolioData) {
      this.portfolioData.unsubscribe()
    }
    if(this.profileData) {
      this.profileData.unsubscribe()
    }
  }

  getDumpProfileData(): void {
    this.sharedService.getDumpResumeData().subscribe({
      next: (data) => {
        this.profileSection = data.profile
      },
      error: (error) => {
        console.error('Error fetching resume data:', error);
        this.router.navigate(['/portfolio/info']);
      },
      complete: () => {
        if(this.profileSection && this.profileSection.profile == '') {
          this.profileSection.profile = '../../../../assets/user.webp'
        }
      }
    })
  }

  getDumpPortfolioItem(id: number): void {
    this.portfolioService.dumpGetInfoById(id).then((data) => {
      if(data.imageUrl=='') {
        data.imageUrl = '../../../assets/professional-portfolio.webp'
      }
      if(data.info) {
        if(data.info.imageUrl=='') {
          data.info.imageUrl = '../../../assets/professional-portfolio.webp'
        }
      }
      this.portfolioSection = data;
    }).catch((error) => {
      console.error('Error fetching portfolio item:', error);
      this.router.navigate(['/portfolio/info']);
    });
  }
  
}

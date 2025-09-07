import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../service/auth';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ScrollTop } from '../../../sharedComponents/scroll-top/scroll-top';

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ScrollTop],
  templateUrl: './main.html',
  styleUrl: './main.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Main implements OnInit, OnDestroy {

  isMobileMenuOpen: Boolean = false;
  isManageMenuOpen: Boolean = false;

  constructor(private authService: Auth, private router: Router) {
    
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  toggleManageMenu(): void {
    this.isManageMenuOpen = !this.isManageMenuOpen;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/backoffice/login']);
  }

}

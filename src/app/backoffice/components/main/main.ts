import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../service/auth';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit, OnDestroy {

  isMobileMenuOpen: Boolean = false;

  constructor(private authService: Auth, private router: Router) {
    
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  onLogout(): void {
    console.log('Logging out...');
    
    this.authService.logout();
    this.router.navigate(['/backoffice/login']);
  }

}

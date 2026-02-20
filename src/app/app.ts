import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

import { ThemeToggle } from './sharedComponents/theme-toggle/theme-toggle';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, ThemeToggle],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'ResumeWebApplication';

  ngOnInit(): void {
    console.log(
      `ResumeWebApplication initialized on ${environment.production ? 'production' : 'development'} mode.`,
    );
  }
}

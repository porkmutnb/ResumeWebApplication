import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme } from '../../sharedServiced/theme';

@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
})
export class ThemeToggle {
  constructor(private themeService: Theme) {}

  get isDark(): boolean {
    return this.themeService.getIsDarkMode();
  }

  toggle(): void {
    this.themeService.toggleTheme();
  }
}

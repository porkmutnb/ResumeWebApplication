import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  constructor() {
    
  }

  ngOnInit(): void {
    // Initialization logic can go here
  }

  ngOnDestroy(): void {
    // Cleanup logic can go here
  }

}

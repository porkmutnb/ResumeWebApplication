import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage',
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './manage.html',
  styleUrl: './manage.css'
})
export class Manage implements OnInit, OnDestroy {

  constructor() {

  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

}

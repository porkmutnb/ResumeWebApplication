import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule
  ],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {
  
  ngOnInit(): void {
    
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      'email': new FormControl([Validators.required, Validators.email]),
      'password': new FormControl(Validators.required)
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    this.router.navigate(['/backoffice']);
  } 

}

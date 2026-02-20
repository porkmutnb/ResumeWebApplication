import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../service/auth';
import { LoadingOverlay } from '../../../sharedComponents/loading-overlay/loading-overlay';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, LoadingOverlay],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  isPageLoading = false;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: Auth,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {
    if (!environment.production) {
      this.loginForm.patchValue({
        email: 'admin@admin.com',
        password: 'admin123',
      });
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isPageLoading = true;
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService
        .login(email, password)
        .then(() => {
          this.router.navigate(['/backoffice']);
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          this.isPageLoading = false;
        });
    } else {
      alert('Please fill the form correctly');
    }
  }
}

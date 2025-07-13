import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const loginData = this.loginForm.value;

    this.http
      .post<any>('http://localhost:8080/api/auth/login', loginData)
      .subscribe({
        next: (res) => {
          const { token, user } = res;

          // ✅ Save token and user to localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          // ✅ Call AuthService to store user state (if needed)
          this.authService.login(token, user);

          // ✅ Navigate to dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage =
            err.error?.message || 'Login failed. Please try again.';
        },
      });
  }
}

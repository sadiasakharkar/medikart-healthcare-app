import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../core/api.service'; // ✅ Adjust path

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupComponent {
  signupData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  };

  currentYear: number = new Date().getFullYear();

  constructor(private router: Router, private api: ApiService) {}

  onSubmit() {
    if (this.signupData.password !== this.signupData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!this.signupData.agreeTerms) {
      alert('Please accept the terms and privacy policy');
      return;
    }

    // ✅ Create valid payload for backend
    const payload = {
      fullName: this.signupData.fullName,
      email: this.signupData.email,
      password: this.signupData.password,
    };

    this.api.register(payload).subscribe({
      next: (res: any) => {
        console.log('✅ Signup successful:', res);
        alert('Account created!');
        this.router.navigate(['/dashboard/overview']);
      },
      error: (err: any) => {
        console.error('❌ Signup failed:', err);
        console.log('🔍 Full error object:', err);

        const backendMsg =
          err.error?.message ||
          (typeof err.error === 'string'
            ? err.error
            : JSON.stringify(err.error)) ||
          'Unknown backend error';

        alert('❌ Registration failed: ' + backendMsg);
      },
    });
  }
}

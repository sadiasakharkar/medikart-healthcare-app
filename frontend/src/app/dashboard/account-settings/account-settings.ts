import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service'; // ✅ Make sure path is correct
import { Router } from '@angular/router';

type NotificationType = 'email' | 'sms';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-settings.html',
  styleUrls: ['./account-settings.scss'],
})
export class AccountSettingsComponent implements OnInit {
  currentYear = new Date().getFullYear();
  user: any = null;

  // Edit modes
  editPersonal = false;
  editSecurity = false;

  // Notification preferences
  notificationPrefs: Record<NotificationType, boolean> = {
    email: true,
    sms: false,
  };

  updatedUser = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.user = JSON.parse(stored);
      this.updatedUser = {
        fullName: this.user.fullName,
        email: this.user.email,
        phone: this.user.phone || '',
        password: '',
        confirmPassword: '',
      };
    }
  }

  // 🔧 PERSONAL INFO
  enablePersonalEdit() {
    this.editPersonal = true;
  }

  savePersonalInfo() {
    const payload = {
      fullName: this.updatedUser.fullName,
      email: this.updatedUser.email,
      phone: this.updatedUser.phone,
    };

    this.api.updateUser(payload).subscribe({
      next: (res) => {
        this.user = { ...this.user, ...payload };
        localStorage.setItem('user', JSON.stringify(this.user));
        this.editPersonal = false;
        alert('✅ Profile updated!');
      },
      error: (err) => {
        console.error(err);
        alert('❌ Failed to update profile.');
      },
    });
  }

  cancelPersonalEdit() {
    this.updatedUser.fullName = this.user.fullName;
    this.updatedUser.email = this.user.email;
    this.updatedUser.phone = this.user.phone || '';
    this.editPersonal = false;
  }

  // 🔐 SECURITY
  enableSecurityEdit() {
    this.editSecurity = true;
  }

  savePassword() {
    if (this.updatedUser.password !== this.updatedUser.confirmPassword) {
      alert('❌ Passwords do not match.');
      return;
    }

    const payload = {
      email: this.user.email,
      newPassword: this.updatedUser.password,
    };

    this.api.changePassword(payload).subscribe({
      next: (res) => {
        alert('✅ Password updated!');
        this.updatedUser.password = '';
        this.updatedUser.confirmPassword = '';
        this.editSecurity = false;
      },
      error: (err) => {
        console.error(err);
        alert('❌ Failed to update password.');
      },
    });
  }

  cancelSecurityEdit() {
    this.updatedUser.password = '';
    this.updatedUser.confirmPassword = '';
    this.editSecurity = false;
  }

  // 🔔 NOTIFICATION
  togglePreference(type: NotificationType) {
    this.notificationPrefs[type] = !this.notificationPrefs[type];
  }

  // 🚪 ACCOUNT ACTIONS
  logout() {
    localStorage.removeItem('user');
    alert('You’ve been logged out.');
    this.router.navigate(['/auth/login']);
  }

  deleteAccount() {
    alert('🚨 Account deletion is not implemented yet.');
  }
}

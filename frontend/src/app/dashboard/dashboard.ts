import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'], // ✅ fix: styleUrl → styleUrls
})
export class Dashboard implements OnInit {
  user: any = null; // 🟢 This will store the logged-in user's data

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser); // 🧠 Convert string → object
    }
  }
}

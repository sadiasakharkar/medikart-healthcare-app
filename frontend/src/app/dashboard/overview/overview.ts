import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OverviewService } from './overview.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss'],
})
export class MainContentComponent implements OnInit {
  user: { id?: number; fullName?: string; username?: string } = {};

  totalOrders = 0;
  activePrescriptions = 0;
  totalSavings = 0;
  rewardPoints = 0;

  summaryCards = [
    { title: 'Total Orders', value: 0, prefix: '' },
    { title: 'Active Prescriptions', value: 0, prefix: '' },
    { title: 'Amount Saved', value: 0, prefix: '₹' },
    { title: 'Reward Points', value: 0, prefix: '' },
  ];

  reminders: string[] = [];

  recommendedProducts = [
    {
      id: 101,
      name: 'Vitamin D3 Tablets',
      price: 120,
      img: 'https://m.media-amazon.com/images/I/7188lKFdETL.jpg',
    },
    {
      id: 102,
      name: 'Omega-3 Capsules',
      price: 250,
      img: 'https://assets.truemeds.in/Images/ProductImage/TM-CACR1-013223/ultra-omega-3-capsule-10_ultra-omega-3-capsule-10--TM-CACR1-013223_1.png',
    },
    {
      id: 103,
      name: 'Blood Glucose Strips',
      price: 300,
      img: 'https://www.romsons.in/cdn/shop/products/DSC07860_1080x.jpg?v=1746790643',
    },
  ];

  constructor(
    private overviewService: OverviewService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    this.loadReminders();
    this.loadStats();
  }

  loadStats(): void {
    this.overviewService.getOrderCount().subscribe({
      next: (res) => {
        this.totalOrders = res.count;
        this.updateCardValue('Total Orders', res.count);
      },
      error: (err: any) => console.error('Order count error', err),
    });

    this.overviewService.getActivePrescriptions().subscribe({
      next: (res) => {
        this.activePrescriptions = res.count;
        this.updateCardValue('Active Prescriptions', res.count);
      },
      error: (err: any) => console.error('Prescription error', err),
    });

    this.overviewService.getSavings().subscribe({
      next: (res) => {
        this.totalSavings = res.amount;
        this.updateCardValue('Amount Saved', res.amount);
      },
      error: (err: any) => console.error('Savings error', err),
    });

    this.overviewService.getRewardPoints().subscribe({
      next: (res) => {
        this.rewardPoints = res.points;
        this.updateCardValue('Reward Points', res.points);
      },
      error: (err: any) => console.error('Reward error', err),
    });
  }

  updateCardValue(title: string, value: number): void {
    const card = this.summaryCards.find((c) => c.title === title);
    if (card) {
      card.value = value;
    }
  }

  loadReminders(): void {
    const stored = localStorage.getItem('healthReminders');
    if (stored) {
      this.reminders = JSON.parse(stored);
    } else {
      this.reminders = [
        '9:00 AM: Take Vitamin D3',
        'In 3 Days: Blood Pressure Medication',
        'Jan 15: Doctor’s Appointment',
      ];
      this.saveReminders();
    }
  }

  saveReminders(): void {
    localStorage.setItem('healthReminders', JSON.stringify(this.reminders));
  }

  addReminder(value: string): void {
    const trimmed = value.trim();
    if (trimmed) {
      this.reminders.push(trimmed);
      this.saveReminders();
    }
  }

  deleteReminder(index: number): void {
    this.reminders.splice(index, 1);
    this.saveReminders();
  }

  addToCart(product: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.id;

    if (!userId) {
      alert('❌ Please login first');
      return;
    }

    const cartItem: CartItem = {
      userId: userId,
      productId: product.id,
      quantity: 1,
      productName: product.name,
      price: product.discounted, // or product.price depending on your naming
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: () => {
        alert('✅ Product added to cart!');
      },
      error: (err) => {
        console.error('Add to cart failed', err);
        alert('❌ Could not add to cart');
      },
    });
  }
}

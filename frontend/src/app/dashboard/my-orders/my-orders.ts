import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.html',
  styleUrls: ['./my-orders.scss'],
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Dummy orders
    this.orders = [
      {
        id: 'MK001234',
        status: 'Delivered',
        items: [
          { productId: 1, name: 'Paracetamol 500mg', qty: 2, price: 30 },
          { productId: 2, name: 'Vitamin C Tablets', qty: 1, price: 120 },
        ],
      },
      {
        id: 'MK001235',
        status: 'Processing',
        items: [{ productId: 3, name: 'Omega-3 Capsules', qty: 1, price: 250 }],
      },
    ];
  }

  reorder(items: any[]) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) {
      alert('User not logged in');
      return;
    }

    for (let item of items) {
      const cartItem = {
        userId: user.id,
        productId: item.productId,
        productName: item.name, // ✅ added
        price: item.price, // ✅ added
        quantity: item.qty,
      };

      this.cartService.addToCart(cartItem).subscribe({
        next: () => console.log(`✅ Reordered: ${item.name}`),
        error: (err) => console.error('❌ Error:', err),
      });
    }

    alert('🛒 All items reordered to cart!');
  }

  // ✅ This will fix the NG error in the template
  getOrderTotal(items: any[]): number {
    return items.reduce((total, item) => total + item.price * item.qty, 0);
  }
}

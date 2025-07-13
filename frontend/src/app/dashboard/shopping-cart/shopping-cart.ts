import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shopping-cart.html',
  styleUrls: ['./shopping-cart.scss'],
})
export class ShoppingCartComponent implements OnInit {
  showCheckout = false;
  couponCode = '';
  cartItems: CartItem[] = [];
  userId!: number;

  deliveryCharge = 0;
  discount = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.userId = user.id;
      this.loadCart();
    } else {
      alert('User not logged in ❌');
      this.router.navigate(['/auth/login']);
    }
  }

  loadCart() {
    this.cartService.getCart(this.userId).subscribe((items) => {
      this.cartItems = items;
      this.updateDiscount();
    });
  }

  // Other cart logic (unchanged)
  get subtotal() {
    return this.cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0
    );
  }

  get tax() {
    return this.subtotal * 0.05;
  }

  get total() {
    return this.subtotal - this.discount + this.deliveryCharge + this.tax;
  }

  increaseQty(i: number) {
    this.cartItems[i].quantity++;
    this.updateDiscount();
  }

  decreaseQty(i: number) {
    if (this.cartItems[i].quantity > 1) {
      this.cartItems[i].quantity--;
      this.updateDiscount();
    }
  }

  removeItem(i: number) {
    this.cartItems.splice(i, 1);
    this.updateDiscount();
  }

  clearCart() {
    this.cartItems = [];
    this.updateDiscount();
  }

  updateCart() {
    alert('Cart updated!');
  }

  applyCoupon() {
    if (this.couponCode.trim().toLowerCase() === 'save60') {
      this.discount = 60;
      alert('Coupon applied ✅');
    } else {
      this.discount = 0;
      alert('Invalid coupon ❌');
    }
  }

  updateDiscount() {
    if (this.cartItems.length >= 3) {
      this.discount = 50;
    } else {
      this.discount = 20;
    }
  }

  proceedToPayment() {
    this.router.navigate(['/dashboard/payment-method']);
  }
}

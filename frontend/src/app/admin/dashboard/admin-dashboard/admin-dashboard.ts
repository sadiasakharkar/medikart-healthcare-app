import { Component } from '@angular/core';

interface InventoryItem {
  id: number;
  productName: string;
  category: string;
  stock: number;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface Order {
  orderId: string;
  user: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Cancelled';
}

interface ReturnItem {
  returnId: string;
  product: string;
  user: string;
  reason: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss'],
})
export class AdminDashboardComponent {
  currentYear: number = new Date().getFullYear();

  inventory: InventoryItem[] = [
    {
      id: 1,
      productName: 'Paracetamol 500mg',
      category: 'Medicine',
      stock: 40,
      price: 30,
      status: 'In Stock',
    },
    {
      id: 2,
      productName: 'Blood Pressure Monitor',
      category: 'Equipment',
      stock: 5,
      price: 1250,
      status: 'Low Stock',
    },
  ];

  orders: Order[] = [
    {
      orderId: '#MK001234',
      user: 'Sadia Sakharkar',
      date: '2025-07-09',
      total: 180,
      status: 'Delivered',
    },
    {
      orderId: '#MK001235',
      user: 'Aman Verma',
      date: '2025-07-09',
      total: 1250,
      status: 'Processing',
    },
  ];

  returns: ReturnItem[] = [
    {
      returnId: 'RT001',
      product: 'Glucometer',
      user: 'Riya Mehta',
      reason: 'Faulty device',
    },
    {
      returnId: 'RT002',
      product: 'Thermometer',
      user: 'Aditya Joshi',
      reason: 'Broken glass',
    },
  ];

  // Getter for low stock count to avoid complex logic in template
  get lowStockCount(): number {
    return this.inventory.filter((item) => item.status === 'Low Stock').length;
  }

  // Button handlers
  editInventoryItem(id: number) {
    alert(`Edit clicked for product ID: ${id}`);
  }

  deleteInventoryItem(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.inventory = this.inventory.filter((item) => item.id !== id);
    }
  }

  viewOrderDetails(orderId: string) {
    alert(`View details clicked for Order ID: ${orderId}`);
  }

  processReturn(returnId: string) {
    alert(`Processing return ID: ${returnId}`);
  }
}

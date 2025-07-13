import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.html',
  styleUrls: ['./orders.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, CurrencyPipe],
})
export class OrdersComponent implements OnInit {
  filterForm!: FormGroup;

  statuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

  orders = [
    {
      id: 'ORD001',
      customer: 'Rohit Sharma',
      date: new Date('2025-07-08'),
      total: 1999,
      status: 'Pending',
    },
    {
      id: 'ORD002',
      customer: 'Priya Verma',
      date: new Date('2025-07-06'),
      total: 845,
      status: 'Shipped',
    },
    {
      id: 'ORD003',
      customer: 'Kiran Desai',
      date: new Date('2025-07-05'),
      total: 320,
      status: 'Delivered',
    },
    {
      id: 'ORD004',
      customer: 'Amit Jain',
      date: new Date('2025-07-03'),
      total: 1650,
      status: 'Cancelled',
    },
  ];

  filteredOrdersList = this.orders;

  ngOnInit() {
    this.filterForm = new FormGroup({
      searchTerm: new FormControl(''),
      selectedStatus: new FormControl(''),
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters() {
    const { searchTerm, selectedStatus } = this.filterForm.value;

    this.filteredOrdersList = this.orders.filter((order) => {
      const matchesSearch =
        !searchTerm ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = !selectedStatus || order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }
}

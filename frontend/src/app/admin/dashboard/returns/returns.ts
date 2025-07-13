import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './returns.html',
  styleUrls: ['./returns.scss'],
})
export class ReturnsComponent implements OnInit {
  returnForm!: FormGroup;

  returnRequests = [
    {
      returnId: 'R001',
      orderId: 'O123',
      customer: 'Sadia Sakharkar',
      product: 'Aspirin 500mg',
      reason: 'Wrong item delivered',
      status: 'Pending',
    },
    {
      returnId: 'R002',
      orderId: 'O124',
      customer: 'John Doe',
      product: 'Vitamin C',
      reason: 'Damaged item',
      status: 'Approved',
    },
    {
      returnId: 'R003',
      orderId: 'O125',
      customer: 'Jane Smith',
      product: 'Paracetamol',
      reason: 'Late delivery',
      status: 'Rejected',
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.returnForm = this.fb.group({
      search: [''],
      status: [''],
    });
  }

  get filteredReturns() {
    const search = this.returnForm.get('search')?.value?.toLowerCase() || '';
    const status = this.returnForm.get('status')?.value;

    return this.returnRequests.filter((r) => {
      const matchesSearch =
        r.orderId.toLowerCase().includes(search) ||
        r.customer.toLowerCase().includes(search);
      const matchesStatus = status ? r.status === status : true;
      return matchesSearch && matchesStatus;
    });
  }

  approve(item: any) {
    item.status = 'Approved';
  }

  reject(item: any) {
    item.status = 'Rejected';
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../../services/admin-product.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.scss'],
})
export class InventoryComponent implements OnInit {
  productForm!: FormGroup;
  showAddForm = false;
  filteredItems: any[] = [];
  allItems: any[] = [];

  searchTerm = '';
  selectedCategory = '';
  selectedStatus = '';

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [''],
      category: [''],
      quantity: [0],
      price: [0],
      status: [''],
      expiry: [''],
      imageUrl: [''],
      description: [''], // ✅ Added missing field
    });

    this.fetchProducts();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      console.log('📤 Sending product:', productData); // 🔍 Debug log

      this.productService.addProduct(productData).subscribe({
        next: (res: any) => {
          console.log('✅ Product added:', res);
          this.fetchProducts();
          this.productForm.reset();
          this.showAddForm = false;
        },
        error: (err: any) => {
          console.error('❌ Failed to add product:', err);
        },
      });
    } else {
      console.warn('⚠️ Form is invalid!');
    }
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe((products: any[]) => {
      this.allItems = products;
      this.applyFilters();
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    this.applyFilters();
  }

  onCategoryChange(event: Event): void {
    const input = event.target as HTMLSelectElement;
    this.selectedCategory = input.value;
    this.applyFilters();
  }

  onStatusChange(event: Event): void {
    const input = event.target as HTMLSelectElement;
    this.selectedStatus = input.value;
    this.applyFilters();
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    const category = this.selectedCategory.toLowerCase();
    const status = this.selectedStatus.toLowerCase();

    this.filteredItems = this.allItems.filter((item) => {
      return (
        (!term || item.name?.toLowerCase().includes(term)) &&
        (!category || item.category?.toLowerCase() === category) &&
        (!status || item.status?.toLowerCase() === status)
      );
    });
  }

  editItem(item: any): void {
    console.log('✏️ Edit item:', item);
  }

  deleteItem(item: any): void {
    this.productService.deleteProduct(item.id).subscribe(() => {
      this.fetchProducts();
    });
  }
}

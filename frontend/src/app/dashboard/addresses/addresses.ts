import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Address {
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  label: string;
  default: boolean;
}

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addresses.html',
  styleUrls: ['./addresses.scss'],
})
export class AddressesComponent {
  addresses: Address[] = [
    {
      name: 'John Doe',
      phone: '9876543210',
      street: '123 Main Street',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411005',
      label: 'Home',
      default: true,
    },
    {
      name: 'Jane Smith',
      phone: '9123456780',
      street: 'XYZ Tech Park',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560103',
      label: 'Office',
      default: false,
    },
  ];

  showAddForm = false;
  editingIndex: number | null = null;

  // Store new form values using template reference (# variables)
  addAddress(form: any) {
    const newAddress: Address = {
      name: form.name.value,
      phone: form.phone.value,
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      pincode: form.pincode.value,
      label: form.type.value,
      default: form.defaultCheck.checked,
    };

    // If default, remove existing default
    if (newAddress.default) {
      this.addresses.forEach((a) => (a.default = false));
    }

    if (this.editingIndex !== null) {
      this.addresses[this.editingIndex] = newAddress;
    } else {
      this.addresses.push(newAddress);
    }

    this.cancelForm();
  }

  toggleForm() {
    this.showAddForm = !this.showAddForm;
    this.editingIndex = null;
  }

  cancelForm() {
    this.showAddForm = false;
    this.editingIndex = null;
  }

  deleteAddress(index: number) {
    this.addresses.splice(index, 1);
  }

  editAddress(index: number) {
    this.editingIndex = index;
    this.showAddForm = true;
    // Optional: prefill form with data using ViewChild or two-way binding
  }

  setDefault(index: number) {
    this.addresses.forEach((a) => (a.default = false));
    this.addresses[index].default = true;
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prescriptions.html',
  styleUrls: ['./prescriptions.scss'],
})
export class PrescriptionsComponent {
  prescriptions: any[] = [];

  searchTerm: string = '';
  statusFilter: string = '';
  sortOption: string = 'newest';

  previewUrl: string | null = null;
  isImage: boolean = false;

  // Simple ID generator
  private idCounter = 1;

  // Store form inputs
  prescriptionForm = {
    doctor: '',
    date: '',
    notes: '',
    file: null as File | null,
  };

  // File select handler
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.prescriptionForm.file = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
      this.isImage = file.type.startsWith('image/');
    };
    reader.readAsDataURL(file);
  }

  // Save mock prescription entry
  savePrescription(): void {
    if (
      !this.prescriptionForm.doctor ||
      !this.prescriptionForm.date ||
      !this.prescriptionForm.file
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    this.prescriptions.unshift({
      id: this.idCounter++,
      status: 'Pending',
      date: this.prescriptionForm.date,
      doctor: this.prescriptionForm.doctor,
      notes: this.prescriptionForm.notes,
      fileUrl: this.previewUrl,
      fileName: this.prescriptionForm.file.name,
    });

    // Reset form
    this.prescriptionForm = {
      doctor: '',
      date: '',
      notes: '',
      file: null,
    };
    this.previewUrl = null;
    this.isImage = false;
  }

  // Filter and sort prescriptions
  getFilteredPrescriptions(): any[] {
    return this.prescriptions
      .filter(
        (p) =>
          (!this.searchTerm ||
            p.doctor.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            p.notes.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
          (!this.statusFilter || p.status === this.statusFilter)
      )
      .sort((a, b) => {
        if (this.sortOption === 'newest') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
      });
  }

  // Button actions
  viewDetails(prescription: any): void {
    alert(
      `🩺 Doctor: ${prescription.doctor}\n📅 Date: ${prescription.date}\n📄 Notes: ${prescription.notes}`
    );
  }

  addToCart(prescription: any): void {
    alert(
      `🛒 Added medicines to cart based on prescription from ${prescription.doctor}`
    );
  }

  download(prescription: any): void {
    if (!prescription.fileUrl) {
      alert('No file available');
      return;
    }

    const link = document.createElement('a');
    link.href = prescription.fileUrl;
    link.download = prescription.fileName || 'prescription';
    link.click();
  }
}

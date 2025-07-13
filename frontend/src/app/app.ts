import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule], // ✅ Add ReactiveFormsModule
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Medikart';
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-method.html',
  styleUrls: ['./payment-method.scss']
})
export class PaymentMethodComponent {
  cards = [
    {
      type: 'Visa',
      number: '**** **** **** 1234',
      expiry: '12/26',
      holder: 'Sadafr',
      default: true
    },
    {
      type: 'MasterCard',
      number: '**** **** **** 5678',
      expiry: '08/25',
      holder: 'Sadia',
      default: false
    }
  ];

  upiMethods = [
    {
      name: 'Google Pay',
      id: 'sadaf&#64;okaxis',
      icon: 'https://brandlogos.net/wp-content/uploads/2021/10/Google-Pay-logo-symbol-1.png'
    },
    {
      name: 'PhonePe',
      id: 'sadaf&#64;ybl',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRapYlNmetw9Nf0kFiR9PzoZLiJSzX3LjkKww&s'
    },
    {
      name: 'Paytm',
      id: 'sadaf&#64;paytm',
      icon: 'https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/650d41381232a-l.png'
    }
  ];
}

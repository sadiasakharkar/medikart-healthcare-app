import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.scss']
})
export class WishlistComponent {
  products = [
  {
    img: 'https://bernofarm.com/wp-content/uploads/2021/11/PARACETAMOL-500-mg-KAPLET.png',
    name: 'Paracetamol 500mg',
    desc: '20% OFF · Pain & Fever Relief',
    price: 40,
    original: 60,
    stock: true
  },
  {
    img: 'https://www.ogbeauty.in/cdn/shop/files/OG_Wellness_VitaminC_Amla___Zinc_Tablets_Listing_Image_1_c95d145d-9e19-449c-90ce-f8bc5e49c3c1.jpg?v=1744612847',
    name: 'Vitamin C Tablets',
    desc: 'Immunity Booster',
    price: 120,
    original: 150,
    stock: true
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQezHBawYDnICU5Ig4_GYZBjFV6Z42QMymTWw&s',
    name: 'BP Monitoring Device',
    desc: 'Track your BP at home',
    price: 950,
    original: 1200,
    stock: true
  },
  {
    img: 'https://orgain.com/cdn/shop/files/851770003179-v13-Orgain-ProteinPowder-2.03lb-Chocolate-20240311-Front-HIRES-web_1200px.webp?v=1729013192',
    name: 'Protein Powder',
    desc: 'Nutrition & Recovery',
    price: 650,
    original: 800,
    stock: false
  },
  {
    img: 'https://m.media-amazon.com/images/I/61dtpnsDXcL._UF1000,1000_QL80_.jpg',
    name: 'Digital Thermometer',
    desc: 'Fever Monitoring Tool',
    price: 200,
    original: 250,
    stock: true
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0qVvik2viBaO8Ali5hQ7AVa2sVb5Na1bnrw&s',
    name: 'Diabetes Testing Kit',
    desc: 'Test strips & lancets',
    price: 480,
    original: 599,
    stock: false
  }
];

}

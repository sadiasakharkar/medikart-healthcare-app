import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model'; // ✅ Make sure this model has productName

interface Product {
  id: number;
  img: string;
  name: string;
  description: string;
  original: number;
  discounted: number;
}

@Component({
  selector: 'app-health-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './health-home.html',
  styleUrls: ['./health-home.scss'],
})
export class HealthHome {
  currentYear: number = new Date().getFullYear();
  showAllProducts: boolean = false;
  userId: number = 1; // Replace with logged-in user’s actual ID

  constructor(private cartService: CartService) {}

  featuredProducts: Product[] = [
    {
      id: 1,
      img: 'https://bernofarm.com/wp-content/uploads/2021/11/PARACETAMOL-500-mg-KAPLET.png',
      name: 'Paracetamol 500mg',
      description: 'Fever & pain relief',
      original: 60,
      discounted: 40,
    },
    {
      id: 2,
      img: 'https://images.apollo247.in/pub/media/catalog/product/U/L/ULT0239_1_1.jpg',
      name: 'Tulsi Drops',
      description: 'Immunity booster',
      original: 120,
      discounted: 95,
    },
    {
      id: 3,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStMzU3UQTTKRhh1tRuoDNjy_Rt1VDx4IvP3w&s',
      name: 'Omega-3 Capsules',
      description: 'Heart & brain health',
      original: 300,
      discounted: 250,
    },
    {
      id: 4,
      img: 'https://d1s24u4ln0wd0i.cloudfront.net/7223_1',
      name: 'Limcee 500mg',
      description: 'Vitamin C supplement',
      original: 80,
      discounted: 60,
    },
    {
      id: 5,
      img: 'https://5.imimg.com/data5/SELLER/Default/2023/11/364179362/NM/GV/BM/203498787/dolo-650-paracetamol-tablets-ip.jpg',
      name: 'Dolo 650mg',
      description: 'Pain & fever relief',
      original: 90,
      discounted: 75,
    },
    {
      id: 6,
      img: 'https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/fdozxb8od2ggadv9qoev.jpg',
      name: 'Calcium Sandoz',
      description: 'Bone health support',
      original: 150,
      discounted: 120,
    },
    {
      id: 7,
      img: 'https://5.imimg.com/data5/SELLER/Default/2024/12/474081462/AB/OU/PX/28890488/loperamide-hydrochloride-2-mg-tablets-roko.png',
      name: 'Roko',
      description: 'Digestive aid',
      original: 170,
      discounted: 145,
    },
    {
      id: 8,
      img: 'https://assets.truemeds.in/Images/ProductImage/TM-TACR1-052425/orcerin-gm-tablet-15_orcerin-gm-tablet-15--TM-TACR1-052425_1.png',
      name: 'Orcerin GM',
      description: 'Joint pain relief',
      original: 210,
      discounted: 180,
    },
    {
      id: 9,
      img: 'https://www.crocin.com/content/dam/cf-consumer-healthcare/panadol-reborn/en_IN/product-detail/380x463/Crocin-Pain-Relief-15-Tablets-3D_380x463.png',
      name: 'Crocin Advance',
      description: 'Pain reliever',
      original: 65,
      discounted: 50,
    },
    {
      id: 10,
      img: 'https://naturesbounty.com/cdn/shop/products/058913.png?v=1667506775',
      name: 'Biotin 5000mcg',
      description: 'Hair & skin support',
      original: 350,
      discounted: 280,
    },
    {
      id: 11,
      img: 'https://5.imimg.com/data5/SELLER/Default/2025/6/518849153/YZ/PN/VL/35828174/10mg-cetirizine-hydrochloride-tablet-500x500.png',
      name: 'Cetirizine 10mg',
      description: 'Allergy relief',
      original: 50,
      discounted: 35,
    },
    {
      id: 12,
      img: 'https://enerzal.com/images/products/1684760060-1_crop.webp',
      name: 'Enerzal Powder',
      description: 'Electrolyte energy drink',
      original: 200,
      discounted: 165,
    },
  ];

  get visibleProducts(): Product[] {
    return this.showAllProducts
      ? this.featuredProducts
      : this.featuredProducts.slice(0, 4);
  }

  viewAll(): void {
    this.showAllProducts = true;
  }

  addToCart(product: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.id;

    if (!userId) {
      alert('❌ Please login first');
      return;
    }

    const cartItem: CartItem = {
      userId: userId,
      productId: product.id,
      quantity: 1,
      productName: product.name,
      price: product.discounted, // or product.price depending on your naming
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: () => {
        alert('✅ Product added to cart!');
      },
      error: (err) => {
        console.error('Add to cart failed', err);
        alert('❌ Could not add to cart');
      },
    });
  }
}

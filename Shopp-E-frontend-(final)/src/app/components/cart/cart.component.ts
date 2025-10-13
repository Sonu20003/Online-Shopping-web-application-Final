import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../service/cart.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // for *ngIf/*ngFor

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
}

interface CartItemWithProduct extends CartItem {
  product?: Product;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,           // if using standalone components
  imports: [CommonModule]     // needed for *ngIf and *ngFor
})
export class CartComponent implements OnInit {
  items: CartItemWithProduct[] = [];
  allProducts: Product[] = [];
  private PRODUCTS_API = 'http://localhost:8088/product_db/api/products';

  constructor(
      private cartService: CartService,
      private http: HttpClient,
      private router: Router
  ) {}

  ngOnInit(): void {
    const userIdRaw = localStorage.getItem('userId');
    if (!userIdRaw) {
      alert('Please login first');
      this.router.navigate(['/register']);
      return;
    }
    const userId = Number(userIdRaw);

    // 1️⃣ Fetch all products first
    this.http.get<Product[]>(this.PRODUCTS_API).subscribe({
      next: (products) => {
        this.allProducts = products;

        // 2️⃣ Then fetch cart items
        this.cartService.getCartForUser(userId).subscribe({
          next: (cartItems) => {
            // 3️⃣ Map each cart item to include its product info
            this.items = cartItems.map(item => ({
              ...item,
              product: products.find(p => p.id === item.productId)
            }));
          },
          error: (err) => console.error('Failed to fetch cart', err)
        });
      },
      error: (err) => console.error('Failed to fetch products', err)
    });
  }

  remove(item: CartItemWithProduct) {
    this.cartService.removeItem(item.id).subscribe(() => {
      this.items = this.items.filter(i => i.id !== item.id);
    });
  }
}

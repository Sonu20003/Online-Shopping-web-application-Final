import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ControlStripComponent } from "../control-strip/control-strip.component";
import { NgForOf } from "@angular/common";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    ControlStripComponent,
    NgForOf
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  allProducts: Product[] = [];
  searchText: string = '';
  activeSort: string = '';
  isUserLoggedIn: boolean = false;

  // You can change this if your backend uses a different base (or use a proxy)
  private CART_API = 'http://localhost:8088/product_db/api/cart';   // POST, GET, DELETE
  private PRODUCTS_API = 'http://localhost:8088/product_db/api/products'; // your products endpoint

  constructor(
      private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = !!localStorage.getItem('userId');

    // read query params (search & sort) and apply them
    this.route.queryParams.subscribe(params => {
      this.searchText = (params['search'] || '').toLowerCase();
      this.activeSort = params['sort'] || '';
      // applyFilters will run after products are loaded too
      this.applyFilters();
    });

    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<Product[]>(this.PRODUCTS_API).subscribe({
      next: data => {
        this.allProducts = Array.isArray(data) ? [...data] : [];
        this.applyFilters();
        console.log('Products fetched:', this.allProducts);
      },
      error: err => {
        console.warn('Product API error, loading placeholders', err);
        this.loadPlaceholderProducts();
      }
    });
  }

  // placeholder product list (used when API not ready)
  loadPlaceholderProducts() {
    this.allProducts = [
      { id: 1, name: 'Smartphone', price: 14999, description: 'Latest 5G phone', imageUrl: '/images/placeholder1.jpg' },
      { id: 2, name: 'Wireless Headphones', price: 2999, description: 'Noise Cancelling', imageUrl: '/images/placeholder2.jpg' },
      { id: 3, name: 'Laptop', price: 57999, description: 'Powerful performance', imageUrl: '/images/placeholder3.jpg' },
      { id: 4, name: 'Smartwatch', price: 4999, description: 'Health tracking features', imageUrl: '/images/placeholder4.jpg' },
      { id: 5, name: 'Camera', price: 21999, description: 'DSLR-level clarity', imageUrl: '/images/placeholder5.jpg' },
      { id: 6, name: 'Bluetooth Speaker', price: 1999, description: 'Deep bass & loud sound', imageUrl: '/images/placeholder6.jpg' },
    ];
    this.applyFilters();
  }

  // sorting and searching (invoked from control strip)
  handleSort(sortType: string) {
    this.activeSort = sortType;
    this.applyFilters();
    this.updateUrl();
  }

  handleSearch(searchText: string) {
    this.searchText = (searchText || '').toLowerCase();
    this.applyFilters();
    this.updateUrl();
  }

  applyFilters() {
    let filtered = [...this.allProducts];

    if (this.searchText && this.searchText.trim().length > 0) {
      const s = this.searchText.trim();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(s) || (p.description || '').toLowerCase().includes(s));
    }

    if (this.activeSort === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.activeSort === 'alphabet') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    this.products = filtered;
  }

  updateUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchText || null,
        sort: this.activeSort || null
      },
      queryParamsHandling: 'merge'
    });
  }

  // only Cart requires login (control-strip -> cartClicked triggers this)
  goToCart() {
    if (!this.isUserLoggedIn) {
      alert('Please login first!');
      this.router.navigate(['/register']);
      return;
    }

    // navigate to cart and keep search/sort as query params
    this.router.navigate(['/cart'], {
      queryParams: {
        search: this.searchText || null,
        sort: this.activeSort || null
      }
    });
  }

  // Add to cart: calls backend to persist cart item
  // quantity optional, default 1
  addToCart(product: Product, quantity = 1) {
    if (!this.isUserLoggedIn) {
      alert('Please login first!');
      this.router.navigate(['/register']);
      return;
    }

    const userIdRaw = localStorage.getItem('userId');
    if (!userIdRaw) {
      alert('Please login first!');
      this.router.navigate(['/register']);
      return;
    }

    const userId = Number(userIdRaw);
    if (!userId || Number.isNaN(userId)) {
      console.warn('Invalid userId in localStorage:', userIdRaw);
      alert('Please login again.');
      this.router.navigate(['/register']);
      return;
    }

    const payload = {
      userId,
      productId: product.id,
      quantity
    };



    // POST to cart API (assumes backend mapped at /api/cart)
    this.http.post(this.CART_API, payload).subscribe({
      next: (res: any) => {
        console.log('Add to cart response:', res);
        alert('Product added to cart!');
      },
      error: (err) => {
        console.error('Failed to add to cart', err);
        alert('Failed to add to cart. Try again later.');
      }



    });
  }
}

import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 10, imageUrl: 'assets/product1.jpg' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 20, imageUrl: 'assets/product2.jpg' },
    // Add more products as needed
  ];

  getProducts(): Product[] {
    return this.products;
  }
}

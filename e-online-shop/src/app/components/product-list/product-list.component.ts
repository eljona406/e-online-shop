import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/products.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }
}


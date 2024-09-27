import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private products: Product[] = [
		{
			id: 1,
			name: 'Wireless Headphones',
			description:
				'High-quality wireless headphones with noise cancellation and long battery life.',
			price: 99,
			imageUrl:
				'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671363',
		},
		{
			id: 2,
			name: 'Smartphone',
			description:
				'Latest model smartphone with a stunning display and powerful performance.',
			price: 699,
			imageUrl:
				'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671363',
		},
		{
			id: 3,
			name: 'Smartwatch',
			description: 'Stylish smartwatch with fitness tracking, heart rate monitor, and GPS.',
			price: 199,
			imageUrl:
				'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671363',
		},
		{
			id: 4,
			name: 'Bluetooth Speaker',
			description: 'Portable Bluetooth speaker with deep bass and 360-degree sound.',
			price: 49,
			imageUrl:
				'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671363',
		},
		{
			id: 5,
			name: 'Laptop',
			description: 'Sleek laptop with a powerful processor and a high-resolution display.',
			price: 1099,
			imageUrl:
				'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671363',
		},
		{
			id: 6,
			name: 'Gaming Console',
			description:
				'Next-gen gaming console with immersive graphics and an expansive game library.',
			price: 499,
			imageUrl:
				'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671363',
		},
		{
			id: 7,
			name: 'Tablet',
			description: 'Lightweight tablet with a crystal-clear display and long battery life.',
			price: 299,
			imageUrl:
				'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671363',
		},
		{
			id: 8,
			name: 'Camera',
			description:
				'High-resolution camera with advanced features for professional photography.',
			price: 899,
			imageUrl:
				'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671363',
		},
		// Add more products as needed
	];

	getProducts(): Product[] {
		return this.products;
	}
}

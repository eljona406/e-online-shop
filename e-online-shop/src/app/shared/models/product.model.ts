export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	rating: number;
	isInStock: boolean;
	quantity: number;
	images: string[];
	category: string;
	author: string;
}

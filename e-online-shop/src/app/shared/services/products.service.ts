import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private products: Product[] = [
		{
			id: 1,
			name: 'Pride and Prejudice',
			description:
				'A timeless romance novel by Jane Austen, exploring love, social class, and marriage in 19th-century England.',
			price: 10.99,
			rating: 4.8,
			isInStock: true,
			quantity: 15,
			images: [
				'https://readaloudrevival.com/wp-content/uploads/2016/05/Pride-and-Prejudice.png.webp',
			],
			category: 'Classics',
			author: 'Jane Austen', // Added author
		},
		{
			id: 2,
			name: 'The Song of Achilles',
			description:
				'A captivating retelling of the Greek hero Achilles’ story, from his relationship with Patroclus to the Trojan War.',
			price: 11.99,
			rating: 4.8,
			isInStock: true,
			quantity: 13,
			images: [
				'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRuPkJl7n-iwD5vatIBNDsvkwYDxzUV8T4dzp4Gu_F7ZVaOmHHNgkaWpQoUmn8WgVX9VYzE0YmehR5-KWeyAMZF7tVp9bTNE7UXJhMBUho&usqp=CAc',
			],
			category: 'Fantasy',
			author: 'Madeline Miller',
		},
		{
			id: 3,
			name: 'Fourth Wing',
			description:
				'Rebecca Yarros’ bestseller, blending romance, fantasy, and dragons in an epic adventure.',
			price: 16.99,
			rating: 4.9,
			isInStock: true,
			quantity: 10,
			images: [
				'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT4oDkpxveb1kqfRf021vnXzpp69oSV4NmaPENIoD7hq_PO4LpWwm7mn3YAgWo9ci__lcFsuzRZLNi871GRLB5YvW2g9rDv8CGO8m-qweE&usqp=CAc',
			],
			category: 'Fantasy',
			author: 'Rebecca Yarros',
		},
		{
			id: 4,
			name: 'The Hobbit',
			description:
				'J.R.R. Tolkien’s beloved classic fantasy novel, introducing readers to Middle-earth and the adventures of Bilbo Baggins.',
			price: 12.99,
			rating: 4.9,
			isInStock: true,
			quantity: 8,
			images: [
				'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSNZTc776wCrG0a0TVYZ6FlwYbdwWiUKpy-0x2ADyDMLsznxUkAb4syiqjx25hJuTAnIRSv1zdDRtbpGLArLvtO1lPwtLifJmi5ftKGZxM&usqp=CAc',
			],
			category: 'Fantasy',
			author: 'J.R.R. Tolkien',
		},
		{
			id: 5,
			name: 'Bridgerton: The Duke and I',
			description:
				'A romance novel by Julia Quinn, set in Regency-era London, filled with scandal, passion, and witty dialogue.',
			price: 9.99,
			rating: 4.5,
			isInStock: true,
			quantity: 20,
			images: [
				'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS8KguHv8VzRC35tqvpjN_tDjfQ5oBQnAD9PRauRYUefK1O2uOAN2uzdQUbRJEBwxksGi1touwMYfkTHSsZ501otoHj4v3T1ji5uz53aDMv0KhTiyworvIJAg&usqp=CAc',
			],
			category: 'Romance',
			author: 'Julia Quinn',
		},
		{
			id: 6,
			name: 'The Invisible Life of Addie LaRue',
			description:
				'A fantasy novel by V.E. Schwab, following a woman who makes a Faustian bargain to live forever, only to be forgotten by everyone she meets.',
			price: 17.99,
			rating: 4.6,
			isInStock: false,
			quantity: 0,
			images: [
				'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR6738Ru-XwPcXg82hN2WwuShDwK3R5NSU00g-ahDEe77VMhgp1COrp_tbbew18t3AGnE1KPvxVVw5iTC83G4AHi6beCwtPD3d0U0YyJH-f&usqp=CAc',
			],
			category: 'Fantasy',
			author: 'V.E. Schwab',
		},
		{
			id: 7,
			name: 'A Court of Thorns and Roses',
			description:
				'A thrilling fantasy novel by Sarah J. Maas, combining magic, romance, and political intrigue.',
			price: 14.99,
			rating: 4.7,
			isInStock: true,
			quantity: 12,
			images: [
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXx3s0o9OenZTLGKNzd5OqmemX7qrJvGZOx4QK3Kbn8kSGe1AdQuf5esildXyu5YCNwtg&usqp=CAU',
				'https://pooledink.com/wp-content/uploads/2019/08/acotar-collectors-edition-1.jpg',
			],
			category: 'Fantasy',
			author: 'Sarah J. Maas',
		},
		{
			id: 8,
			name: 'The Night Circus',
			description:
				'A fantasy novel by Erin Morgenstern, weaving a magical competition set within a mysterious circus that appears only at night.',
			price: 13.99,
			rating: 4.7,
			isInStock: false,
			quantity: 0,
			images: [
				'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTTKm7j3JFj2b7ljlq0ftEmPV109XXBJtkvuDdsWXI-A6XCJB_Iv3rxyf-hWkDLCMAufwa-qodU9NuhC_CnetXJkCtpOA47pRli_soEc1g&usqp=CAc',
			],
			category: 'Fantasy',
			author: 'Erin Morgenstern',
		},
		{
			id: 9,
			name: 'The Seven Husbands of Evelyn Hugo',
			description:
				'A historical fiction novel by Taylor Jenkins Reid, focusing on the fictional Hollywood star Evelyn Hugo and her seven marriages.',
			price: 15.99,
			rating: 4.8,
			isInStock: true,
			quantity: 9,
			images: [
				'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRPntTXBe6Yc8F4K8gRD3ZBo0U5bMiKQllJLsjGFS0IdNmtwGLGyS8ykz9rwW84qDSq02lrXG8mw79lASQgU4jD5zHYOKv-pyqk1QB2A_AQJuo_BdJtJug&usqp=CAc',
			],
			category: 'Historical Fiction',
			author: 'Taylor Jenkins Reid',
		},
		{
			id: 10,
			name: 'Crescent City: House of Earth and Blood',
			description:
				'Sarah J. Maas’ urban fantasy novel, combining magic, angels, and a thrilling mystery.',
			price: 19.99,
			rating: 4.9,
			isInStock: true,
			quantity: 6,
			images: [
				'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQPIhQZYTecEEZP2R1a0hYtp_ldrT80Df19S_xGvydBiUtghub3oMDEWbfIoVnSilMYx-4H_uDuYbFLvXD6Cer82ZtwZ0n46erTrADABqs&usqp=CAc',
			],
			category: 'Fantasy',
			author: 'Sarah J. Maas',
		},
		{
			id: 11,
			name: 'Dune',
			description:
				'Frank Herbert’s epic science fiction saga set on the desert planet Arrakis, focusing on politics, religion, and ecology.',
			price: 18.99,
			rating: 4.9,
			isInStock: true,
			quantity: 7,
			images: [
				'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTgAmI-w1IPYx_cGFTVfDuiVJNKMaOv9iXgTvbx1pYxKVBu90b4oRYVj5Jv56A3YWx70JrGqtqde-FsFbwHqbZyWpOARNjoYyYYpUg_mJ0&usqp=CAc',
			],
			category: 'Science Fiction',
			author: 'Frank Herbert',
		},
		{
			id: 12,
			name: 'Red, White & Royal Blue',
			description:
				'Casey McQuiston’s romantic comedy novel about the First Son of the United States falling in love with a British prince.',
			price: 13.99,
			rating: 4.6,
			isInStock: true,
			quantity: 14,
			images: ['https://i.ebayimg.com/thumbs/images/g/Z94AAOSwAcRkn7W0/s-l500.jpg'],
			category: 'Romance',
			author: 'Casey McQuiston',
		},
		{
			id: 13,
			name: 'Where the Crawdads Sing',
			description:
				'Delia Owens’ mystery novel about a young girl living in the marshes of North Carolina who becomes a murder suspect.',
			price: 12.99,
			rating: 4.7,
			isInStock: true,
			quantity: 11,
			images: [
				'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTFLA3xJclWfqblPyEzyuI-XEEnF_vvd9Zew5lm5ry3ZLKjzEwv_6rGq_n0eRyFnCfhX3GvsyKc-bSoww91xNxlX7WW69IBLFsZTHvE99aF&usqp=CAc',
			],
			category: 'Mystery',
			author: 'Delia Owens',
		},
		{
			id: 14,
			name: 'Normal People',
			description:
				'A contemporary romance novel by Sally Rooney, following the complex relationship between two young people from different social backgrounds.',
			price: 11.99,
			rating: 4.4,
			isInStock: true,
			quantity: 16,
			images: [
				'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT6yTkTPlgCg9ehS2wnmS45OSCrYMuLLV1W_NOBx2DjAe6gGeSh-wM2sfOmGvlWcP8id5gmPtRRiXVebxAc3fPib0cFTgSDVmThKHxVb7o&usqp=CAc',
			],
			category: 'Romance',
			author: 'Sally Rooney',
		},
		{
			id: 15,
			name: 'The Song of Ice and Fire: A Game of Thrones',
			description:
				'The first book in George R. R. Martin’s epic fantasy series, full of political intrigue, war, and power struggles in the Seven Kingdoms.',
			price: 18.99,
			rating: 4.9,
			isInStock: true,
			quantity: 9,
			images: [
				'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSCud_x_EyUAYuKaqHYjqlMtZJ7RQ46xJo5uufkBHR7B_yq5PumRuZmbrFKXTFO-8ujMHIyn8JvEtD9ssXJeT-DVbF7pxL3vMiOObcqQpU&usqp=CAc',
			],
			category: 'Fantasy',
			author: 'George R. R. Martin',
		},
		{
			id: 16,
			name: 'Little Women',
			description:
				'A classic novel by Louisa May Alcott, following the lives of four sisters growing up during the Civil War.',
			price: 9.99,
			rating: 4.8,
			isInStock: true,
			quantity: 18,
			images: [
				'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ5IXUpC2meEGpNKHHvpcKaxuMdK7v2zOZT1yPU_q2_tTnbFSKrf1XKR0xA8b4SwGBvh5Gzphmu-Bz7fdtNirSLI2R9-cd_fjNSwqgydO2m&usqp=CAc',
			],
			category: 'Classics',
			author: 'Louisa May Alcott',
		},
		{
			id: 17,
			name: 'Circe',
			description:
				'Madeline Miller’s reimagining of the story of Circe, the enchantress from Greek mythology, focusing on her journey of self-discovery and empowerment.',
			price: 14.99,
			rating: 4.8,
			isInStock: true,
			quantity: 7,
			images: [
				'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTRKFCatnBhxJe7IMF0a9vSkqbfWRWOUHRWUXNHkN4rhv1VnXhxgq4QQs89HPZ9GzJ_nZkSDAATDTZhxtkXZ6eaRVG2GnCLeDqVAekWj6XC&usqp=CAc',
			],
			category: 'Fantasy',
			author: 'Madeline Miller',
		},
		{
			id: 18,
			name: 'It Ends with Us',
			description:
				'Colleen Hoover’s bestselling romance novel, dealing with issues of love, heartbreak, and domestic abuse.',
			price: 12.99,
			rating: 4.7,
			isInStock: true,
			quantity: 10,
			images: [
				'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSSf-ZFoFqtKytHC-6o4RvtOU2vqfPEgpXiQUSxlVPaeTPK3Rcn-8NYikemTdq3ro42w8oJTxI-DFfbwOVPwtNKzxNyNKF4Xn9YhxCVjoP1&usqp=CAc',
			],
			category: 'Romance',
			author: 'Colleen Hoover',
		},
		{
			id: 19,
			name: 'The Great Gatsby',
			description:
				'A classic American novel by F. Scott Fitzgerald, exploring the themes of wealth, love, and the American Dream in the 1920s.',
			price: 10.99,
			rating: 4.5,
			isInStock: true,
			quantity: 13,
			images: [
				'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSwi7bmDAk0TLikjS2GkVe0nMv5U5KPQnPXYxoVPLxUVgE3alfo--2g8bcDKxo6jpFnE56mSyjPK0c2f0fFK4bW3_fAkNXdjYDLm-2SXLtR&usqp=CAc',
			],
			category: 'Classics',
			author: 'F. Scott Fitzgerald',
		},
		{
			id: 20,
			name: 'The Silent Patient',
			description:
				'A psychological thriller by Alex Michaelides about a woman who shoots her husband and then refuses to speak.',
			price: 13.99,
			rating: 4.7,
			isInStock: true,
			quantity: 5,
			images: [
				'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT8NgsWmRdLZRbhHiPhELIh50EtF_MzVxDt38IYP6AsafF4J7X6B0GwrONWzh36uKxMFIQRX9JMN-e7gZP6pLB5By6ZOG6uOgJK9w0PiGhBoS1AhBJnmCFbFzo&usqp=CAc',
			],
			category: 'Thriller',
			author: 'F. Scott Fitzgerald',
		},
	];

	getProducts(): Observable<Product[]> {
		return of(this.products);
	}
}

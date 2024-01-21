import * as fs from 'fs';
import { Product, Order, Category } from './interfaces';
import { ElectroProduct, BrandedProduct } from './baseClasses';

export interface Application {
  addProduct(product: Product): void;
  removeProduct(productName: string): void;
  displayProducts(): void;
  searchProducts(keyword: string): Product[];
}

export class BaseApplication implements Application {
  protected products: Product[] = [];
  protected orders: Order[] = [];
  protected categories: Category[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }

  removeProduct(productName: string): void {
    const productIndex = this.products.findIndex(
      (p) => p.name.toLowerCase() === productName.toLowerCase()
    );
    if (productIndex > -1) {
      this.products.splice(productIndex, 1);
      console.log(`Product ${productName} has been removed.`);
    } else {
      console.log(`Product ${productName} not found.`);
    }
  }

  displayProducts(): void {
    this.products.forEach((product) => product.display());
  }

  searchProducts(
    keyword: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number,
    rating?: number
  ): Product[] {
    return this.products.filter((product) => {
      const matchesKeyword = product.name
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchesCategory = category ? product.category === category : true;
      const matchesPriceRange =
        minPrice && maxPrice
          ? product.price >= minPrice && product.price <= maxPrice
          : true;
      const matchesRating = rating ? product.rating === rating : true;

      return (
        matchesKeyword && matchesCategory && matchesPriceRange && matchesRating
      );
    });
  }

  saveDataToFile(filename: string): void {
    const dataToSave = {
      products: this.products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        rating: product.rating,

        warrantyPeriod: (product as ElectroProduct).warrantyPeriod,
        brandName: (product as BrandedProduct).brandName,
      })),
      orders: this.orders,
      categories: this.categories,
    };

    fs.writeFileSync(filename, JSON.stringify(dataToSave, null, 2));
    console.log(`Data saved to ${filename}`);
  }
}

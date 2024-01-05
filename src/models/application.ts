import { Product } from './interfaces';

export interface Application {
  addProduct(product: Product): void;
  removeProduct(productId: number): void;
  displayProducts(): void;
  searchProducts(keyword: string): Product[];
}

export class BaseApplication implements Application {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }

  removeProduct(productId: number): void {
    this.products = this.products.filter(p => p.id !== productId);
  }

  displayProducts(): void {
    this.products.forEach(product => product.display());
  }

  searchProducts(keyword: string): Product[] {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}

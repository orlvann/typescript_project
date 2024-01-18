import { Product, Order, Category } from './interfaces';

export interface Application {
  addProduct(product: Product): void;
  removeProduct(productId: number): void;
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

  removeProduct(productId: number): void {
    this.products = this.products.filter((p) => p.id !== productId);
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
}

import {
  Product,
  Category,
  Catalogue,
  Order,
  Receipt,
  Application,
} from './interfaces';

export class BaseProduct implements Product {
  constructor(public id: number, public name: string, public price: number) {}

  display(): void {
    console.log(`${this.name} - $${this.price}`);
  }
}

export class BaseCategory implements Category {
  constructor(public id: number, public name: string) {}
}

export class BaseCatalogue implements Catalogue {
  categories: Category[] = [];

  addProductToCategory(productId: number, categoryId: number): void {
    // Implement logic to associate a product with a category
  }
}

export class BaseOrder implements Order {
  constructor(public id: number, public products: Product[]) {}
}

export class BaseReceipt implements Receipt {
  generateReceipt(order: Order): void {
    // Implement logic to generate a receipt
  }
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

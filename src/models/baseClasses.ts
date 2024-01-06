import * as fs from 'fs';
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
  constructor(
    public id: number,
    public name: string,
    public products: Product[] = []
  ) {}
}

export class BaseCatalogue implements Catalogue {
  categories: Category[] = [];

  addProductToCategory(productId: number, categoryId: number): void {
    // Find the category by ID
    const category = this.categories.find((c) => c.id === categoryId);

    // If the category exists, add the product to it
    if (category) {
      const product = new BaseProduct(productId, `Product ${productId}`, 0); // You can set the actual product details
      category.products.push(product);
    }
  }

  deleteCategory(categoryId: number): void {
    this.categories = this.categories.filter((c) => c.id !== categoryId);
  }

  displayCategories(): void {
    console.log('Categories:');
    this.categories.forEach((category) => {
      console.log(`${category.name} (ID: ${category.id})`);
      category.products.forEach((product) => {
        console.log(
          `  - ${product.name} (ID: ${product.id}, Price: $${product.price})`
        );
      });
    });
  }
}

export class BaseOrder implements Order {
  private static orderCount = 0;

  id: number;
  products: Product[];

  constructor() {
    this.id = ++BaseOrder.orderCount;
    this.products = [];
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  removeProduct(productId: number): void {
    this.products = this.products.filter((p) => p.id !== productId);
  }

  displayOrder(): void {
    console.log(`Order ${this.id}:`);
    this.products.forEach((product) => product.display());
  }

  deleteOrder(orderId: number): void {
    // Implement logic to delete an order
  }
}

export class BaseReceipt implements Receipt {
  generateReceipt(order: Order): void {
    console.log(`Receipt for Order ${order.id}:`);
    order.products.forEach((product) => product.display());
    console.log(
      'Total Amount:',
      order.products.reduce((sum, product) => sum + product.price, 0)
    );
  }

  generateInvoice(order: Order): void {
    console.log(`Invoice for Order ${order.id}:`);
    order.products.forEach((product) => {
      console.log(`  - ${product.name} - $${product.price}`);
    });
    console.log(
      'Total Amount:',
      order.products.reduce((sum, product) => sum + product.price, 0)
    );
  }
}

export class BaseApplication implements Application {
  private products: Product[] = [];
  private orders: Order[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }

  removeProduct(productId: number): void {
    this.products = this.products.filter((p) => p.id !== productId);
  }

  displayProducts(): void {
    console.log('Products:');
    this.products.forEach((product) => product.display());
  }

  searchProducts(keyword: string): Product[] {
    return this.products.filter((p) =>
      p.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  createOrder(): Order {
    const order = new BaseOrder();
    this.orders.push(order);
    return order;
  }

  deleteOrder(orderId: number): void {
    this.orders = this.orders.filter((order) => order.id !== orderId);
  }

  saveDataToFile(filename: string): void {
    const dataToSave = {
      products: this.products,
      orders: this.orders,
    };

    fs.writeFileSync(filename, JSON.stringify(dataToSave));
    console.log(`Data saved to ${filename}`);
  }
}

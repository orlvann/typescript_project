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
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public category?: string,
    public rating?: number
  ) {}

  display(): void {
    console.log(`${this.name} - $${this.price}`);
  }
}

export class GroceryProduct extends BaseProduct {
  constructor(
    id: number,
    name: string,
    price: number,
    category = 'Grocery',
    rating?: number
  ) {
    super(id, name, price, category, rating);
  }
}

export class ElectroProduct extends BaseProduct {
  public warrantyPeriod?: number;

  constructor(
    id: number,
    name: string,
    price: number,
    category = 'Electronics',
    rating?: number,
    warrantyPeriod?: number
  ) {
    super(id, name, price, category, rating);
    this.warrantyPeriod = warrantyPeriod;
  }

  displayWarrantyInfo(): void {
    if (this.warrantyPeriod) {
      console.log(`Warranty Information for ${this.name}:`);
      console.log(`Warranty Period: ${this.warrantyPeriod} months`);
    } else {
      console.log('Warranty information is not available for this product.');
    }
  }
}

export class BrandedProduct extends BaseProduct {
  public brandName?: string;

  constructor(
    id: number,
    name: string,
    price: number,
    category = 'Branded',
    rating?: number,
    brandName?: string
  ) {
    super(id, name, price, category, rating);
    this.brandName = brandName;
  }

  displayBrandInfo(): void {
    if (this.brandName) {
      console.log(`Product Name: ${this.name}`);
      console.log(`Brand Name: ${this.brandName}`);
    } else {
      console.log('Brand information not available.');
    }
  }
}

export class BaseCategory implements Category {
  constructor(
    public id: number,
    public name: string,
    public products: Product[] = []
  ) {}

  addProduct(product: Product): void {
    this.products.push(product);
  }

  listProducts(): void {
    console.log(`Products in ${this.name} category:`);
    this.products.forEach((p) => console.log(`- ${p.name}`));
  }
}

export class BaseCatalogue implements Catalogue {
  categories: Category[] = [];

  addProductToCategory(productId: number, categoryId: number): void {
    const category = this.categories.find((c) => c.id === categoryId);

    if (category) {
      const product = new BaseProduct(productId, `Product ${productId}`, 0);
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

  constructor(id?: number) {
    this.id = id ?? ++BaseOrder.orderCount;
    this.products = [];
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  displayOrder(): void {
    console.log(`Order ${this.id}:`);
    this.products.forEach((product) => product.display());
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
    console.log('Products:');
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

import * as fs from 'fs';
import { Product, Order, Category } from './interfaces';
import {
  GroceryProduct,
  ElectroProduct,
  BaseProduct,
  BrandedProduct,
  BaseOrder,
  BaseCategory,
} from './baseClasses';

export class BaseApplication {
  private products: Product[] = [];
  private orders: BaseOrder[] = [];
  private categories: BaseCategory[] = [];

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

  searchProducts(keyword: string): Product[] {
    return this.products.filter((p) =>
      p.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  loadDataFromFile(filename: string): void {
    try {
      const rawData = fs.readFileSync(filename, 'utf8');
      const data = JSON.parse(rawData);

      // Load Products
      this.products = data.products.map((productData: any) => {
        switch (productData.type) {
          case 'GroceryProduct':
            return new GroceryProduct(
              productData.id,
              productData.name,
              productData.price,
              productData.category,
              productData.rating
            );
          case 'ElectroProduct':
            return new ElectroProduct(
              productData.id,
              productData.name,
              productData.price,
              productData.category,
              productData.rating,
              productData.warrantyPeriod
            );
          case 'BrandedProduct':
            return new BrandedProduct(
              productData.id,
              productData.name,
              productData.price,
              productData.category,
              productData.rating,
              productData.brandName
            );
          default:
            return new BaseProduct(
              productData.id,
              productData.name,
              productData.price,
              productData.category,
              productData.rating
            );
        }
      });

      // Load Orders
      if (data.orders && Array.isArray(data.orders)) {
        this.orders = data.orders.map((orderData: any) => {
          const order = new BaseOrder();
          orderData.productIds.forEach((productId: number) => {
            // Explicit type for productId
            const product = this.products.find((p) => p.id === productId);
            if (product) {
              order.addProduct(product);
            }
          });
          return order;
        });
      }

      // Load Categories
      if (data.categories && Array.isArray(data.categories)) {
        this.categories = data.categories.map((categoryData: any) => {
          const category = new BaseCategory(categoryData.id, categoryData.name);
          categoryData.productIds.forEach((productId: number) => {
            // Explicit type for productId
            const product = this.products.find((p) => p.id === productId);
            if (product) {
              category.addProduct(product);
            }
          });
          return category;
        });
      }
    } catch (error) {
      console.error('Error loading data from file:', error);
    }
  }

  saveDataToFile(filename: string): void {
    try {
      const dataToSave = {
        products: this.products,
        orders: this.orders,
        categories: this.categories,
      };

      const jsonData = JSON.stringify(dataToSave, null, 2); // Beautify the JSON output
      fs.writeFileSync(filename, jsonData, 'utf8');
      console.log(`Data successfully saved to ${filename}`);
    } catch (error) {
      console.error('Error saving data to file:', error);
    }
  }
}

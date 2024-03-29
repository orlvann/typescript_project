export interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
  rating?: number;
  display(): void;
}

export interface Category {
  id: number;
  name: string;
  products: Product[];

  addProduct(product: Product): void;
  listProducts(): void;
}

export interface Catalogue {
  categories: Category[];
  addProductToCategory(productId: number, categoryId: number): void;
}

export interface Order {
  id: number;
  products: Product[];
}

export interface Receipt {
  generateReceipt(order: Order): void;
}

export interface Application {
  addProduct(product: Product): void;
  removeProduct(productName: string): void;
  displayProducts(): void;
  searchProducts(keyword: string): Product[];
}

export interface Customer {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  display(): void;
}

export interface Category {
  id: number;
  name: string;
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
  removeProduct(productId: number): void;
  displayProducts(): void;
  searchProducts(keyword: string): Product[];
}

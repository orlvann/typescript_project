import { BaseApplication, BaseOrder, BaseCategory } from './baseClasses';
import { Product, Order, Customer, Category } from './interfaces';

export class SingletonApplication extends BaseApplication {
  protected static instance: SingletonApplication;
  protected customers: Customer[] = [];
  protected categories: Category[] = [];
  protected constructor() {
    super();
    this.categories.push(new BaseCategory(1, 'Electronics'));
    this.categories.push(new BaseCategory(2, 'Groceries'));
    this.categories.push(new BaseCategory(3, 'Brands'));
  }

  public static getInstance(): SingletonApplication {
    if (!SingletonApplication.instance) {
      SingletonApplication.instance = new SingletonApplication();
    }
    return SingletonApplication.instance;
  }

  public addCustomer(customer: Customer): void {
    this.customers.push(customer);
  }

  public createOrder(): Order {
    const order = new BaseOrder();
    return order;
  }

  public addProductToCategory(product: Product, categoryName: string): void {
    const category = this.categories.find((c) => c.name === categoryName);
    if (category) {
      category.addProduct(product);
    } else {
      console.log(`Category '${categoryName}' not found.`);
    }
  }

  public searchProducts(
    keyword: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number,
    rating?: number
  ): Product[] {
    let searchResults = super.searchProducts(
      keyword,
      category,
      minPrice,
      maxPrice,
      rating
    );

    if (category) {
      searchResults = searchResults.filter(
        (product) => product.category === category
      );
    }

    return searchResults;
  }

  public addCategory(category: Category): void {
    this.categories.push(category);
  }

  public listCategories(): void {
    this.categories.forEach((category) => {
      console.log(`Category: ${category.name}`);
      category.listProducts();
    });
  }
}

export default SingletonApplication.getInstance();

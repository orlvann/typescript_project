import { BaseApplication, BaseOrder } from './baseClasses';
import { Product, Order, Customer } from './interfaces';

export class SingletonApplication extends BaseApplication {
  private static instance: SingletonApplication;

  private constructor() {
    super();
  }

  public static getInstance(): SingletonApplication {
    if (!SingletonApplication.instance) {
      SingletonApplication.instance = new SingletonApplication();
    }
    return SingletonApplication.instance;
  }

  private customers: Customer[] = [];

  public addCustomer(customer: Customer): void {
    this.customers.push(customer);
  }

  public createOrder(): Order {
    const order = new BaseOrder();
    return order;
  }

  public searchProducts(
    keyword: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number,
    rating?: number
  ): Product[] {
    // Customize the search logic here if needed
    const baseSearchResults = super.searchProducts(
      keyword,
      category,
      minPrice,
      maxPrice,
      rating
    );

    // Apply custom filtering based on customer preferences, if available
    const filteredResults = this.filterByCustomerPreferences(baseSearchResults);

    return filteredResults;
  }
  // Custom method to filter products based on customer preferences
  private filterByCustomerPreferences(
    customer: Customer,
    products: Product[]
  ): Product[] {
    // Initialize an empty array to store filtered products
    const filteredProducts: Product[] = [];

    // Retrieve the customer's favorite category from their preferences
    const favoriteCategory = customer.favoriteCategory;

    // Filter products based on the customer's favorite category
    const customerFilteredProducts = products.filter(product => {
      return product.category === favoriteCategory;
    });

    // Add the filtered products to the result array
    filteredProducts.push(...customerFilteredProducts);

    return filteredProducts;
  }
}

export default SingletonApplication.getInstance();

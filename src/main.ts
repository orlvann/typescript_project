// src/main.ts
import { BaseApplication } from './models/application';
import {
  GroceryProduct,
  BrandedProduct,
  ElectroProduct,
} from './models/descendantClasses';

// Instantiate the application
const app = new BaseApplication();

// Create some products
const apple = new GroceryProduct(1, 'Apple', 1.5);
const coke = new GroceryProduct(2, 'Coca-Cola', 2.0);
const samsungTV = new ElectroProduct(3, 'Samsung TV', 899.99);
const nikeShoes = new BrandedProduct(4, 'Nike Shoes', 99.99);

// Add products to the application
app.addProduct(apple);
app.addProduct(coke);
app.addProduct(samsungTV);
app.addProduct(nikeShoes);

// Display all products
console.log('All Products:');
app.displayProducts();

// Search for products containing 'TV'
const searchResults = app.searchProducts('TV');
console.log('\nSearch Results:');
searchResults.forEach(result => result.display());

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
const application_1 = require("./models/application");
const descendantClasses_1 = require("./models/descendantClasses");
// Instantiate the application
const app = new application_1.BaseApplication();
// Create some products
const apple = new descendantClasses_1.GroceryProduct(1, 'Apple', 1.5);
const coke = new descendantClasses_1.GroceryProduct(2, 'Coca-Cola', 2.0);
const samsungTV = new descendantClasses_1.ElectroProduct(3, 'Samsung TV', 899.99);
const nikeShoes = new descendantClasses_1.BrandedProduct(4, 'Nike Shoes', 99.99);
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

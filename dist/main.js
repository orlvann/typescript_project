"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./models/application");
const descendantClasses_1 = require("./models/descendantClasses");
const readline = __importStar(require("readline"));
// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Instantiate the application
const app = new application_1.BaseApplication();
// Define a function to display the main menu
function displayMainMenu() {
    console.log('\nAvailable Actions:');
    console.log('1. List all products');
    console.log('2. Add a new product');
    console.log('3. Search for a product');
    console.log('4. Exit');
    rl.question('Enter your choice: ', (answer) => {
        switch (answer.trim()) {
            case '1':
                app.displayProducts();
                break;
            case '2':
                // Here you would add logic to input product details and call app.addProduct()
                break;
            case '3':
                rl.question('Enter search keyword: ', (keyword) => {
                    const searchResults = app.searchProducts(keyword);
                    console.log('\nSearch Results:');
                    searchResults.forEach((result) => result.display());
                    displayMainMenu();
                });
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Invalid option, please try again.');
        }
        if (answer.trim() !== '4') {
            displayMainMenu();
        }
    });
}
// Seed with some products
function seedProducts() {
    // More grocery products
    const milk = new descendantClasses_1.GroceryProduct(11, 'Milk', 0.99);
    const bread = new descendantClasses_1.GroceryProduct(12, 'Bread', 1.2);
    const cheese = new descendantClasses_1.GroceryProduct(13, 'Cheese', 3.5);
    const apple = new descendantClasses_1.GroceryProduct(1, 'Apple', 1.5);
    const coke = new descendantClasses_1.GroceryProduct(2, 'Coca-Cola', 2.0);
    const banana = new descendantClasses_1.GroceryProduct(5, 'Banana', 0.5);
    const orangeJuice = new descendantClasses_1.GroceryProduct(8, 'Orange Juice', 3.0);
    // More electronic products
    const smartphone = new descendantClasses_1.ElectroProduct(14, 'Smartphone', 499.99);
    const headphones = new descendantClasses_1.ElectroProduct(15, 'Headphones', 89.99);
    const camera = new descendantClasses_1.ElectroProduct(16, 'Camera', 259.99);
    const samsungTV = new descendantClasses_1.ElectroProduct(3, 'Samsung TV', 899.99);
    const laptop = new descendantClasses_1.ElectroProduct(6, 'Dell Laptop', 1200.0);
    const earphones = new descendantClasses_1.ElectroProduct(9, 'Wireless Earphones', 59.99);
    // More branded products
    const adidasJacket = new descendantClasses_1.BrandedProduct(17, 'Adidas Jacket', 79.99);
    const levisJeans = new descendantClasses_1.BrandedProduct(18, 'Jeans', 59.99);
    const gucciBag = new descendantClasses_1.BrandedProduct(19, 'Gucci Handbag', 550.0);
    const nikeShoes = new descendantClasses_1.BrandedProduct(4, 'Nike Shoes', 99.99);
    const adidasShirt = new descendantClasses_1.BrandedProduct(7, 'Adidas T-Shirt', 35.0);
    const runningShoes = new descendantClasses_1.BrandedProduct(10, 'Running Shoes', 85.0);
    app.addProduct(milk);
    app.addProduct(bread);
    app.addProduct(cheese);
    app.addProduct(smartphone);
    app.addProduct(headphones);
    app.addProduct(camera);
    app.addProduct(adidasJacket);
    app.addProduct(levisJeans);
    app.addProduct(gucciBag);
    app.addProduct(apple);
    app.addProduct(coke);
    app.addProduct(samsungTV);
    app.addProduct(nikeShoes);
    app.addProduct(banana);
    app.addProduct(laptop);
    app.addProduct(adidasShirt);
    app.addProduct(orangeJuice);
    app.addProduct(earphones);
    app.addProduct(runningShoes);
}
// Initialize the application with some products
seedProducts();
// Show the main menu
displayMainMenu();
// When the readline interface is closed, terminate the process
rl.on('close', () => {
    console.log('Exiting the application.');
    process.exit(0);
});

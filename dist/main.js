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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./models/application");
const baseClasses_1 = require("./models/baseClasses");
const descendantClasses_1 = require("./models/descendantClasses");
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const app = new application_1.BaseApplication();
function displayMainMenu() {
    console.log(`
    Available Actions:
    1. List all products
    2. Add a new product
    3. Search for a product
    4. Remove a product
    5. Exit
  `);
    rl.question('Enter your choice: ', (choice) => {
        switch (choice.trim()) {
            case '1':
                app.displayProducts();
                displayMainMenu();
                break;
            case '2':
                addProduct();
                break;
            case '3':
                searchProduct();
                break;
            case '4':
                rl.question('Enter the name of the product to remove: ', (name) => {
                    app.removeProduct(name);
                    app.saveDataToFile('src/products.json');
                    displayMainMenu();
                });
                break;
            case '5':
                console.log('Exiting application.');
                rl.close(); // Corrected to use the readline instance
                break;
            default:
                console.log('Invalid choice, please try again.');
                displayMainMenu();
                break;
        }
    });
}
function addProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const name = yield askQuestion('Enter product name: ');
        const price = yield askQuestion('Enter product price: ');
        const category = yield askQuestion('Enter product category: ');
        const productId = Date.now(); // Unique ID for the product
        const parsedPrice = parseFloat(price);
        let newProduct;
        switch (category.toLowerCase()) {
            case 'grocery':
                newProduct = new descendantClasses_1.GroceryProduct(productId, name, parsedPrice);
                break;
            case 'electronics':
                newProduct = new descendantClasses_1.ElectroProduct(productId, name, parsedPrice);
                break;
            case 'branded':
                newProduct = new descendantClasses_1.BrandedProduct(productId, name, parsedPrice);
                break;
            default:
                newProduct = new baseClasses_1.BaseProduct(productId, name, parsedPrice, category);
                break;
        }
        app.addProduct(newProduct);
        console.log(`${name} has been added to the product list under ${category} category.`);
        displayMainMenu();
    });
}
function searchProduct() {
    rl.question('Enter search keyword: ', (keyword) => {
        rl.question('Enter category (optional, leave blank to ignore): ', (category) => {
            rl.question('Enter minimum price (optional, leave blank to ignore): ', (minPriceString) => {
                rl.question('Enter maximum price (optional, leave blank to ignore): ', (maxPriceString) => {
                    // Parse minimum and maximum prices
                    const minPrice = minPriceString
                        ? parseFloat(minPriceString)
                        : undefined;
                    const maxPrice = maxPriceString
                        ? parseFloat(maxPriceString)
                        : undefined;
                    // Search products in the application
                    const searchResults = app.searchProducts(keyword, category || undefined, minPrice, maxPrice);
                    console.log('\nSearch Results:');
                    if (searchResults.length) {
                        searchResults.forEach((product) => product.display());
                    }
                    else {
                        console.log('No products found matching your criteria.');
                    }
                    displayMainMenu();
                });
            });
        });
    });
}
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}
function seedProducts() {
    // Create instances of various products and add them to the application
    // Grocery products
    const milk = new descendantClasses_1.GroceryProduct(11, 'Milk', 0.99);
    const bread = new descendantClasses_1.GroceryProduct(12, 'Bread', 1.2);
    const cheese = new descendantClasses_1.GroceryProduct(13, 'Cheese', 3.5);
    const apple = new descendantClasses_1.GroceryProduct(1, 'Apple', 1.5);
    const coke = new descendantClasses_1.GroceryProduct(2, 'Coca-Cola', 2.0);
    const banana = new descendantClasses_1.GroceryProduct(5, 'Banana', 0.5);
    const orangeJuice = new descendantClasses_1.GroceryProduct(8, 'Orange Juice', 3.0);
    // Electronic products
    const smartphone = new descendantClasses_1.ElectroProduct(14, 'Smartphone', 499.99);
    const headphones = new descendantClasses_1.ElectroProduct(15, 'Headphones', 89.99);
    const camera = new descendantClasses_1.ElectroProduct(16, 'Camera', 259.99);
    const samsungTV = new descendantClasses_1.ElectroProduct(3, 'Samsung TV', 899.99);
    const laptop = new descendantClasses_1.ElectroProduct(6, 'Dell Laptop', 1200.0);
    const earphones = new descendantClasses_1.ElectroProduct(9, 'Wireless Earphones', 59.99);
    // Branded products
    const adidasJacket = new descendantClasses_1.BrandedProduct(17, 'Adidas Jacket', 79.99);
    const levisJeans = new descendantClasses_1.BrandedProduct(18, 'Jeans', 59.99);
    const gucciBag = new descendantClasses_1.BrandedProduct(19, 'Gucci Handbag', 550.0);
    const nikeShoes = new descendantClasses_1.BrandedProduct(4, 'Nike Shoes', 99.99);
    const adidasShirt = new descendantClasses_1.BrandedProduct(7, 'Adidas T-Shirt', 35.0);
    const runningShoes = new descendantClasses_1.BrandedProduct(10, 'Running Shoes', 85.0);
    // Add the products to the application
    app.addProduct(milk);
    app.addProduct(bread);
    app.addProduct(cheese);
    app.addProduct(apple);
    app.addProduct(coke);
    app.addProduct(banana);
    app.addProduct(orangeJuice);
    app.addProduct(smartphone);
    app.addProduct(headphones);
    app.addProduct(camera);
    app.addProduct(samsungTV);
    app.addProduct(laptop);
    app.addProduct(earphones);
    app.addProduct(adidasJacket);
    app.addProduct(levisJeans);
    app.addProduct(gucciBag);
    app.addProduct(nikeShoes);
    app.addProduct(adidasShirt);
    app.addProduct(runningShoes);
}
seedProducts();
displayMainMenu();
rl.on('close', () => {
    console.log('Exiting the application.');
    process.exit(0);
});

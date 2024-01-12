import { BaseApplication } from './models/application';
import { BaseProduct } from './models/baseClasses';
import {
  GroceryProduct,
  BrandedProduct,
  ElectroProduct,
} from './models/descendantClasses';
import * as readline from 'readline';

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Instantiate the application
const app = new BaseApplication();

// Define a function to display the main menu
function displayMainMenu() {
  console.log('\nAvailable Actions:');
  console.log('1. List all products');
  console.log('2. Add a new product');
  console.log('3. Search for a product');
  console.log('4. Exit');

  rl.question('Enter your choice: ', answer => {
    switch (answer.trim()) {
      case '1':
        app.displayProducts();
        break;
      case '2':
        addProduct();
        break;
      case '3':
        searchProduct();
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

//  addProduct function
function addProduct(): void {
  rl.question('Enter product name: ', name => {
    rl.question('Enter product price: ', price => {
      rl.question('Enter product category: ', category => {
        // Assuming 'BaseProduct' accepts category and price is converted to number
        const newProduct = new BaseProduct(
          Date.now(),
          name,
          parseFloat(price),
          category
        );
        app.addProduct(newProduct);
        console.log(`${name} has been added to the product list.`);
        displayMainMenu();
      });
    });
  });
}

//  searchProduct function
function searchProduct(): void {
  rl.question('Enter search keyword: ', keyword => {
    rl.question('Enter category (optional): ', category => {
      rl.question('Enter minimum price (optional): ', minPrice => {
        rl.question('Enter maximum price (optional): ', maxPrice => {
          const searchResults = app.searchProducts(
            keyword

            // Assuming 'rating' is implemented in your 'searchProducts' method
            // You would also ask for a rating input here if necessary
          );
          console.log('\nSearch Results:');
          if (searchResults.length) {
            searchResults.forEach(result => result.display());
          } else {
            console.log('No products found.');
          }
          displayMainMenu();
        });
      });
    });
  });
}

// Seed with some products
function seedProducts() {
  // More grocery products
  const milk = new GroceryProduct(11, 'Milk', 0.99);
  const bread = new GroceryProduct(12, 'Bread', 1.2);
  const cheese = new GroceryProduct(13, 'Cheese', 3.5);
  const apple = new GroceryProduct(1, 'Apple', 1.5);
  const coke = new GroceryProduct(2, 'Coca-Cola', 2.0);
  const banana = new GroceryProduct(5, 'Banana', 0.5);
  const orangeJuice = new GroceryProduct(8, 'Orange Juice', 3.0);
  // More electronic products
  const smartphone = new ElectroProduct(14, 'Smartphone', 499.99);
  const headphones = new ElectroProduct(15, 'Headphones', 89.99);
  const camera = new ElectroProduct(16, 'Camera', 259.99);
  const samsungTV = new ElectroProduct(3, 'Samsung TV', 899.99);
  const laptop = new ElectroProduct(6, 'Dell Laptop', 1200.0);
  const earphones = new ElectroProduct(9, 'Wireless Earphones', 59.99);

  // More branded products
  const adidasJacket = new BrandedProduct(17, 'Adidas Jacket', 79.99);
  const levisJeans = new BrandedProduct(18, 'Jeans', 59.99);
  const gucciBag = new BrandedProduct(19, 'Gucci Handbag', 550.0);
  const nikeShoes = new BrandedProduct(4, 'Nike Shoes', 99.99);
  const adidasShirt = new BrandedProduct(7, 'Adidas T-Shirt', 35.0);
  const runningShoes = new BrandedProduct(10, 'Running Shoes', 85.0);

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

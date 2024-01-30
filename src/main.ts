import { BaseApplication } from './models/application';
import { BaseProduct } from './models/baseClasses';
import {
  GroceryProduct,
  BrandedProduct,
  ElectroProduct,
} from './models/descendantClasses';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = new BaseApplication();

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
        rl.question(
          'Enter the name of the product to remove: ',
          (name: string) => {
            app.removeProduct(name);
            app.saveDataToFile('src/products.json');
            displayMainMenu();
          }
        );
        break;
      case '5':
        console.log('Exiting application.');
        rl.close();
        break;
      default:
        console.log('Invalid choice, please try again.');
        displayMainMenu();
        break;
    }
  });
}

async function addProduct(): Promise<void> {
  const name = await askQuestion('Enter product name: ');
  const price = await askQuestion('Enter product price: ');
  const category = await askQuestion('Enter product category: ');

  const productId = Date.now(); // Unique ID for the product
  const parsedPrice = parseFloat(price);
  let newProduct;

  switch (category.toLowerCase()) {
    case 'grocery':
      newProduct = new GroceryProduct(productId, name, parsedPrice);
      break;
    case 'electronics':
      newProduct = new ElectroProduct(productId, name, parsedPrice);
      break;
    case 'branded':
      newProduct = new BrandedProduct(productId, name, parsedPrice);
      break;
    default:
      newProduct = new BaseProduct(productId, name, parsedPrice, category);
      break;
  }

  app.addProduct(newProduct);
  console.log(
    `${name} has been added to the product list under ${category} category.`
  );
  displayMainMenu();
}

function searchProduct(): void {
  rl.question('Enter search keyword: ', (keyword) => {
    rl.question(
      'Enter category (optional, leave blank to ignore): ',
      (category) => {
        rl.question(
          'Enter minimum price (optional, leave blank to ignore): ',
          (minPriceString) => {
            rl.question(
              'Enter maximum price (optional, leave blank to ignore): ',
              (maxPriceString) => {
                // Parse minimum and maximum prices
                const minPrice = minPriceString
                  ? parseFloat(minPriceString)
                  : undefined;
                const maxPrice = maxPriceString
                  ? parseFloat(maxPriceString)
                  : undefined;

                // Search products in the application
                const searchResults = app.searchProducts(
                  keyword,
                  category || undefined,
                  minPrice,
                  maxPrice
                );

                console.log('\nSearch Results:');
                if (searchResults.length) {
                  searchResults.forEach((product) => product.display());
                } else {
                  console.log('No products found matching your criteria.');
                }

                displayMainMenu();
              }
            );
          }
        );
      }
    );
  });
}

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function seedProducts(): void {
  // Grocery products
  const milk = new GroceryProduct(11, 'Milk', 0.99);
  const bread = new GroceryProduct(12, 'Bread', 1.2);
  const cheese = new GroceryProduct(13, 'Cheese', 3.5);
  const apple = new GroceryProduct(1, 'Apple', 1.5);
  const coke = new GroceryProduct(2, 'Coca-Cola', 2.0);
  const banana = new GroceryProduct(5, 'Banana', 0.5);
  const orangeJuice = new GroceryProduct(8, 'Orange Juice', 3.0);

  // Electronic products
  const smartphone = new ElectroProduct(14, 'Smartphone', 499.99);
  const headphones = new ElectroProduct(15, 'Headphones', 89.99);
  const camera = new ElectroProduct(16, 'Camera', 259.99);
  const samsungTV = new ElectroProduct(3, 'Samsung TV', 899.99);
  const laptop = new ElectroProduct(6, 'Dell Laptop', 1200.0);
  const earphones = new ElectroProduct(9, 'Wireless Earphones', 59.99);

  // Branded products
  const adidasJacket = new BrandedProduct(17, 'Adidas Jacket', 79.99);
  const levisJeans = new BrandedProduct(18, 'Jeans', 59.99);
  const gucciBag = new BrandedProduct(19, 'Gucci Handbag', 550.0);
  const nikeShoes = new BrandedProduct(4, 'Nike Shoes', 99.99);
  const adidasShirt = new BrandedProduct(7, 'Adidas T-Shirt', 35.0);
  const runningShoes = new BrandedProduct(10, 'Running Shoes', 85.0);

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

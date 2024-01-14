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
exports.BaseApplication = exports.BaseReceipt = exports.BaseOrder = exports.BaseCatalogue = exports.BaseCategory = exports.BrandedProduct = exports.ElectroProduct = exports.GroceryProduct = exports.BaseProduct = void 0;
const fs = __importStar(require("fs"));
class BaseProduct {
    constructor(id, name, price, category, rating) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.rating = rating;
    }
    display() {
        console.log(`${this.name} - $${this.price}`);
    }
}
exports.BaseProduct = BaseProduct;
class GroceryProduct extends BaseProduct {
    constructor(id, name, price, category = 'Grocery', rating) {
        super(id, name, price, category, rating);
    }
}
exports.GroceryProduct = GroceryProduct;
class ElectroProduct extends BaseProduct {
    constructor(id, name, price, category = 'Electronics', rating, warrantyPeriod) {
        super(id, name, price, category, rating);
        this.warrantyPeriod = warrantyPeriod;
    }
    displayWarrantyInfo() {
        if (this.warrantyPeriod) {
            console.log(`Warranty Information for ${this.name}:`);
            console.log(`Warranty Period: ${this.warrantyPeriod} months`);
        }
        else {
            console.log('Warranty information is not available for this product.');
        }
    }
}
exports.ElectroProduct = ElectroProduct;
class BrandedProduct extends BaseProduct {
    constructor(id, name, price, category = 'Branded', rating, brandName) {
        super(id, name, price, category, rating);
        this.brandName = brandName;
    }
    displayBrandInfo() {
        if (this.brandName) {
            console.log(`Product Name: ${this.name}`);
            console.log(`Brand Name: ${this.brandName}`);
        }
        else {
            console.log('Brand information not available.');
        }
    }
}
exports.BrandedProduct = BrandedProduct;
class BaseCategory {
    constructor(id, name, products = []) {
        this.id = id;
        this.name = name;
        this.products = products;
    }
    addProduct(product) {
        this.products.push(product);
    }
    listProducts() {
        console.log(`Products in ${this.name} category:`);
        this.products.forEach((p) => console.log(`- ${p.name}`));
    }
}
exports.BaseCategory = BaseCategory;
class BaseCatalogue {
    constructor() {
        this.categories = [];
    }
    addProductToCategory(productId, categoryId) {
        const category = this.categories.find((c) => c.id === categoryId);
        if (category) {
            const product = new BaseProduct(productId, `Product ${productId}`, 0);
            category.products.push(product);
        }
    }
    deleteCategory(categoryId) {
        this.categories = this.categories.filter((c) => c.id !== categoryId);
    }
    displayCategories() {
        console.log('Categories:');
        this.categories.forEach((category) => {
            console.log(`${category.name} (ID: ${category.id})`);
            category.products.forEach((product) => {
                console.log(`  - ${product.name} (ID: ${product.id}, Price: $${product.price})`);
            });
        });
    }
}
exports.BaseCatalogue = BaseCatalogue;
class BaseOrder {
    constructor() {
        this.id = ++BaseOrder.orderCount;
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    removeProduct(productId) {
        this.products = this.products.filter((p) => p.id !== productId);
    }
    displayOrder() {
        console.log(`Order ${this.id}:`);
        this.products.forEach((product) => product.display());
    }
    deleteOrder(orderId) {
        // Implement logic to delete an order
    }
}
exports.BaseOrder = BaseOrder;
BaseOrder.orderCount = 0;
class BaseReceipt {
    generateReceipt(order) {
        console.log(`Receipt for Order ${order.id}:`);
        order.products.forEach((product) => product.display());
        console.log('Total Amount:', order.products.reduce((sum, product) => sum + product.price, 0));
    }
    generateInvoice(order) {
        console.log(`Invoice for Order ${order.id}:`);
        order.products.forEach((product) => {
            console.log(`  - ${product.name} - $${product.price}`);
        });
        console.log('Total Amount:', order.products.reduce((sum, product) => sum + product.price, 0));
    }
}
exports.BaseReceipt = BaseReceipt;
class BaseApplication {
    constructor() {
        this.products = [];
        this.orders = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    removeProduct(productId) {
        this.products = this.products.filter((p) => p.id !== productId);
    }
    displayProducts() {
        console.log('Products:');
        this.products.forEach((product) => product.display());
    }
    searchProducts(keyword, category, minPrice, maxPrice, rating) {
        return this.products.filter((product) => {
            const matchesKeyword = product.name
                .toLowerCase()
                .includes(keyword.toLowerCase());
            const matchesCategory = category ? product.category === category : true;
            const matchesPriceRange = minPrice && maxPrice
                ? product.price >= minPrice && product.price <= maxPrice
                : true;
            const matchesRating = rating ? product.rating === rating : true;
            return (matchesKeyword && matchesCategory && matchesPriceRange && matchesRating);
        });
    }
    createOrder() {
        const order = new BaseOrder();
        this.orders.push(order);
        return order;
    }
    deleteOrder(orderId) {
        this.orders = this.orders.filter((order) => order.id !== orderId);
    }
    saveDataToFile(filename) {
        const dataToSave = {
            products: this.products,
            orders: this.orders,
        };
        fs.writeFileSync(filename, JSON.stringify(dataToSave));
        console.log(`Data saved to ${filename}`);
    }
}
exports.BaseApplication = BaseApplication;

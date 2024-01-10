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
exports.BaseApplication = exports.BaseReceipt = exports.BaseOrder = exports.BaseCatalogue = exports.BaseCategory = exports.BaseProduct = void 0;
const fs = __importStar(require("fs"));
class BaseProduct {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    display() {
        console.log(`${this.name} - $${this.price}`);
    }
}
exports.BaseProduct = BaseProduct;
class BaseCategory {
    constructor(id, name, products = []) {
        this.id = id;
        this.name = name;
        this.products = products;
    }
}
exports.BaseCategory = BaseCategory;
class BaseCatalogue {
    constructor() {
        this.categories = [];
    }
    addProductToCategory(productId, categoryId) {
        // Find the category by ID
        const category = this.categories.find((c) => c.id === categoryId);
        // If the category exists, add the product to it
        if (category) {
            const product = new BaseProduct(productId, `Product ${productId}`, 0); // You can set the actual product details
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
    searchProducts(keyword) {
        return this.products.filter((p) => p.name.toLowerCase().includes(keyword.toLowerCase()));
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

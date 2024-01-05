"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApplication = exports.BaseReceipt = exports.BaseOrder = exports.BaseCatalogue = exports.BaseCategory = exports.BaseProduct = void 0;
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
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
exports.BaseCategory = BaseCategory;
class BaseCatalogue {
    constructor() {
        this.categories = [];
    }
    addProductToCategory(productId, categoryId) {
        // Implement logic to associate a product with a category
    }
}
exports.BaseCatalogue = BaseCatalogue;
class BaseOrder {
    constructor(id, products) {
        this.id = id;
        this.products = products;
    }
}
exports.BaseOrder = BaseOrder;
class BaseReceipt {
    generateReceipt(order) {
        // Implement logic to generate a receipt
    }
}
exports.BaseReceipt = BaseReceipt;
class BaseApplication {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    removeProduct(productId) {
        this.products = this.products.filter(p => p.id !== productId);
    }
    displayProducts() {
        this.products.forEach(product => product.display());
    }
    searchProducts(keyword) {
        return this.products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
    }
}
exports.BaseApplication = BaseApplication;

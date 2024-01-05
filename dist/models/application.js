"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApplication = void 0;
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

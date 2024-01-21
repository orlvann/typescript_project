"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApplication = void 0;
class BaseApplication {
    constructor() {
        this.products = [];
        this.orders = [];
        this.categories = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    removeProduct(productId) {
        this.products = this.products.filter((p) => p.id !== productId);
    }
    displayProducts() {
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
}
exports.BaseApplication = BaseApplication;

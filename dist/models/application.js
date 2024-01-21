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
exports.BaseApplication = void 0;
const fs = __importStar(require("fs"));
class BaseApplication {
    constructor() {
        this.products = [];
        this.orders = [];
        this.categories = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    removeProduct(productName) {
        const productIndex = this.products.findIndex((p) => p.name.toLowerCase() === productName.toLowerCase());
        if (productIndex > -1) {
            this.products.splice(productIndex, 1);
            console.log(`Product ${productName} has been removed.`);
        }
        else {
            console.log(`Product ${productName} not found.`);
        }
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
    saveDataToFile(filename) {
        const dataToSave = {
            products: this.products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                rating: product.rating,
                warrantyPeriod: product.warrantyPeriod,
                brandName: product.brandName,
            })),
            orders: this.orders,
            categories: this.categories,
        };
        fs.writeFileSync(filename, JSON.stringify(dataToSave, null, 2));
        console.log(`Data saved to ${filename}`);
    }
}
exports.BaseApplication = BaseApplication;

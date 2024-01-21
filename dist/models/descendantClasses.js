"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleReceipt = exports.Invoice = exports.ElectroProduct = exports.BrandedProduct = exports.GroceryProduct = void 0;
const baseClasses_1 = require("./baseClasses");
class GroceryProduct extends baseClasses_1.BaseProduct {
}
exports.GroceryProduct = GroceryProduct;
class BrandedProduct extends baseClasses_1.BaseProduct {
}
exports.BrandedProduct = BrandedProduct;
class ElectroProduct extends baseClasses_1.BaseProduct {
}
exports.ElectroProduct = ElectroProduct;
class Invoice extends baseClasses_1.BaseReceipt {
}
exports.Invoice = Invoice;
class SimpleReceipt extends baseClasses_1.BaseReceipt {
}
exports.SimpleReceipt = SimpleReceipt;

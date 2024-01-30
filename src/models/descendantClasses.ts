import { BaseProduct, BaseReceipt } from './baseClasses';

export class GroceryProduct extends BaseProduct {}

export class BrandedProduct extends BaseProduct {}
export class ElectroProduct extends BaseProduct {}

export class Invoice extends BaseReceipt {}

export class SimpleReceipt extends BaseReceipt {}

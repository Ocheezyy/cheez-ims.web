export enum PaymentMethod {
  Cash = 0,
  CreditCard = 1,
  Bitcoin = 2,
}

export enum OrderStatus {
  Pending,
  Processing,
  Shipped,
  Delivered,
  Canceled,
  Returned,
}

export enum PaymentStatus {
  Pending = 0,
  Paid = 1,
  Refunded = 2,
}

export enum ActivityType {
  CreateOrder = 0,
  CreateProduct = 1,
  RestockProduct = 2,
  LowStockProduct = 3,
  CreateSupplier = 4
}

export enum ProductStatus {
  InStock,
  LowStock,
  OutOfStock,
  Discontinued,
}

export enum SupplierStatus {
  Inactive,
  OnHold,
  New,
  Active
}

export interface Category {
  id?: string;
  name: string | null;
  description: string | null;
}

export interface OrderItem {
  id?: string;
  quantity: number;
  unitPrice: number;
  orderId: string;
  order: Order;
  productId: string;
  product: Product;
}

export interface Order {
  id: string;
  orderNumber: number;
  orderDate: Date;
  deliveryDate?: Date;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: string;
  userId: string | null;
  user: User;
  orderItems?: OrderItem[];
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  phone: string;
}

export interface Product {
  id: string;
  name: string | null;
  description: string | null;
  sku: string | null;
  price?: number;
  status: ProductStatus;
  stockQuantity?: number;
  reorderLevel?: number;
  categoryId: string;
  category: Category;
  supplierId: string;
  supplier: Supplier;
  orderItems?: OrderItem[];
}

export interface Supplier {
  id: string;
  name: string;
  contactEmail: string;
  phone: string;
  address: string;
  status: SupplierStatus;
  rating: number;
}

export interface Activity {
  id?: string;
  activityType: ActivityType;
  message: string;
  timestamp: string;
  userId: string;
  user?: User;
}

export interface ActivityWUser {
  id: string;
  activityType: ActivityType;
  message: string;
  timestamp: string;
  userId: string;
  user: User;
}

export interface DashboardOverview {
  month: string; // "MM YY"
  sortDate: string;
  totalAmount: number;
}

export interface DashboardOverviewStats {
  totalInventory: number;
  lowStockInventory: number;
  totalValue: number;
  activeOrders: number;
}

export interface SupplierOrder {
  id: string;
  orderNumber: number;
  orderDate: Date;
  deliveryDate?: Date;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: string;
  orderItemCount: number;
}
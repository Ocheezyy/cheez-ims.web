export enum PaymentMethod {
  Cash = 0,
  CreditCard = 1,
  Bitcoin = 2,
}

export enum OrderStatus {
  Pending = 0,
  Shipped = 1,
  Delivered = 2,
  Canceled = 3,
  Returned = 4,
}

export enum PaymentStatus {
  Pending = 0,
  Paid = 1,
  Refunded = 2,
}

export interface Category {
  id?: string;
  name: string | null;
  description: string | null;
}

export interface OrderItem {
  id?: string;
  quantity?: number;
  unitPrice?: number;
  orderId: string;
  order: Order;
  productId: string;
  product: Product;
}

export interface Order {
  id?: string;
  orderDate?: Date;
  deliveryDate?: Date;
  totalAmount?: number;
  paymentMethod: PaymentMethod;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  userId: string | null;
  user: User;
  orderItems?: OrderItem[];
}

export interface User {
  id?: string;
  userName?: string;
  normalizedUserName?: string;
  email?: string;
  normalizedEmail?: string;
  emailConfirmed?: boolean;
  passwordHash?: string;
  securityStamp?: string;
  concurrencyStamp?: string;
  phoneNumber?: string;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnd?: Date;
  lockoutEnabled?: boolean;
  accessFailedCount?: number;
  firstName: string | null;
  lastName?: string;
}

export interface Product {
  id?: string;
  name: string | null;
  description: string | null;
  sku: string | null;
  price?: number;
  stockQuantity?: number;
  reorderLevel?: number;
  categoryId: string;
  category: Category;
  supplierId: string;
  supplier: Supplier;
  orderItems?: OrderItem[];
}

export interface Supplier {
  id?: string;
  name: string | null;
  contactEmail: string | null;
  phone: string | null;
  address: string | null;
}

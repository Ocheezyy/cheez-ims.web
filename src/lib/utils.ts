import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ProductStatus,
  SupplierStatus,
  User,
} from "@/types.ts";
import parsePhoneNumberFromString from "libphonenumber-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumbers(isCurrency: boolean, num: number = 0): string {
  if (isCurrency)
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2, // Ensures two decimal places
    }).format(num);

  return num.toLocaleString("en-US");
}

export const getTimeDifference = (
  utcTimestamp: string | number | Date,
): string => {
  const now = new Date();
  const past = new Date(utcTimestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} days ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} months ago`;
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
};

export const getUserInitials = (user: User) => {
  return user.firstName.charAt(0) + user.lastName.charAt(0);
};

export const getProductStatusText = (status: ProductStatus) => {
  switch (status) {
    case ProductStatus.OutOfStock:
      return "Out of stock";
    case ProductStatus.InStock:
      return "In stock";
    case ProductStatus.LowStock:
      return "Low stock";
    default:
      return "";
  }
};

export const getProductStatusColor = (status: ProductStatus) => {
  switch (status) {
    case ProductStatus.InStock:
      return "bg-green-500/15 text-green-600 hover:bg-green-500/25";
    case ProductStatus.LowStock:
      return "bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25";
    case ProductStatus.OutOfStock:
      return "bg-red-500/15 text-red-600 hover:bg-red-500/25";
    default:
      return "bg-slate-500/15 text-slate-600 hover:bg-slate-500/25";
  }
};

export const getOrderStatusColor = (status?: OrderStatus) => {
  switch (status) {
    case OrderStatus.Delivered:
      return "bg-green-500/15 text-green-600 hover:bg-green-500/25";
    case OrderStatus.Processing:
      return "bg-blue-500/15 text-blue-600 hover:bg-blue-500/25";
    case OrderStatus.Shipped:
      return "bg-purple-500/15 text-purple-600 hover:bg-purple-500/25";
    case OrderStatus.Pending:
      return "bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25";
    case OrderStatus.Canceled:
      return "bg-red-500/15 text-red-600 hover:bg-red-500/25";
    case OrderStatus.Returned:
      return "bg-blue-500/15 text-blue-600 hover:bg-blue-500/25";
    default:
      return "bg-slate-500/15 text-slate-600 hover:bg-slate-500/25";
  }
};

export const getOrderStatusText = (status?: OrderStatus) => {
  switch (status) {
    case OrderStatus.Delivered:
      return "Delivered";
    case OrderStatus.Processing:
      return "Processing";
    case OrderStatus.Shipped:
      return "Shipped";
    case OrderStatus.Pending:
      return "Pending";
    case OrderStatus.Canceled:
      return "Canceled";
    case OrderStatus.Returned:
      return "Returned";
    default:
      return "";
  }
};

export const getPaymentStatusColor = (status?: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.Paid:
      return "bg-green-500/15 text-green-600 hover:bg-green-500/25";
    case PaymentStatus.Pending:
      return "bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25";
    case PaymentStatus.Refunded:
      return "bg-blue-500/15 text-blue-600 hover:bg-blue-500/25";
    default:
      return "bg-slate-500/15 text-slate-600 hover:bg-slate-500/25";
  }
};

export const getPaymentStatusText = (status?: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.Paid:
      return "Paid";
    case PaymentStatus.Pending:
      return "Pending";
    case PaymentStatus.Refunded:
      return "Refunded";
    default:
      return "";
  }
};

export const getPaymentMethodText = (method?: PaymentMethod) => {
  switch (method) {
    case PaymentMethod.Bitcoin:
      return "Bitcoin";
    case PaymentMethod.Cash:
      return "Cash";
    case PaymentMethod.CreditCard:
      return "CreditCard";
    default:
      return "";
  }
};

export const getSupplierStatusColor = (status?: SupplierStatus) => {
  switch (status) {
    case SupplierStatus.Active:
      return "bg-green-500/15 text-green-600 hover:bg-green-500/25";
    case SupplierStatus.Inactive:
      return "bg-red-500/15 text-red-600 hover:bg-red-500/25";
    case SupplierStatus.OnHold:
      return "bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25";
    case SupplierStatus.New:
      return "bg-blue-500/15 text-blue-600 hover:bg-blue-500/25";
    default:
      return "bg-slate-500/15 text-slate-600 hover:bg-slate-500/25";
  }
};

export const getSupplierStatusText = (status?: SupplierStatus) => {
  switch (status) {
    case SupplierStatus.Active:
      return "Active";
    case SupplierStatus.Inactive:
      return "Inactive";
    case SupplierStatus.OnHold:
      return "On Hold";
    case SupplierStatus.New:
      return "New";
    default:
      return "";
  }
};

export function formatPhoneNumber(phone?: string): string | undefined {
  if (!phone) return;
  const phoneNumber = parsePhoneNumberFromString(phone, "US");
  if (phoneNumber) return phoneNumber.formatNational();
  return undefined;
}

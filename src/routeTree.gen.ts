/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as SuppliersIndexImport } from './routes/suppliers/index'
import { Route as ReportsIndexImport } from './routes/reports/index'
import { Route as ProductsIndexImport } from './routes/products/index'
import { Route as OrdersIndexImport } from './routes/orders/index'
import { Route as InventoryIndexImport } from './routes/inventory/index'
import { Route as SuppliersSupplierIdImport } from './routes/suppliers/$supplierId'
import { Route as OrdersOrderIdImport } from './routes/orders/$orderId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SuppliersIndexRoute = SuppliersIndexImport.update({
  id: '/suppliers/',
  path: '/suppliers/',
  getParentRoute: () => rootRoute,
} as any)

const ReportsIndexRoute = ReportsIndexImport.update({
  id: '/reports/',
  path: '/reports/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsIndexRoute = ProductsIndexImport.update({
  id: '/products/',
  path: '/products/',
  getParentRoute: () => rootRoute,
} as any)

const OrdersIndexRoute = OrdersIndexImport.update({
  id: '/orders/',
  path: '/orders/',
  getParentRoute: () => rootRoute,
} as any)

const InventoryIndexRoute = InventoryIndexImport.update({
  id: '/inventory/',
  path: '/inventory/',
  getParentRoute: () => rootRoute,
} as any)

const SuppliersSupplierIdRoute = SuppliersSupplierIdImport.update({
  id: '/suppliers/$supplierId',
  path: '/suppliers/$supplierId',
  getParentRoute: () => rootRoute,
} as any)

const OrdersOrderIdRoute = OrdersOrderIdImport.update({
  id: '/orders/$orderId',
  path: '/orders/$orderId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/orders/$orderId': {
      id: '/orders/$orderId'
      path: '/orders/$orderId'
      fullPath: '/orders/$orderId'
      preLoaderRoute: typeof OrdersOrderIdImport
      parentRoute: typeof rootRoute
    }
    '/suppliers/$supplierId': {
      id: '/suppliers/$supplierId'
      path: '/suppliers/$supplierId'
      fullPath: '/suppliers/$supplierId'
      preLoaderRoute: typeof SuppliersSupplierIdImport
      parentRoute: typeof rootRoute
    }
    '/inventory/': {
      id: '/inventory/'
      path: '/inventory'
      fullPath: '/inventory'
      preLoaderRoute: typeof InventoryIndexImport
      parentRoute: typeof rootRoute
    }
    '/orders/': {
      id: '/orders/'
      path: '/orders'
      fullPath: '/orders'
      preLoaderRoute: typeof OrdersIndexImport
      parentRoute: typeof rootRoute
    }
    '/products/': {
      id: '/products/'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductsIndexImport
      parentRoute: typeof rootRoute
    }
    '/reports/': {
      id: '/reports/'
      path: '/reports'
      fullPath: '/reports'
      preLoaderRoute: typeof ReportsIndexImport
      parentRoute: typeof rootRoute
    }
    '/suppliers/': {
      id: '/suppliers/'
      path: '/suppliers'
      fullPath: '/suppliers'
      preLoaderRoute: typeof SuppliersIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/orders/$orderId': typeof OrdersOrderIdRoute
  '/suppliers/$supplierId': typeof SuppliersSupplierIdRoute
  '/inventory': typeof InventoryIndexRoute
  '/orders': typeof OrdersIndexRoute
  '/products': typeof ProductsIndexRoute
  '/reports': typeof ReportsIndexRoute
  '/suppliers': typeof SuppliersIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/orders/$orderId': typeof OrdersOrderIdRoute
  '/suppliers/$supplierId': typeof SuppliersSupplierIdRoute
  '/inventory': typeof InventoryIndexRoute
  '/orders': typeof OrdersIndexRoute
  '/products': typeof ProductsIndexRoute
  '/reports': typeof ReportsIndexRoute
  '/suppliers': typeof SuppliersIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/orders/$orderId': typeof OrdersOrderIdRoute
  '/suppliers/$supplierId': typeof SuppliersSupplierIdRoute
  '/inventory/': typeof InventoryIndexRoute
  '/orders/': typeof OrdersIndexRoute
  '/products/': typeof ProductsIndexRoute
  '/reports/': typeof ReportsIndexRoute
  '/suppliers/': typeof SuppliersIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/orders/$orderId'
    | '/suppliers/$supplierId'
    | '/inventory'
    | '/orders'
    | '/products'
    | '/reports'
    | '/suppliers'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/orders/$orderId'
    | '/suppliers/$supplierId'
    | '/inventory'
    | '/orders'
    | '/products'
    | '/reports'
    | '/suppliers'
  id:
    | '__root__'
    | '/'
    | '/orders/$orderId'
    | '/suppliers/$supplierId'
    | '/inventory/'
    | '/orders/'
    | '/products/'
    | '/reports/'
    | '/suppliers/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  OrdersOrderIdRoute: typeof OrdersOrderIdRoute
  SuppliersSupplierIdRoute: typeof SuppliersSupplierIdRoute
  InventoryIndexRoute: typeof InventoryIndexRoute
  OrdersIndexRoute: typeof OrdersIndexRoute
  ProductsIndexRoute: typeof ProductsIndexRoute
  ReportsIndexRoute: typeof ReportsIndexRoute
  SuppliersIndexRoute: typeof SuppliersIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  OrdersOrderIdRoute: OrdersOrderIdRoute,
  SuppliersSupplierIdRoute: SuppliersSupplierIdRoute,
  InventoryIndexRoute: InventoryIndexRoute,
  OrdersIndexRoute: OrdersIndexRoute,
  ProductsIndexRoute: ProductsIndexRoute,
  ReportsIndexRoute: ReportsIndexRoute,
  SuppliersIndexRoute: SuppliersIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/orders/$orderId",
        "/suppliers/$supplierId",
        "/inventory/",
        "/orders/",
        "/products/",
        "/reports/",
        "/suppliers/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/orders/$orderId": {
      "filePath": "orders/$orderId.tsx"
    },
    "/suppliers/$supplierId": {
      "filePath": "suppliers/$supplierId.tsx"
    },
    "/inventory/": {
      "filePath": "inventory/index.tsx"
    },
    "/orders/": {
      "filePath": "orders/index.tsx"
    },
    "/products/": {
      "filePath": "products/index.tsx"
    },
    "/reports/": {
      "filePath": "reports/index.tsx"
    },
    "/suppliers/": {
      "filePath": "suppliers/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */

// types/ecommerceOrderResponse.ts

import { DeliveryMethod, OrderStatus, PaymentMethod, Role, UserStatus } from "../AllTypes";

export interface EcommerceOrderResponse {
    data: EcommerceOrder[];
}

export interface EcommerceOrder {
    id: string;
    ordersNumber: string;
    userId: string;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    deliveryMethod: DeliveryMethod;
    amount: number;
    canceledAt: string | null;
    createdAt: string;
    updatedAt: string;
    addedById: string;
    items: EcommerceOrderItem[];
    user: User;
}

export interface EcommerceOrderItem {
    id: string;
    ecommerceOrderId: string;
    productId: string;
    quantity: number;
    price: number;
    product: Product;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    sku: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    categoryId: string;
    serviceId: string;
    addedById: string;
}

export interface User {
    id: string;
    email: string;
    password: string;
    passwordGenerate: string | null;
    name: string;
    role: Role;
    status: UserStatus;
    phoneCountryCode: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
    partnerId: string | null;
}

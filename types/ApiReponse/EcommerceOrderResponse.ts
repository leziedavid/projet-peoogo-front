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
    nom: string;
    code: string;
    description: string;
    quantite: number;
    unite: string;
    imageUrl: string | null;
    prixUnitaire: number;
    prixEnGros: number;
    paymentMethod: string;
    saleType: string;
    status: string;
    typeActeur: string;
    disponibleDe: string; // ISO date
    disponibleJusqua: string; // ISO date
    image: string | null;
    autreImage: string | null;
    codeUsers: string;
    addedById: string;
    createdAt: string; // ISO date
    updatedAt: string; // ISO date
    decoupageId: string;
    producer?: EnrichedProducer; // <-- ajouté ici
}



export interface EnrichedProducer {
    id: string;
    name: string;
    phoneNumber?: string | null;
    typeCompte?: string | null;
    totalQuantity: number;
    totalAmount: number;
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

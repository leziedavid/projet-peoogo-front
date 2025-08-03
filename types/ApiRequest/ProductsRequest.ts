// ProductRequest.ts

import { Decoupage, TypeCompte } from "./EnrollementRequest";


export interface ProductsRequest {
    libelle: string;
    paymentMethod: string;
    unit: string;
    quantity: number;
    price: number;
    saleType: string;
    type_acteur: TypeCompte; // ou string si ce n’est pas encore strictement typé
    availableStartDate: string; // Format ISO ou format YYYY-MM-DD
    availableEndDate: string;   // idem
    description: string;
    images?: File;         // ⬅️ maintenant optionnel
    autre_images?: File;   // ⬅️ maintenant optionnel
    decoupage: Decoupage;
}

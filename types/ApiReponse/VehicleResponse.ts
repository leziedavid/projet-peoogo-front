import { FileManager } from "../AllTypes"

export interface Partner {
    id: string;
    email: string;
    password: string;
    name: string;
    role: string;
    status: string;
    phoneCountryCode: string | null;
    phoneNumber: string | null;
    createdAt: string;
    updatedAt: string;
    partnerId: string | null;
}

export interface Driver {
    id: string;
    email: string;
    password: string;
    name: string;
    role: string;
    status: string;
    phoneCountryCode: string | null;
    phoneNumber: string | null;
    createdAt: string;
    updatedAt: string;
    partnerId: string | null;
}

export interface Vehicle {
    id: string;
    name: string;
    brand: string;
    capacity: number;
    fuel: string;
    color: string;
    model: string;
    registration: string;
    licensePlate: string;
    serialNumber: string;
    type: string;
    partnerId: string;
    createdAt: string;
    updatedAt: string;
    partner: Partner;
    drivers: Driver[];
    files: FileManager[];
}


export interface ListesVehicle {
    id: string;
    name: string;
    brand: string;
    capacity: number;
    fuel: string;
    color: string;
    model: string;
    registration: string;
    licensePlate: string;
    serialNumber: string;
    type: string;
    partnerId: string;
    createdAt: string;
    updatedAt: string;
    files: FileManager[];
}

export interface VehicleApiResponse {
    statusCode: number;
    statusMessage: string;
    data: {
        status: boolean;
        total: number;
        page: number;
        limit: number;
        data: Vehicle[];
    };
}

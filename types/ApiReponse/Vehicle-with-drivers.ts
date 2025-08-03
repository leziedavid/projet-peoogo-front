// types/vehicle-with-drivers.ts
// ------------------------------------------------------------------

import {UserStatus, VehicleType } from "../AllTypes";

// Conducteur (driver) assigné à un véhicule
export interface DriverInfo {
    id: string;
    name: string;
    email: string;
    phoneNumber: string | null; // ← selon ton schéma, peut être null
    status:UserStatus;
    createdAt: string;
    passwordGenerate: string | null; // ← selon ton schéma, peut être null
    image: string | null; // URL Cloudinary ou null si pas d’image
}

// Véhicule enrichi de la liste complète de ses conducteurs
export interface VehicleWithDrivers {
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
    type: VehicleType;
    partnerId: string;
    createdAt: string;
    updatedAt: string;
    drivers: DriverInfo[];
}




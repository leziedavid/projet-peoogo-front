"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Vehicle } from "@/types/AllTypes";
import { ListesVehicle } from "@/types/ApiReponse/VehicleResponse";

interface SelectVehicleProps {

    value: string;
    onValueChange: (value: string) => void;
    isDisabled?: boolean;
    vehicles: ListesVehicle[]; // Ajout de la prop vehicles
    
}

export default function SelectVehicle({
    value,
    onValueChange,
    isDisabled = false,
    vehicles,
}: SelectVehicleProps) {
    return (
        <Select value={value} onValueChange={onValueChange} disabled={isDisabled}>
            <SelectTrigger className="bg-white text-black w-full">
                <SelectValue placeholder="Sélectionner un véhicule" />
            </SelectTrigger>
            <SelectContent>
                {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.brand} {vehicle.model} - {vehicle.name} ({vehicle.licensePlate})
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

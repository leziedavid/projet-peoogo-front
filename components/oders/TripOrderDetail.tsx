'use client'

import Image from "next/image"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/useIsMobile"
import { Order } from "@/types/ApiReponse/ordersResponse"
import { Button } from "@/components/ui/button"
import { formatEstimatedArrival } from "@/lib/formatEstimatedArrival"
import { useEffect, useState } from "react"
import { getUserRole, Role } from "@/app/middleware"

interface TripOrderDetailProps {
    data: Order
    onClose: () => void
    isOpen: boolean
}

export default function TripOrderDetail({ data, onClose, isOpen }: TripOrderDetailProps) {
    const isMobile = useIsMobile()
    const [roles, setRoles] = useState<Role | null>(null);


    // afficher les bouton  accept / refuse en fonction tu type de compte
    const showAccept = data.status === 'PENDING'
    const showRefuse = data.status === 'PENDING' || data.status === 'VALIDATED'

    const handleAccept = () => {
        console.log("Accepter la commande", data.id)
        // Appel API ici
    }

    const handleReject = () => {
        console.log("Refuser la commande", data.id)
        // Appel API ici
    }

    useEffect(() => {
        const fetchroles = async () => {
            const role = await getUserRole();
            setRoles(role);
        };

        fetchroles();
    }, []);

    // handleContactDriver
    const handleContactDriver = (phoneNumber: string | null) => {
        console.log("Contacter le chauffeur", data.id)
        // Appel API ici
    }



    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent side={isMobile ? "bottom" : "left"} className={isMobile ? "h-[90%] overflow-y-auto" : "w-[400px]"}  >
                <div className="p-4 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Image src="/ride.png" alt="ride" width={32} height={32} />
                            <span className="font-semibold text-sm uppercase">
                                {data.trip.distance > 0 ? 'Véhicule' : 'Livraison'} {data.trip.vehicle.type}, {formatEstimatedArrival(data.createdAt || '') || '00:00'}
                            </span>

                        </div>
                    </div>

                    {/* Lieux */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border-4 border-red-500" />
                            <span className="text-sm">{data.trip.departure}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border-4 border-black" />
                            <span className="text-sm">{data.trip.arrival}</span>
                            <span className="text-gray-500 text-xs ml-2">{formatEstimatedArrival(data.trip.estimatedArrival)}. Estimation d'arrivée</span>
                        </div>
                    </div>

                    {/* Paiement */}
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Coût total</span>
                            <span className="font-bold">{data.trip.price ?? 0} XOF</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>Prix de la commande</span>
                            <span>{data.trip.price ?? 0} XOF</span>
                        </div>
                        <div className="text-sm mt-2">
                            Méthode : {data.paymentMethod === 'ON_ARRIVAL' ? 'Espèces' : 'En ligne'}
                        </div>
                    </div>

                    {/* Conducteur & Véhicule */}
                    <div className="border-t border-gray-200 pt-4 space-y-1 text-sm">
                        <div>
                            <span className="font-semibold">Conducteur</span><br />
                            {data.trip.driver.name}
                        </div>
                        <div>
                            {data.trip.vehicle.color} {data.trip.vehicle.name} {data.trip.vehicle.licensePlate}<br />
                            <span className="text-gray-500">Classe de service {data.trip.vehicle.type}</span>
                        </div>
                    </div>

                    {/* Actions */}

                    {roles && ["ADMIN", "PARTNER", "DRIVER"].includes(roles) ? (

                        <div className="pt-4 border-t border-gray-200 flex gap-2">
                            {/* Bouton Accepter */}
                            {data.status === "PENDING" && (
                                <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white" onClick={handleAccept} >
                                    Accepter
                                </Button>
                            )}

                            {/* Bouton Refuser (si status != CANCELLED ou COMPLETED) */}
                            {data.status !== "CANCELLED" && data.status !== "COMPLETED" && (
                                <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white" onClick={handleReject} >
                                    Refuser
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="pt-4 border-t border-gray-200 flex justify-center space-x-2 py-2 items-center">
                            {/* Bouton toujours visible */}
                            <Button
                                variant="outline"
                                className="text-gray-600 border-gray-300 hover:bg-gray-100"
                                onClick={() => handleContactDriver(data.trip.driver.phoneNumber)}
                            >
                                Contacter le chauffeur
                            </Button>

                            {/* Bouton visible seulement si la commande est active */}
                            {data.status !== "CANCELLED" && data.status !== "COMPLETED" && (
                                <Button
                                    variant="outline"
                                    className="text-gray-600 border-gray-300 hover:bg-gray-100"
                                    onClick={handleReject}
                                >
                                    Annuler la commande
                                </Button>
                            )}
                        </div>
                    )}

                </div>
            </SheetContent>
        </Sheet>
    )
}

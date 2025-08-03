"use client";

import { EcommerceOrder } from "@/types/ApiReponse/EcommerceOrderResponse";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { paymentMethodToFrench } from "@/types/mapping/paymentMethodToFrench";
import { orderStatusToFrench } from "@/types/mapping/orderStatusToFrench";
import { deliveryMethodToFrench } from "@/types/mapping/deliveryMethodToFrench";

type OrdersEcommerceProps = {
    data?: EcommerceOrder;
    isOpen: boolean;
    onClose: () => void;
};

export function OrdersEcommerceDetail({
    data,
    isOpen,
    onClose,
}: OrdersEcommerceProps) {
    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
            <div className="bg-white h-full w-full md:w-[50vw] overflow-y-auto p-6 relative">
                <Button
                    onClick={onClose}
                    className="absolute top-4 right-4 rounded-full w-8 h-8 p-0 bg-red-500 text-white"
                >
                    <X className="w-4 h-4" />
                </Button>

                {/* Détails de la commande */}
                <Card className="shadow-md mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Commande #{data.ordersNumber}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            <span className="font-semibold">Statut :</span>{" "}
                            {orderStatusToFrench[data.status] ?? data.status}
                        </p>
                        <p>
                            <span className="font-semibold">Méthode de paiement :</span>{" "}
                            {paymentMethodToFrench[data.paymentMethod] ?? data.paymentMethod}
                        </p>
                        <p>
                            <span className="font-semibold">Méthode de livraison :</span>{" "}
                            {deliveryMethodToFrench[data.deliveryMethod] ?? data.deliveryMethod}
                        </p>
                        <p>
                            <span className="font-semibold">Montant total :</span>{" "}
                            {data.amount.toLocaleString()} FCFA
                        </p>
                        <p>
                            <span className="font-semibold">Créée le :</span>{" "}
                            {new Date(data.createdAt!).toLocaleString()}
                        </p>
                    </CardContent>
                </Card>

                {/* Infos client */}
                <Card className="shadow-md mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Client</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            <span className="font-semibold">Nom :</span> {data.user?.name}
                        </p>
                        <p>
                            <span className="font-semibold">Email :</span> {data.user?.email}
                        </p>
                        <p>
                            <span className="font-semibold">Téléphone :</span>{" "}
                            {data.user?.phoneCountryCode} {data.user?.phoneNumber}
                        </p>
                    </CardContent>
                </Card>

                {/* Liste des produits */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg">Produits commandés</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {data.items?.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 border p-4 rounded-md"
                            >
                                <div className="w-20 h-20 relative">
                                    <Image
                                        src={item.product.imageUrl ?? "/astronaut-grey-scale.svg"}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{item.product.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.quantity} x {item.price.toFixed(2)} FCFA
                                    </p>
                                    <p className="text-sm font-medium mt-1">
                                        Total: {(item.quantity * item.price).toFixed(2)} FCFA
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

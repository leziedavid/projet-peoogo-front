import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EcommerceOrder, EnrichedProducer } from "@/types/ApiReponse/EcommerceOrderResponse";
import { X } from 'lucide-react';

interface ReversementProps {
    initialValue?: EcommerceOrder;
    isOpen: boolean;
    onClose: () => void;
    fetchData: () => void;
}

export default function Reversement({ initialValue, isOpen, onClose, fetchData }: ReversementProps) {

    const handleReversement = (producer: EnrichedProducer) => {
        if (!initialValue) return;

        const payload = {
            producerId: producer.id,
            orderId: initialValue.id,
            totalQuantity: producer.totalQuantity,
            totalAmount: producer.totalAmount,
        };

        // 🔹 Appel API reversement
        fetch("/api/reversement", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) throw new Error("Erreur reversement");
                return res.json();
            })
            .then(() => {
                alert(`Reversement effectué pour ${producer.name}`);
                fetchData();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50">
            <div className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0 w-full md:w-[50vw] shadow-xl' : 'translate-x-full w-100'} bg-white`}>

                {/* Header */}
                <h2 className="text-xl font-bold mb-4">
                    Reversement sur la commande {initialValue?.ordersNumber}
                </h2>
                <Button onClick={onClose} className="absolute top-2.5 end-2.5 bg-red-500 text-white rounded-full w-8 h-8">
                    <X className="w-4 h-4" />
                </Button>

                {/* Infos commande */}
                {initialValue && (
                    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                        <p><strong>ID :</strong> {initialValue.id}</p>
                        <p><strong>Date :</strong> {new Date(initialValue.createdAt).toLocaleDateString()}</p>
                        <p><strong>Total commande :</strong> {initialValue.amount.toFixed(2)} FCFA</p>
                        <p><strong>Méthode paiement :</strong> {initialValue.paymentMethod}</p>
                    </div>
                )}

                {/* Liste des producteurs */}
                <div className="space-y-4">
                    {initialValue?.items
                        ?.map(item => item.product.producer)
                        ?.filter((producer, index, self) => producer && self.findIndex(p => p?.id === producer?.id) === index)
                        ?.map((producer) => {
                            if (!producer) return null;

                            const platformCommission = producer.totalAmount * 0.18;
                            const producerEarnings = producer.totalAmount - platformCommission;

                            return (
                                <div key={producer.id} className="border p-4 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold">{producer.name}</h3>
                                    <p><strong>Téléphone :</strong> {producer.phoneNumber || "Non renseigné"}</p>
                                    <p><strong>Solde :</strong> {producer.totalAmount.toFixed(2)} FCFA</p>
                                    <p><strong>Gains producteur :</strong> {producerEarnings.toFixed(2)} FCFA</p>
                                    <p><strong>Commission plateforme (18%) :</strong> {platformCommission.toFixed(2)} FCFA</p>
                                    <Button
                                        className="mt-3 bg-red-500 hover:bg-red-600 text-white"
                                        onClick={() => handleReversement(producer)}
                                    >
                                        Reverser
                                    </Button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

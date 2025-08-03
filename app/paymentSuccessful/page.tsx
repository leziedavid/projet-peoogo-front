'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function Page() {
    const ordersNumber = useSearchParams().get('ordersNumber') || 'N/A';

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-16">
            <div className="w-full max-w-md p-6 text-center bg-white rounded-xl shadow-sm">
                {/* Icône de succès */}
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                {/* Titre */}
                <h1 className="mb-2 text-2xl font-bold text-green-600">Paiement validé</h1>

                {/* Message */}
                <p className="text-sm text-gray-600 mb-4">Merci pour votre commande.</p>

                {/* Numéro de commande */}
                <p className="px-4 py-2 mb-4 text-sm text-blue-900 bg-blue-50 rounded">
                    N° commande : <span className="font-semibold">{ordersNumber}</span>
                </p>

                {/* Lien de retour */}
                <a href="/" className="inline-block px-5 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors">
                    Retour à mon compte
                </a>
            </div>
        </div>
    );
}

// Composant Header principal
interface SecuriteProps {
    onClose: () => void
    isOpen: boolean
}

export default function MenuSidebar({ onClose, isOpen }: SecuriteProps) {
    return (

        <div className="w-full max-w-xs bg-white p-6 space-y-6">
            <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-800">Menu</h3>

                <div className="space-y-2">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        AGRIPACK +
                    </button>
                    <button className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium ml-2">
                        PRODUIT AGRICOLE
                    </button>
                </div>

                <div className="space-y-3">
                    <div className="text-gray-600 text-sm">
                        <div className="font-medium">INTRANT</div>
                    </div>
                    <div className="text-gray-600 text-sm">
                        <div className="font-medium">SERVICE VENTE DE MATERIEL</div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="font-medium text-gray-800">Type d'offre</h4>
                    <div className="space-y-2">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            Offre de vente
                        </button>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium ml-2">
                            Offre achat
                        </button>
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-gray-800 mb-2">Filtre</h4>
                    <div className="text-gray-500 text-sm">
                        Filtres disponibles...
                    </div>
                </div>
            </div>
        </div>
    );

};

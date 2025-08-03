'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Fish, Users, Wheat, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Page = () => {

    const [selectedType, setSelectedType] = useState("");
    const router = useRouter();

    const actorTypes = [
        {
            id: 'espace',
            title: 'ESPACE PRODUCTEUR',
            icon: Fish,
            description: 'Gestion des produits'
        },
        {
            id: 'lites',
            title: 'LISTE DE TOUS LES PRODUITS',
            icon: Users,
            description: 'Autres professionnels du secteur'
        }
    ];

    const onClickContinue = (type: string) => {
        switch (type) {
            case 'espace':
                router.push('/dashboard/products');
                break;
            case 'lites':
                router.push('/dashboard/lites-produits');
                break;
            default:
                console.warn("Type inconnu :", type);
                break;
        }
    };

    return (

        <div className="bg-gray-50 flex flex-col items-center justify-center p-4">
            
            <div className="w-full max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">INTERFACE DE GESTION DES PRODUITS</h1>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {actorTypes.map((type) => {
                        const isSelected = selectedType === type.id;

                        return (
                            <Card key={type.id} className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${isSelected ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50' : 'hover:shadow-md bg-white'}`} onClick={() => setSelectedType(type.id)}>
                                <CardContent className="p-8 text-center">
                                    {/* Document Image */}
                                    <div className="mb-6 flex justify-center">
                                        <div className={`w-32 h-40 rounded flex items-center justify-center ${isSelected ? 'bg-blue-50' : 'bg-gray-50'}`}>
                                            <Image src="/icon_default.svg" alt="Document icon" width={180} height={180} className="object-contain" />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h5 className={`text-sm font-semibold mb-2 ${isSelected ? 'text-blue-[#045d28]' : 'text-gray-900'}`}>
                                        {type.title}
                                    </h5>

                                    {/* Check Icon */}
                                    {isSelected && (
                                        <div className="absolute -bottom-2 -right-2">
                                            <div className="w-8 h-8 bg-[#045d28] rounded-full flex items-center justify-center">
                                                <CheckCircle className="w-5 h-5 text-white fill-current" />
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Continue Button */}
                {/* Continue Button */}
                {selectedType && (
                    <div className="text-center mt-12">
                        <button onClick={() => onClickContinue(selectedType)} className="bg-black hover:bg-[#045d28] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200" >
                            Continuer
                        </button>
                    </div>
                )}

            </div>

        </div>

    );
};

export default Page;





// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { User, UserCheck } from 'lucide-react';

// const IdentificationInterface = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
//             <div className="flex items-center gap-2">
//               <Label className="text-sm font-medium text-gray-700">Statut :</Label>
//               <Badge className="bg-green-500 hover:bg-green-500 text-white font-medium">
//                 VALIDE
//               </Badge>
//             </div>
//             <div className="md:col-span-1">
//               <Label className="text-sm font-medium text-gray-700">Identifiant :</Label>
//               <p className="text-sm text-gray-900 font-mono">bffde3ab-f0d3-4832-9c93-5395b868e6be</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <User className="w-4 h-4 text-gray-500" />
//               <Label className="text-sm font-medium text-gray-700">Agent contrôleur :</Label>
//               <p className="text-sm text-gray-900">Djissa Marie-France Josiane</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <UserCheck className="w-4 h-4 text-gray-500" />
//               <Label className="text-sm font-medium text-gray-700">Agent superviseur :</Label>
//               <p className="text-sm text-gray-900">N/A</p>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Documents Section */}
//           <div className="lg:col-span-1">
//             <Card className="h-[800px]">
//               <CardHeader className="bg-gray-600 text-white rounded-t-lg">
//                 <CardTitle className="text-lg font-medium">Document(s)</CardTitle>
//               </CardHeader>
//               <CardContent className="p-0 h-[calc(100%-4rem)] overflow-y-auto">
//                 <div className="p-4 space-y-6">
//                   {/* Photo d'identité */}
//                   <div>
//                     <Label className="text-sm font-medium text-gray-700 mb-2 block">
//                       9. Photo d'identité
//                     </Label>
//                     <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
//                       <img
//                         src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDIwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNjAgMTgwQzYwIDEzNy45IDc3LjkgMTIwIDEwMCAxMjBTMTQwIDEzNy45IDE0MCAxODBINjBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3NDhGIiBmb250LXNpemU9IjEyIj5QaG90byBkJ2lkZW50aXTDqTwvdGV4dD4KPC9zdmc+"
//                         alt="Photo d'identité"
//                         className="w-full h-full object-cover rounded"
//                       />
//                     </div>
//                   </div>

//                   {/* Document d'identité */}
//                   <div>
//                     <Label className="text-sm font-medium text-gray-700 mb-2 block">
//                       12. Photo du document recto
//                     </Label>
//                     <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
//                       <div className="w-full h-full bg-gradient-to-br from-red-100 to-green-100 rounded flex items-center justify-center border-2 border-dashed border-gray-300">
//                         <div className="text-center">
//                           <div className="w-16 h-12 bg-gray-300 rounded mx-auto mb-2"></div>
//                           <p className="text-xs text-gray-600 font-semibold">RÉPUBLIQUE DE CÔTE D'IVOIRE</p>
//                           <p className="text-xs text-gray-500 mt-1">Carte Nationale d'Identité</p>
//                           <div className="text-xs text-gray-700 mt-2 space-y-1">
//                             <p>BIEFFON SIAKA</p>
//                             <p>OUATTARA</p>
//                             <p>N° CI001266254</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Informations Section */}
//           <div className="lg:col-span-2">
//             <Card className="h-[800px]">
//               <CardHeader className="bg-gray-600 text-white rounded-t-lg">
//                 <CardTitle className="text-lg font-medium">Informations</CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 h-[calc(100%-4rem)] overflow-y-auto">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Colonne 1 */}
//                   <div className="space-y-4">
//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">Date et heure de début</Label>
//                       <Input 
//                         value="14-07-2025 23:40:04" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600"
//                       />
//                     </div>

//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">Identifiant de l'enrôleur</Label>
//                       <Input 
//                         value="ad041" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600"
//                       />
//                     </div>

//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">2. Prénoms</Label>
//                       <Input 
//                         value="BIEFFON SIAKA" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600 font-semibold"
//                       />
//                     </div>

//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">5. Sexe</Label>
//                       <Input 
//                         value="Masculin" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600"
//                       />
//                     </div>

//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">7. Si 'Autres précisez votre nationalité :</Label>
//                       <Input 
//                         value="N/A" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600"
//                       />
//                     </div>

//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">10. Justificatif d'identité ?</Label>
//                       <Input 
//                         value="Carte nationale d'identité" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600"
//                       />
//                     </div>

//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">13. Numéro Principal ?</Label>
//                       <Input 
//                         value="0707364699" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600 font-mono"
//                       />
//                     </div>

//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">15. Capacité physique réduite</Label>
//                       <Input 
//                         value="Non" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600"
//                       />
//                     </div>
//                   </div>

//                   {/* Colonne 2 */}
//                   <div className="space-y-4">
//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">Date et heure de fin</Label>
//                       <Input 
//                         value="15-07-2025 00:35:45" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600"
//                       />
//                     </div>

//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">1. Nom</Label>
//                       <Input 
//                         value="OUATTARA" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600 font-semibold"
//                       />
//                     </div>

//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">4. Lieu de naissance</Label>
//                       <Input 
//                         value="SEREADJI CIV" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600"
//                       />
//                     </div>

//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">6. Nationalité</Label>
//                       <Input 
//                         value="Ivoirienne" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600"
//                       />
//                     </div>

//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">8. Situation matrimoniale ?</Label>
//                       <Input 
//                         value="Mariage traditionnel" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600"
//                       />
//                     </div>

//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">11. Autres justificatif d'identité</Label>
//                       <Input 
//                         value="N/A" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600"
//                       />
//                     </div>

//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">14. Confirmer numéro Principal ?</Label>
//                       <Input 
//                         value="0707364699" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600 font-mono"
//                       />
//                     </div>

//                     <div>
//                       <Label className="text-sm font-medium text-gray-700">16. Langue parlée ?</Label>
//                       <Input 
//                         value="Malinké" 
//                         disabled 
//                         className="mt-1 bg-gray-100 text-gray-600"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IdentificationInterface;
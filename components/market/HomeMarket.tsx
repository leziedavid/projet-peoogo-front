'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/ApiReponse/ProduitsResponse';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ProductLoader from './ProductLoader';
import { useRouter } from "next/navigation";

// Fake data
const products: Product[] = Array.from({ length: 8 }).map((_, i) => ({
    id: `prod${i}`,
    nom: ['MANIOC', 'PIMENT', 'MAÏS', 'OIGNON', 'RIZ PADDY', 'TOMATE'][i % 6],
    code: `PUB1002025${i}X00${i}`,
    description: '',
    quantite: [5, 1, 25, 19, 22, 30][i % 6],
    unite: ['TRICYCLE(S)', 'SAC(S)', 'SAC(S)', 'FILET(S)', 'KG', 'KG'][i % 6],
    imageUrl: `/products.jpg`,
    prixUnitaire: [84000, 21000, 36750, 15225, 215, 232][i % 6],
    prixEnGros: 0,
    paymentMethod: 'Mobile Money',
    saleType: i % 2 === 0 ? 'Vente en détail' : 'Vente en gros',
    status: 'published',
    typeActeur: 'agriculteur',
    disponibleDe: '',
    disponibleJusqua: '',
    image: null,
    autreImage: null,
    codeUsers: '',
    addedById: '',
    createdAt: "2025-07-30",
    updatedAt: "2025-07-31",
    decoupageId: '',
    decoupage: {
        id: '', nombreEnroler: 0, districtId: '', regionId: '', departmentId: '', sousPrefectureId: '', localiteId: '',
        district: { id: '', nom: '', statut: null },
        region: { id: '', nom: 'Indenie-Djuablin', statut: null, districtId: '' },
        department: { id: '', nom: '', regionId: '' },
        sousPrefecture: { id: '', nom: '', departmentId: '' },
        localite: { id: '', nom: ['Abidjan', 'Tchologo', 'Iffou'][i % 3], sousPrefectureId: '' },
    },
    addedBy: {
        id: '', email: '', password: '', codeGenerate: null, passwordGenerate: '', enrollementsId: null,
        name: '', role: '', status: '', phoneCountryCode: '', phoneNumber: '', typeCompte: null,
        createdAt: '', updatedAt: ''
    },
    statut: 'VALIDE',
    images: [],
    userInfo: {
        id: '', name: 'Producteur', email: '', phoneNumber: '', wallet: null, generatedCode: null, code: '', photo: ''
    }
}));

export default function HomeMarket() {

    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR').format(price);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return "il y a 1 jour";
        if (diffDays === 2) return "il y a 2 jours";
        return `il y a ${diffDays} jours`;
    };

    useEffect(() => {
        // Simulation d'un chargement de 5 secondes
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        // <div className="w-full py-50 mt-5 lg:py-2 bg-gray-500">

            <div className="md:container md:mx-auto mt-5">
                {isLoading ? (
                    <ProductLoader />
                ) : (
                    <>
                        <div className="flex flex-col items-start px-1">
                            <div className="flex gap-2 flex-col mb-4">
                                <h2 className="text-3xl md:text-2xl  tracking-tighter max-w-xl font-bold text-left">
                                    Des produits frais
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-1">
                            {products.map((product) => (
                                <div key={product.id} className="flex flex-col gap-2 cursor-pointer">
                                    <Link href={`/show/${product.id}`} passHref>
                                        <div className="relative w-full bg-muted rounded-md aspect-video mb-1 overflow-hidden w-full h-32 md:h-40">
                                            <Image src={product.imageUrl || "/astronaut-grey-scale.svg"} alt={product.nom} className="object-cover rounded-md" fill />
                                            <div className="absolute top-2 right-2">
                                                <Badge variant="secondary" className="text-xs px-2 py-1 bg-black/60 text-white">
                                                    {product.saleType}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="p-3 text-sm">
                                            <p className="bg-muted font-bold text-[11px] py-[2px] px-2 rounded-md w-fit text-gray-700 w-full">
                                                {product.decoupage.region.nom} - {product.decoupage.localite.nom}
                                            </p>
                                            <p className="font-bold text-lime-800 uppercase leading-tight ">{product.nom}</p>
                                            <p className="text-gray-600 text-xs leading-tight mb-1 truncate">{product.description || 'BLANC'}</p>
                                            <p className="text-[13px] font-medium">💵 {formatPrice(product.prixUnitaire)} F CFA / {product.unite}</p>
                                            <p className="text-xs text-muted-foreground mb-1">📦 {product.quantite} {product.unite}</p>
                                            <p className="text-[10px] text-gray-500 font-mono">{product.code}</p>
                                            <p className="text-[10px] text-gray-400 mb-1">Publié {formatDate(product.createdAt)} </p>
                                            {/* <Button className='leading-tight truncate w-full mt-2 border-none bg-muted hover:bg-[#022d13] hover:text-white uppercase' variant="outline">
                                                Consulter ...<ArrowRight size={16} />
                                            </Button> */}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Bouton "Consulter plus de produits" */}
                        <div className="w-full flex justify-center mt-10">
                            <Button  className="gap-2 text-sm md:text-base bg-gray-100 text-black">
                                Voir plus ...
                                <ArrowRight size={16} />
                            </Button>
                        </div>
                    </>
                )}
            </div>
        // </div>
    );
}

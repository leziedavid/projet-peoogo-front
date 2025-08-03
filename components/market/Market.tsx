'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/ApiReponse/ProduitsResponse';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from "next/link";
import { ArrowRight, Search } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Input } from '../ui/input';



interface Filtre {
    typeVente: string;
    localite: string;
}


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

export default function MyMarket() {

    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [filtresActifs, setFiltresActifs] = useState<Partial<Filtre>>({});
    const [searchLocalite, setSearchLocalite] = useState('');
    const [localites, setLocalites] = useState([
        { id: 'abidjan', nom: 'Abidjan' },
        { id: 'tchologo', nom: 'Tchologo' },
        { id: 'iffou', nom: 'Iffou' },
        { id: 'gagnoa', nom: 'Gagnoa' },
        { id: 'daloa', nom: 'Daloa' },
        { id: 'man', nom: 'Man' },
        { id: 'yamoussoukro', nom: 'Yamoussoukro' },
    ]); // ou depuis une API

    const filteredLocalites = localites.filter((loc) =>
        loc.nom.toLowerCase().includes(searchLocalite.toLowerCase())
    );


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
        if (searchTerm.length < 3) return;

        const delayDebounce = setTimeout(() => {
            fetchSearchResults(searchTerm);
        }, 500); // attendre 500ms après la dernière frappe
        return () => clearTimeout(delayDebounce); // annule si l'utilisateur continue à taper
    }, [searchTerm]);

    const fetchSearchResults = async (term: string) => {
        try {
            setIsLoading(true);
            console.log(term);
            // const response = await axios.get(`/api/produits?q=${term}`); // change selon ton endpoint
            // setSearchResults(response.data); // ou setProducts() si tu veux remplacer
        } catch (error) {
            console.error("Erreur lors de la recherche :", error);
        } finally {
            setIsLoading(false);
        }
    };


    function appliquerFiltres(filtre: Partial<Filtre>) {

        setFiltresActifs((prev) => {
            const newFiltres = { ...prev };
            for (const key in filtre) {
                const k = key as keyof Filtre;
                if (filtre[k] === prev[k]) {
                    delete newFiltres[k];
                } else {
                    newFiltres[k] = filtre[k];
                }
            }

            console.log(newFiltres);

            // Appeler l'API à chaque mise à jour de filtre
            // fetchProduitsAvecFiltres(newFiltres);

            return newFiltres;
        });

    }


    return (

        <>

            <div className="md:container md:mx-auto mt-8">

                <div className="flex flex-col items-start px-1">
                    <div className="flex gap-2 flex-col mb-4">
                        <h2 className="text-3xl md:text-2xl  tracking-tighter max-w-xl font-bold text-left">
                            Des produits frais
                        </h2>
                    </div>
                </div>

                <div className="w-full p-4 md:flex md:gap-6">
                    {/* Filtres - visibles à gauche sur desktop */}

                    <aside className="hidden md:block w-64 bg-white border rounded-lg p-4 h-fit space-y-4">
                        <h3 className="font-bold text-lg"> Filtres</h3>
                        <div>
                            <h4 className="font-semibold text-sm mb-1">Type de vente</h4>
                            <div className="flex gap-2">
                                <Badge variant="secondary" onClick={() => appliquerFiltres({ typeVente: 'gros' })}
                                    className={filtresActifs.typeVente === 'gros' ? 'bg-green-800 text-white cursor-pointer' : 'cursor-pointer'} >
                                    Vente en gros
                                </Badge>
                                <Badge variant="secondary"  onClick={() => appliquerFiltres({ typeVente: 'detail' })}
                                    className={filtresActifs.typeVente === 'detail' ? 'bg-green-800 text-white cursor-pointer' : 'cursor-pointer'} >
                                    Vente en détail
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-1">Filtrer par découpage</h4>
                            <Select onValueChange={(val) => appliquerFiltres({ localite: val })} value={filtresActifs.localite || ''} >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choisir une localité" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className="p-2">
                                        <Input type="text" placeholder="Rechercher..." value={searchLocalite} onChange={(e) => setSearchLocalite(e.target.value)} className="w-full px-2 py-1 border rounded text-sm" />
                                    </div>

                                    {filteredLocalites.length > 0 ? (
                                        filteredLocalites.map((loc) => (
                                            <SelectItem key={loc.id} value={loc.id}> {loc.nom} </SelectItem>
                                        ))
                                    ) : (
                                        <div className="p-2 text-sm text-gray-500">Aucune localité trouvée</div>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </aside>

                    <div className="flex-1">

                        {/* Bouton filtre mobile */}
                        <div className="md:hidden mb-4 mt-8">
                            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="text-green-800 border-green-600">Filtrer</Button>
                                </SheetTrigger>
                                <SheetContent side="bottom" className="bg-white h-[40%] overflow-y-auto  overflow-y-auto rounded-t-xl">
                                    <div className="p-4 space-y-4">
                                        <h3 className="font-bold text-lg">Filtres</h3>
                                        <div>
                                            <h4 className="font-semibold text-sm">Type de vente</h4>
                                            <div className="flex gap-2">
                                                <Badge variant="secondary" onClick={() => appliquerFiltres({ typeVente: 'gros' })} className={filtresActifs.typeVente === 'gros' ? 'bg-green-800 text-white cursor-pointer' : 'cursor-pointer'}  >
                                                    Vente en gros
                                                </Badge>
                                                <Badge variant="secondary" onClick={() => appliquerFiltres({ typeVente: 'detail' })}
                                                    className={filtresActifs.typeVente === 'detail' ? 'bg-green-800 text-white cursor-pointer' : 'cursor-pointer'}
                                                >
                                                    Vente en détail
                                                </Badge>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">Filtrer par découpage</h4>
                                            <Select onValueChange={(val) => appliquerFiltres({ localite: val })} value={filtresActifs.localite || ''} >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Choisir une localité" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <div className="p-2">
                                                        <Input type="text" placeholder="Rechercher..." value={searchLocalite} onChange={(e) => setSearchLocalite(e.target.value)} className="w-full px-2 py-1 border rounded text-sm" />
                                                    </div>

                                                    {filteredLocalites.length > 0 ? (
                                                        filteredLocalites.map((loc) => (
                                                            <SelectItem key={loc.id} value={loc.id}> {loc.nom} </SelectItem>
                                                        ))
                                                    ) : (
                                                        <div className="p-2 text-sm text-gray-500">Aucune localité trouvée</div>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Résultats + Formulaire de recherche */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3 mt-4">
                            <h2 className="text-lg md:text-xl font-semibold">
                                Résultats : {products.length}
                            </h2>

                            <div className="flex items-center w-full md:w-auto">
                                <label className="sr-only">Search</label>
                                <div className="relative w-full md:w-80">
                                    <input type="text" id="voice-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rechercher un produit..." />
                                    <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                                        <Search />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="md:container md:mx-auto mt-5">

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                                                <p className="bg-muted text-[11px] py-[2px] px-2 rounded-md w-fit text-gray-700 w-full">
                                                    {product.decoupage.region.nom} - {product.decoupage.localite.nom}
                                                </p>
                                                <p className="font-bold text-lime-800 uppercase leading-tight ">{product.nom}</p>
                                                <p className="text-gray-600 text-xs leading-tight mb-1 truncate">{product.description || 'BLANC'}</p>
                                                <p className="text-[13px] font-medium">💵 {product.prixUnitaire.toLocaleString()} F CFA / {product.unite}</p>
                                                <p className="text-xs text-muted-foreground mb-1">📦 {product.quantite}  {product.unite}</p>
                                                <p className="text-[10px] text-gray-500 font-mono">{product.code}</p>
                                                <p className="text-[10px] text-gray-400 mb-1">Publié {formatDate(product.createdAt)} </p>

                                            </div>
                                        </Link>
                                        <div className="mt-2">
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </>


    );
}

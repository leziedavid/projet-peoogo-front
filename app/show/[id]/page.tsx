'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ShoppingCart } from "lucide-react";
import BuyingOptions from "@/components/BuyingOptions";
import HeaderMarket from "@/components/market/HeaderMarket";
import { Footer } from "@/components/home/Footer";
import { Product } from "@/types/ApiReponse/ProduitsResponse";
import { geProduitstById } from "@/api/services/productServices";
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation";

// Fake data
const detailProduit = {
    id: "1",
    nom: "TOUT VENANT",
    code: "MN001",
    description: "TRICYCLE CARGO BIEN CHARGÉ",
    quantite: 5,
    unite: "TRICYCLE(S)",
    imageUrl: "/products.jpg",
    prixUnitaire: 84000,
    prixEnGros: 80000, // Ajouté pour correspondre au type Product
    saleType: "Offre de vente",
    status: "Disponible",
    typeActeur: "vendeur", // Ajouté pour correspondre au type Product
    addedById: "u1", // Ajouté pour correspondre au type Product
    decoupageId: "d1", // Ajouté pour correspondre au type Product
    addedBy: {
        name: "John Doe",
        phoneNumber: "+2250123456789",
        email: "john@example.com",
        id: "u1",
        password: "",
        codeGenerate: null,
        passwordGenerate: "",
        enrollementsId: null,
        role: "vendeur",
        status: "actif",
        phoneCountryCode: "+225",
        typeCompte: null,
        createdAt: "2025-07-29",
        updatedAt: "2025-07-31",
    },
    decoupage: {
        id: "d1",
        nombreEnroler: 200,
        districtId: "dt1",
        regionId: "r1",
        departmentId: "dp1",
        sousPrefectureId: "sp1",
        localiteId: "l1",
        district: { id: "dt1", nom: "District d’Abidjan", statut: null },
        region: { id: "r1", nom: "Région des Lagunes", statut: null, districtId: "dt1" },
        department: { id: "dp1", nom: "Abidjan", regionId: "r1" },
        sousPrefecture: { id: "sp1", nom: "Yopougon", departmentId: "dp1" },
        localite: { id: "l1", nom: "Sideci", sousPrefectureId: "sp1" },
    },
    userInfo: {
        id: "u1",
        name: "John Doe",
        email: "john@example.com",
        phoneNumber: "+2250123456789",
        wallet: {},
        generatedCode: null,
        code: "1234",
        photo: "/avatar.jpg",
    },
    statut: "Actif",
    paymentMethod: "Espèce",
    disponibleDe: "2025-07-30",
    disponibleJusqua: "2025-08-10",
    createdAt: "2025-07-30",
    updatedAt: "2025-07-31",
    autreImage: null,
    image: null,
    codeUsers: "CU001",
    images: [
        "/products.jpg",
        "/astronaut-grey-scale.svg",
        "/astronaut-grey-scale.svg",
    ],
};

export default function ShowProduct() {

    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
    const [detailProduit, setDetailProduit] = useState<Product | null>(null);
    const router = useRouter();
    
    // get id by router
    const params = useParams()
    const id = params?.id as string

    // geProduitstById
    const getDetailProduct = async () => {
        try {
            const res = await geProduitstById(id);
            if (res.statusCode === 200 && res.data) {
                setDetailProduit(res.data);
            } else {
                setDetailProduit(null);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getDetailProduct();
    }, [id]);

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

    // Créer le tableau d'images combinant imageUrl, image, autreImage et images
    const dataImages = React.useMemo(() => {
        if (!detailProduit) return [];

        const allImages: string[] = [];

        if (detailProduit.imageUrl) {
            allImages.push(detailProduit.imageUrl);
        }

        if (detailProduit.image && detailProduit.image !== detailProduit.imageUrl) {
            allImages.push(detailProduit.image);
        }

        if (detailProduit.autreImage) {
            allImages.push(detailProduit.autreImage);
        }

        if (detailProduit.images && detailProduit.images.length > 0) {
            allImages.push(...detailProduit.images);
        }

        return [...new Set(allImages)];
    }, [detailProduit]);



    return (

        <>
            <div className="mb-8">
                <HeaderMarket />
                <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>

                    {detailProduit && (
                        <div className="w-full min-h-screen bg-white px-4 py-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <div className="flex flex-col px-2 md:px-4">
                                    <Image src={dataImages[selectedImageIndex] || "/astronaut-grey-scale.svg"} alt={detailProduit.nom} width={400} height={400} className="rounded-2xl w-full h-auto object-cover" />
                                    {/* Slider des thumbnails */}
                                    <div className="flex gap-2 mt-4 overflow-x-auto">
                                        {/* {detailProduit.images.map((img, index) => ( */}
                                        {dataImages.map((img, index) => (
                                            <Image key={index} src={img || "/astronaut-grey-scale.svg"} alt={`thumbnail-${index}`} width={80} height={80} onClick={() => setSelectedImageIndex(index)} className="rounded-md object-cover border border-gray-200 flex-shrink-0" />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 px-2 md:px-4">
                                    <h2 className="text-2xl font-bold break-words">{detailProduit.nom}</h2>
                                    <p className="text-sm text-gray-600">{detailProduit.saleType}</p>
                                    <p className="text-[#B07B5E] text-sm">  Publié {formatDate(detailProduit.createdAt)} </p>

                                    <div className="flex gap-2 items-center">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            {detailProduit.decoupage.localite.nom}, {detailProduit.decoupage.sousPrefecture.nom}, {detailProduit.decoupage.department.nom}
                                        </span>
                                    </div>
                                    <div className="grid gap-1.5 font-normal">
                                        <p className="text-sm leading-none font-medium"> Description du produit  </p>
                                            <p dangerouslySetInnerHTML={{__html: detailProduit && detailProduit.description ? detailProduit.description : '', }} className="text-muted-foreground text-sm lowercase first-letter:uppercase">
                                        </p>
                                    </div>
                                    <p className="text-lg font-bold text-primary">
                                        {formatPrice(detailProduit.prixUnitaire)} F CFA / {detailProduit.unite}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Quantité disponible : {detailProduit.quantite} {detailProduit.unite}
                                    </p>

                                    <BuyingOptions product={detailProduit} />

                                    <div className="text-xs text-gray-500 italic">
                                        Veuillez vous connecter pour acheter ce produit.
                                    </div>

                                    <Button onClick={() => { router.push("/auth/login"); }} variant="link" className="px-0 text-[#B07B5E]">
                                        Se connecter
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />

        </>
    );
}

"use client";

import { Linkedin, Facebook, Instagram } from "lucide-react";
import Image from 'next/image';

const objetsAgricoles = [
    { value: "achat_produits", label: "Achat de produits agricoles" },
    { value: "vente_produits", label: "Vente de produits agricoles" },
    { value: "formation_agricole", label: "Formation et accompagnement agricole" },
    { value: "equipements_agricoles", label: "Équipements et matériels agricoles" },
    { value: "conseil_technique", label: "Conseil technique et agronomique" },
    { value: "marche_producteurs", label: "Accès au marché pour producteurs" },
    { value: "partenariat_cooperatives", label: "Partenariat avec coopératives" }
];

export const Footer = () => {
    return (
        <div className="bg-gradient-to-b from-[#022d13] to-[#022d13] text-white py-14 md:py-28 w-full">
            {/* Padding horizontal pour éviter que le contenu touche les bords sur mobile */}

            <div className="max-w-6xl mx-auto px-3 md:px-0 flex flex-col md:flex-row justify-between gap-10">

                {/* Image et texte côte à côte */}
                <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
                    <div className="flex-shrink-0">
                        <Image src="/logos/Peoogo_Plan_de_travail_2.svg" alt="logo" width={180} height={180} className="object-contain" />
                    </div>
                    <div className="max-w-lg space-y-4 font-medium font-title text-sm md:text-base">
                        <p>
                            Basés au Burkina Faso, nous sommes une jeune startup ambitieuse, passionnée par l’innovation agricole et aquacole,
                            et déterminée à transformer le secteur en offrant des solutions pratiques, accessibles et performantes.
                        </p>
                        <p>
                            Nous rassemblons tous les acteurs de la chaîne vivrière et aquacole via une plateforme digitale de services.
                            Facilitez vos échanges, suivez vos opérations et boostez votre performance agricole et aquacole.
                        </p>
                    </div>
                </div>

                {/* Sections */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-8 md:mt-0">
                    {/* Services */}
                    <div className="space-y-3 font-title">
                        <span className="uppercase text-xl font-extrabold ">Services</span>
                        <div className="flex flex-col gap-2 text-base">
                            {objetsAgricoles.map((objet, index) => (
                                <div key={objet.value ?? index} className="font-medium">
                                    {objet.label}
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Contact */}
                    <div className="space-y-3 font-title">
                        <span className="uppercase text-xl  font-extrabold ">Contact</span>
                        <div className="flex flex-col gap-2 text-base">
                            <div className="font-medium">Ligne d’assistance <span className="text-[#BFC1BF] font-normal">0176898765</span></div>
                            <div className="font-medium">Emplacement <span className="text-[#BFC1BF] font-normal">BURKINA FASO</span></div>
                            <div className="font-medium">Email <span className="text-[#BFC1BF] font-normal">peoogo@gmail.com</span></div>
                        </div>
                        <div className="flex space-x-5 py-2">
                            <Instagram size={30} strokeWidth={3} />
                            <Linkedin size={30} strokeWidth={3} />
                            <Facebook size={30} strokeWidth={3} />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

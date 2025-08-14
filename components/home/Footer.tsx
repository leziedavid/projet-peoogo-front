"use client";

import Link from "next/link";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import Image from 'next/image';
import { Truck, ShoppingBag, Utensils, CarFront } from 'lucide-react';

export const Footer = () => {
    return (
        <div className="bg-gradient-to-b from-[#022d13] to-[#022d13] text-white py-14 md:py-28 w-full">
            {/* Padding horizontal pour éviter que le contenu touche les bords sur mobile */}
            <div className="max-w-6xl mx-auto px-6 md:px-0 flex flex-col md:flex-row justify-between gap-10">

                {/* Image et texte côte à côte */}
                <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
                    <div className="flex-shrink-0">
                        <Image
                            src="/peoogo/Peoogo-svg/Peoogo-14.svg"
                            alt="logo"
                            width={180}  // légèrement plus grand
                            height={180}
                            className="object-contain"
                        />
                    </div>
                    <div className="max-w-lg space-y-4 font-extrabold font-title text-sm md:text-base">
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
                    <div className="space-y-3 font-extrabold font-title">
                        <span className="uppercase text-xl">Services</span>
                        <div className="flex flex-col gap-2 text-base">
                            <div>Personnalisation de produits</div>
                            <div>Solutions pour les entreprises (B2B)</div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-3 font-extrabold font-title">
                        <span className="uppercase text-xl">Contact</span>
                        <div className="flex flex-col gap-2 text-base">
                            <div>Ligne d’assistance <span className="text-[#BFC1BF] font-normal">0176898765</span></div>
                            <div>Emplacement <span className="text-[#BFC1BF] font-normal">BURKINA FASO</span></div>
                            <div>Email <span className="text-[#BFC1BF] font-normal">peoogo@gmail.com</span></div>
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

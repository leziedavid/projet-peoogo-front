"use client";

import Link from "next/link";
import { Linkedin, Wrench } from "lucide-react";
import Image from 'next/image';  // Import de Image de Next.js
import { Truck, ShoppingBag, Utensils, CarFront, AlertTriangle, CloudRain, Shield, Banknote, MessageCircle, Phone, MapPin, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
    const services = [
        {
            icon: <CarFront className="h-8 w-8" />,
            title: "Covoiturage",
            href: "/",
        },
        {
            icon: <ShoppingBag className="h-8 w-8" />,
            title: "E-Commerce",
            href: "/boutique",
        },
        {
            icon: <Truck className="h-8 w-8" />,
            title: "Livraison",
            href: "/",
        },
        {
            icon: <Utensils className="h-8 w-8" />,
            title: "Restauration",
            href: "/",
        },
    ];

    const company = [
        { title: "À propos", href: "/about" },
        { title: "Contact", href: "/contact" },
        { title: "Presse", href: "/press" },
        { title: "Investisseurs", href: "/investors" },
    ];

    const legal = [
        { title: "Conditions d'utilisation", href: "/terms" },
        { title: "Politique de confidentialité", href: "/privacy" },
        { title: "Cookies", href: "/cookies" },
    ];

    return (

        <div className="bg-gradient-to-b from-[#022d13] to-[#022d13] text-white py-14 md:py-28 w-full">
            
            <div className="max-w-6xl mx-auto flex justify-between h-full">
                <div className="flex flex-col md:flex-row gap-2 justify-center md:justify-between">

                    {/* Conteneur pour l'image et le téléph */}
                    <div className="flex flex-col justify-start h-full">
                        <Image src="/peoogo.png" alt="logo" className="h-20 md:h-20 px-6" width={200} height={250} layout="intrinsic" />
                    </div>

                    {/* Sections */}
                    <div className="flex gap-4 flex-col md:flex-row px-8 md:px-0">
                        {/* Services Section */}
                        <div className="space-y-5 font-extrabold font-title">
                            <span className="uppercase text-xl font-title">Services</span>
                            <div className="flex flex-col gap-y-5 text-base">
                                <div>Personnalisation de produits</div>
                                <div>Solutions pour les entreprises (B2B)</div>
                            </div>
                        </div>
                        
                        <div className="space-y-5 font-extrabold font-title">
                            <span className="uppercase text-xl font-title">Services</span>
                            <div className="flex flex-col gap-y-5 text-base">
                                <div>Personnalisation de produits</div>
                                <div>Solutions pour les entreprises (B2B)</div>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="space-y-5 font-extrabold font-title">
                            <span className="uppercase text-xl font-title">Contact</span>
                            <div className="flex flex-col gap-y-5 text-base">
                                <div className="flex flex-col">
                                    Ligne d’assistance
                                    <span className="text-[#BFC1BF] font-normal">0176898765
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    Emplacement
                                    <span className="text-[#BFC1BF] font-normal"> BURKINA FASSO </span>
                                </div>
                                <div className="flex flex-col">
                                    Email
                                    <span className="text-[#BFC1BF] font-normal"> peoogo@gmail.com </span>
                                </div>
                            </div>
                        </div>

                        {/* Download Section */}
                        <div className="md:w-1/2">
                            <span className="uppercase text-xl font-title font-extrabold font-title"> Suivez-nous sur ...</span>
                            <div className="flex space-x-5 py-5">
                                <Instagram size={30} strokeWidth={3} absoluteStrokeWidth />
                                <Linkedin size={30} strokeWidth={3} absoluteStrokeWidth />
                                <Facebook strokeWidth={3} absoluteStrokeWidth />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );
};

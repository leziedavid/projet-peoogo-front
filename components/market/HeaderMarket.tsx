"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';  // Import de Image de Next.js
import { LucideUser2, LucideHome, LucidePackage, LucideImage, LucideInfo, Store, HandCoins, Bell, ShoppingCart, User, ShoppingBasket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, } from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useCart } from '@/app/context/CartProvider';
import SideCart from '../SideCart';
import { getUserName, getUserRole, isSessionStillValid, logout } from '@/app/middleware';
import { useRouter } from 'next/navigation'


// Composant Header principal
const HeaderMarket: React.FC = ({ }) => {

    const { countAllItems } = useCart();
    const [showSideCart, setShowSideCart] = useState(false);
    const cartItems = countAllItems();
    const [UserName, setUserName] = useState("");
    const [UserRole, setUserRole] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const notifications = [
        {
            id: 1,
            libelle: "Nouvelle commande",
            contenu: "Vous avez reçu une nouvelle commande de 3 articles.",
            date: "2025-08-01T10:15:00Z",
            lu: false
        },
        {
            id: 2,
            libelle: "Stock bas",
            contenu: "Le stock du produit 'Tomates fraîches' est inférieur à 10 unités.",
            date: "2025-07-31T14:40:00Z",
            lu: false
        },
        {
            id: 3,
            libelle: "Message client",
            contenu: "Un client a envoyé une question concernant l'article 'Pommes bio'.",
            date: "2025-07-30T18:00:00Z",
            lu: true
        }
    ];

    const navigationItems = [
        {
            title: "Accueil",
            href: "/",
            description: "",
            icon: <LucideHome className="w-4 h-4 mr-2 text-[#B07B5E]" /> // Icône pour ACCUEIL
        },
        {
            title: "Marché",
            href: "/market-place",
            description: "",
            icon: <Store className="w-4 h-4 mr-2  text-[#B07B5E]" /> // Icône pour PRODUITS
        },
        {
            title: "Prix du marché",
            href: "/prix-du-marche",
            description: "",
            icon: <HandCoins className="w-4 h-4 mr-2  text-[#B07B5E]" /> // Icône pour REALISATIONS
        },
        {
            title: "Aide et Assistance",
            href: "/aide-assistance",
            description: "",
            icon: <LucideInfo className="w-4 h-4 mr-2  text-[#B07B5E]" /> // Icône pour A PROPOS
        },
        // about
        {
            title: "À propos",
            href: "/about",
            description: "",
            icon: <LucideInfo className="w-4 h-4 mr-2  text-[#B07B5E]" /> // Icône pour A PROPOS
        },

    ];

    const [isOpen, setOpen] = useState(false);

    // 🔄 Vérifie la session au montage et à chaque changement de loginStateChange
    const checkSession = async () => {
        const valid = await isSessionStillValid();
        setIsLoggedIn(valid);
        // if (!valid) {
        //     logout();
        // }
    };

    const checkUserInfo = async () => {
        const user = await getUserName();
        if (user) {
            setUserName(user);
        }
    };

    const checkUserRole = async () => {
        const role = await getUserRole();
        if (role) {
            setUserRole(role);
        }

    };

    useEffect(() => { checkSession(); checkUserInfo(); checkUserRole(); }, []);

    return (
        <>

            <header className="flex flex-col items-center fixed top-0 z-50 w-full shadow-sm">
                <div className="py-4 md:py-2 items-center w-full bg-white">

                    <div className="max-w-7xl mx-4 px-4 lg:mx-auto flex justify-between items-center gap-x-10">
                        <div className="flex justify-start items-center gap-1 -ml-16"> {/* marge négative */}
                            <Link href="/" className="flex items-center">
                                <Image src="/peoogo/Peoogo-svg/Peoogo-15.svg" alt="logo"
                                    width={180}
                                    height={180} className="object-contain max-h-16 md:max-h-20 px-2"
                                    priority/>
                            </Link>
                        </div>


                        {/* Navigation pour les écrans plus grands */}
                        <nav className="hidden md:flex gap-2">
                            <NavigationMenu className="flex justify-start items-start">
                                <NavigationMenuList className="flex justify-start gap-4 flex-row">
                                    {navigationItems.map((item) => (

                                        <NavigationMenuItem key={item.title}>
                                            {item.href ? (
                                                <>
                                                    <NavigationMenuLink href={item.href}>
                                                        <button className="font-bold text-black  leading-tight px-2 py-1 text-sm hover:bg-gray-100 flex items-center gap-1">
                                                            {item.icon}
                                                            {item.title}
                                                        </button>
                                                    </NavigationMenuLink>
                                                </>
                                            ) : (
                                                <>
                                                    <NavigationMenuTrigger className="font-bold text-[#B07B5E]  uppercase leading-tight text-sm font-title tracking-tight text-lg px-2 py-1 gap-1">
                                                        {item.title}
                                                    </NavigationMenuTrigger>
                                                </>
                                            )}
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </nav>

                        <div className="flex items-center gap-4">

                            {isLoggedIn && (
                                <div onClick={() => setShowSideCart(true)} className="flex items-center gap-2 relative">
                                    <Bell className="w-6 h-6 text-[#B07B5E]" />
                                    {notifications.length > 0 && (
                                        <span className="absolute -top-2 -right-2 text-xs text-white bg-red-600 w-5 h-5 rounded-full flex items-center justify-center">
                                            {notifications.length >= 9 ? "9+" : notifications.length}
                                        </span>
                                    )}
                                </div>
                            )}

                            <div onClick={() => setShowSideCart(true)} className="flex items-center gap-2 relative">
                                <ShoppingBasket className="w-6 h-6 text-[#B07B5E] " />
                                {cartItems > 0 && (
                                    <span className="absolute -top-2 -right-2 text-xs text-white bg-[#B07B5E]  w-5 h-5 rounded-full flex items-center justify-center">
                                        {cartItems >= 9 ? "9+" : cartItems}
                                    </span>
                                )}
                            </div>

                            {isLoggedIn ? (
                                <div className="flex items-center gap-2">
                                    <User className="w-6 h-6 text-[#B07B5E]" />
                                    <div className="hidden md:block text-sm">
                                        <div className="font-medium text-[#B07B5E]">TRA BI</div>
                                        <div className="text-[#B07B5E]">DAVID</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <User onClick={() => router.push('/auth/login')} className="w-6 h-6 text-[#B07B5E]" />
                                </div>
                            )}

                        </div>


                        <div className="flex w-12 shrink lg:hidden items-end justify-end">

                            <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>

                            {isOpen && (
                                <div className="absolute top-20 left-0 right-0 bg-background shadow-lg py-4 border-t z-50">
                                    <div className="mx-auto w-full max-w-screen-xl px-4 flex flex-col gap-8">
                                        {navigationItems.map((item) => (
                                            <div key={item.title} className="flex flex-col gap-2">
                                                {item.href ? (
                                                    <Link href={item.href} className="flex justify-between items-center font-bold text-[#B07B5E]  uppercase leading-tight"
                                                        onClick={() => setOpen(false)} >
                                                        <span className="text-sm font-extrabold font-title tracking-tighter flex items-center">
                                                            {item.icon}
                                                            {item.title}
                                                        </span>
                                                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                                                    </Link>
                                                ) : (
                                                    <p onClick={() => setOpen(false)} className="font-bold text-[#B07B5E]  uppercase leading-tight text-sm font-extrabold font-title tracking-tighter flex items-center" >
                                                        {item.title}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </header>

            <SideCart visible={showSideCart} onRequestClose={() => setShowSideCart(false)} />

        </>
    );
};

export default HeaderMarket;

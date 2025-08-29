"use client";

import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from '@/components/ui/carousel';

// Type pour définir un partenaire
interface Partenaire {
    id: string;
    nom: string;
    logo: string;
    alt: string;
    description?: string;
}

// Type pour les props du composant
interface NosPartenairesProps {
    titre?: string;
    partenaires?: Partenaire[];
    className?: string;
    autoPlay?: boolean;
    showNavigation?: boolean;
}

// Données par défaut basées sur l'image
const partenairesParDefaut: Partenaire[] = [
    {
        id: '1',
        nom: '',
        logo: '/partenaire/part1.jpeg',
        alt: 'adeu',
        description: ''
    },
    {
        id: '2',
        nom: '',
        logo: '/partenaire/part2.jpeg',
        alt: 'generation 1',
        description: ''
    },
    {
        id: '3',
        nom: '',
        logo: '/partenaire/generation.jpeg',
        alt: 'generation',
        description: ''
    },

];

const NosPartenaires: React.FC<NosPartenairesProps> = ({ titre = "NOS PARTENAIRES", partenaires = partenairesParDefaut, showNavigation = true}) => {
    return (
            <div className="md:container md:mx-auto mt-5 px-4">
                {/* Titre */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-black  mb-4">
                        {titre}
                    </h2>
                    <div className="w-24 h-1 bg-[#B07B5E]  mx-auto rounded"></div>
                </div>

                {/* Carousel des partenaires */}
                <div className="relative max-w-6xl mx-auto">
                    <Carousel opts={{ align: "start", loop: true, skipSnaps: false, dragFree: true, }}  className="w-full">
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {partenaires.map((partenaire) => (
                                <CarouselItem key={partenaire.id}  className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5" >
                                    <div className="group">
                                        <div className="bg-white rounded-lg  hover:shadow-lg transition-all duration-300 p-6 h-32 flex items-center justify-center border border-gray-200 hover:border-[#B07B5E]">
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                <Image
                                                    src={partenaire.logo}
                                                    alt={partenaire.alt}
                                                    fill style={{ objectFit: "contain" }} priority
                                                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                                                    // sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Navigation */}
                        {showNavigation && (
                            <>
                                <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-green-50 border-[#B07B5E]  text-[#B07B5E] " />
                                <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-green-50 border-[#B07B5E]  text-[#B07B5E] " />
                            </>
                        )}
                    </Carousel>
                </div>

            </div>
    );
};

export default NosPartenaires;

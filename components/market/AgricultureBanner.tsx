'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tractor, Shovel, Sprout, Leaf, Droplets, FireExtinguisher, Badge } from 'lucide-react';

export default function AgricultureBanner() {
    return (

        <div className="w-full py-5 lg:py-5">
            <div className="md:container md:mx-auto">
                <div className="w-full min-h-[500px] flex flex-col py-6">

                    {/* Top Section: Image + Content */}
                    <div className="flex flex-col md:flex-row w-full flex-1">
                        {/* Left - Image Section */}
                        <div className="md:w-1/2 w-full h-[350px] md:h-auto relative">
                            <Image
                                src="/travailleurs.jpg"
                                alt="Farmer"
                                layout="fill"
                                objectFit="cover"
                                className="object-cover"
                            />
                        </div>

                        {/* Right - Text Section */}
                        <div className="md:w-1/2 w-full bg-[#022d13] text-white p-8 flex flex-col justify-center items-start">
                            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter ">Agriculture</h1>
                            <h2 className="text-3xl md:text-4xl font-medium text-orange-500 mt-2">Plateforme Peoogo</h2>
                            <p className="text-sm md:text-base mt-4 max-w-md">
                                Grâce à notre plateforme, nous connectons les consommateurs aux producteurs agricoles locaux, pour une meilleure traçabilité et des produits de qualité.
                            </p>
                            <div className="mt-6 flex gap-4">
                                <Button variant="outline"  className="bg-white text-green-900 hover:bg-orange-500 hover:text-white">Plus d'infos</Button>
                                <Button variant="outline" className="text-green-900 hover:bg-orange-500  hover:text-white">Connexion</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

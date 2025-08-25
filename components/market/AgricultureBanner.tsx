'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function AgricultureBanner() {
    return (

        <div className="w-full py-5 lg:py-5">
            <div className="md:container md:mx-auto">
                <div className="w-full min-h-[500px] flex flex-col py-6">

                    {/* Top Section: Image + Content */}
                    <div className="flex flex-col md:flex-row w-full flex-1">
                        {/* Left - Image Section */}
                        <div className="md:w-1/2 w-full h-[350px] md:h-auto relative">
                            <Image src="/cereales.jpg" alt="Farmer" fill style={{ objectFit: "cover" }} className="object-cover"/>
                        </div>

                        {/* Right - Text Section */}
                        <div className="md:w-1/2 w-full bg-[#022d13] text-white p-8 flex flex-col justify-center items-start">
                            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter ">Agriculture</h1>
                            <h2 className="text-3xl md:text-2xl font-medium text-[#B07B5E] uppercase mt-2">Plateforme Peoogo</h2>
                            <p className="text-sm md:text-base mt-4 max-w-md">
                                Grâce à notre plateforme, nous connectons les consommateurs aux producteurs agricoles locaux, pour une meilleure traçabilité et des produits de qualité.
                            </p>
                            <div className="mt-6 flex gap-4">
                                <Button className="bg-[#B07B5E] text-white hover:bg-white  hover:text-black">Plus l&apos;infos</Button>
                                <Button  className="bg-[#B07B5E] text-white hover:bg-white   hover:text-black">Connexion</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

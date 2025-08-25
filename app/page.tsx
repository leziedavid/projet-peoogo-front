"use client";

import React from "react";
import { motion, Easing } from "framer-motion";
import { Leaf, ShoppingCart, TrendingUp } from "lucide-react";
import HeaderMarket from "@/components/market/HeaderMarket";
import HomeMarket from "@/components/market/HomeMarket";
import NosPartenaires from "@/components/market/NosPartenaires";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/home/Footer";
import AgricultureBanner from "@/components/market/AgricultureBanner";
import Forms from "@/components/market/Forms";

export default function Page() {
  // Helper d'animation flottante compatible TypeScript
  const floatingAnimation = (duration: number, x: number, y: number, rotate = 0) => ({
    y: [0, y, 0],
    x: [0, x, 0],
    rotate: [0, rotate, 0],
    transition: {
      y: { duration, repeat: Infinity, ease: "easeInOut" as Easing },
      x: { duration, repeat: Infinity, ease: "easeInOut" as Easing },
      rotate: { duration, repeat: Infinity, ease: "easeInOut" as Easing },
    },
  });

  return (
    <>
      <HeaderMarket />
      <div className={`min-h-[calc(100vh_-_56px)] py-10 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>
        <div className="w-full py-1 md:py-1 lg:py-1">
          <div className="md:container md:mx-auto">
            <div className="relative flex flex-col text-center bg-[url('/url(/legumes-cereales.jpg')] bg-cover bg-center rounded-md p-4 lg:p-14 gap-8 items-center" style={{ backgroundImage: `url(/legumes-cereales.jpg)` }}>
              {/* Superposition noire */}

              <div className="absolute inset-0 bg-black opacity-30 rounded-md"></div>


              {/* Icônes flottantes */}
              <motion.div className="absolute top-10 left-10 text-white opacity-50" animate={floatingAnimation(6, 15, 20, 25)}>
                <Leaf className="w-12 h-12" />
              </motion.div>

              <motion.div className="absolute bottom-20 right-20 text-white opacity-50" animate={floatingAnimation(5, -15, -25, -20)}>
                <ShoppingCart className="w-16 h-16" />
              </motion.div>

              <motion.div className="absolute top-1/3 right-1/5 text-white opacity-40" animate={floatingAnimation(7, 5, 15, 20)}>
                <Leaf className="w-10 h-10" />
              </motion.div>

              <motion.div className="absolute bottom-1/3 left-1/6 text-white opacity-40" animate={floatingAnimation(8, -8, 18, -15)}>
                <Leaf className="w-10 h-10" />
              </motion.div>

              <motion.div className="absolute top-1/4 left-1/2 text-white opacity-50 hidden md:block" animate={floatingAnimation(10, 10, 10, 360)}>
                <TrendingUp className="w-14 h-14" />
              </motion.div>

              <motion.div className="absolute top-1/2 right-1/3 text-white opacity-40" animate={floatingAnimation(9, -10, 12, 45)}>
                <Leaf className="w-12 h-12" />
              </motion.div>

              <motion.div className="absolute bottom-1/4 left-2/3 text-white opacity-50" animate={floatingAnimation(6, 15, -15, -30)}>
                <ShoppingCart className="w-16 h-16" />
              </motion.div>


              <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">

                <div className="flex gap-4 flex-col">

                  <div className="flex flex-col items-start gap-4">
                    <h1 className="text-4xl text-start font-bold text-white tracking-tighter sm:text-7xl z-10">
                      Des produits frais, cultivés près de chez vous
                    </h1>
                    <p className="z-10 text-xl leading-relaxed text-white tracking-tight text-muted-foreground max-w-md text-left">
                      Grâce à notre plateforme, nous connectons les consommateurs aux producteurs agricoles locaux, pour une meilleure traçabilité et des produits de qualité.
                    </p>
                  </div>
                </div>

              </div>
              <Skeleton className="bg-muted rounded-md aspect-video mb-2" />

            </div>
          </div>
        </div>
        <HomeMarket />
        <AgricultureBanner />
        <Forms />
        <NosPartenaires />
      </div>
      <Footer />
    </>
  );
}

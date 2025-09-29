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
import Slider from "@/components/market/Slider";

export default function Page() {

  return (
    <>
      <HeaderMarket />
      <div className={`min-h-[calc(100vh_-_56px)] py-10 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>

        <Slider />
        <HomeMarket />
        <AgricultureBanner />
        <Forms />
        <NosPartenaires />
      </div>
      <Footer />
    </>
  );
}

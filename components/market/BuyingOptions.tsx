"use client";

import { LucideShoppingCart } from "lucide-react";
import { FC } from "react";
import { Products } from "@/types/AllTypes";
import { useCart } from "@/app/context/CartProvider";
import { Button } from "../ui/button";

interface Props {
  product: Products;
}

const BuyingOptions: FC<Props> = ({ product }) => {

  const { updateCart } = useCart();
  const onAddToCartClick = () => {
    
    updateCart(product, 1);
  };

  return (

    <Button onClick={onAddToCartClick} className="w-full py-2 text-white rounded-lg bg-[#014c20] hover:bg-[#014c20] transition duration-300">
    <LucideShoppingCart className="w-5 h-5 text-white " /> 
    <span className="hidden sm:inline ml-2">Ajouter au panier</span>
  </Button>


    // <Button onClick={onAddToCartClick} className="w-full py-2 text-white rounded-lg bg-[#014c20] hover:bg-[#014c20] transition duration-300 sm:w-auto sm:px-4 sm:py-2 sm:text-sm sm:flex sm:items-center md:px-6 md:py-3 md:text-base">
    //   <LucideShoppingCart className="w-5 h-5 text-white sm:w-4 sm:h-4 md:w-5 md:h-5" />
    //   <span className="hidden sm:inline ml-2">Ajouter au panier</span>
    // </Button>

  );
};

export default BuyingOptions;

"use client";

import { LucideShoppingCart, ShoppingCart } from "lucide-react";
import { FC } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/app/context/CartProvider";
import { Product } from "@/types/ApiReponse/ProduitsResponse";

interface Props {
  product: Product;
}

const BuyingOptions: FC<Props> = ({ product }) => {

  const { updateCart } = useCart();
  const onAddToCartClick = () => {

    updateCart(product, 1);
  };

  return (


    <Button onClick={onAddToCartClick} className="w-fit flex items-center gap-2 bg-[#B07B5E] text-white hover:bg-[#022d13] hover:text-white">
      <ShoppingCart className="h-4 w-4 mr-2" /> Ajouter au panier
    </Button>

  );
};

export default BuyingOptions;

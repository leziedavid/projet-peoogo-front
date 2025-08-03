"use client";

import Image from "next/image";
import { FC } from "react";
import BuyingOptions from "./BuyingOptions";
import { Badge } from "@/components/ui/badge";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/types/AllTypes";

interface Props {
  products: Product[];
}

const ProductCard: FC<Props> = ({ products }) => {
  return (
    <div className="w-full py-10 lg:py-40">
      <div className="container mx-auto flex flex-col gap-14">
        {/* Header section */}
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-bold uppercase">  Derniers produits</h4>
          <Button className="gap-4 bg-orange-600 hover:bg-orange-600 transition duration-300"> Voir tous les produits <MoveRight className="w-4 h-4" /> </Button>
        </div>

        {/* Grid de produits hover:opacity-75  */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {products.map((product) => (

            <div key={product.id} className=" cursor-pointer">

              {/* Lien entourant toute la carte sauf BuyingOptions */}
              <Link href={`/product/${product.id}`} passHref>

                {/* Image en arrière-plan line-through  */}
                <div className="relative w-full bg-muted rounded-md aspect-video mb-4">
                  <div className="absolute top-0 left-0 p-2 text-white bg-orange-600 rounded-tl-md" style={{ zIndex: 10 }} >
                    <p className="italic text-xs">{`20%`}</p>
                  </div>
                  <Image src={product.imageUrl ?? "/placeholder.png"} alt={product.name} className="h-full w-full object-cover rounded-md" fill />
                </div>

                {/* Informations du produit */}
                <h3 className="text-sm font-bold ">{product.name}</h3>

                {/* Prix et options d'achat */}
                <div className="flex items-center space-x-3 mt-2">
                  <p className="text-muted-foreground text-lg font-bold">{product.price} FCFA</p>
                </div>

              </Link>

              {/* Options d'achat */}
              <BuyingOptions product={product} />
              
            </div>

          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductCard;

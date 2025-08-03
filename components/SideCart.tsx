"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import Image from "next/image";
import { useCart } from "@/app/context/CartProvider";
import { useEffect, useState } from "react";
import { isSessionStillValid, useAuthMiddleware } from "@/app/middleware";

interface Props {
  visible?: boolean;
  onRequestClose?(): void;
}

const SideCart: React.FC<Props> = ({ visible, onRequestClose }) => {


  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)



      const getIsAuthenticated = async () => {
          const res = await isSessionStillValid()
          setIsAuthenticated(res)
              if (res) {
                  checkAuth();
              }
          }
      
      useEffect(() => {
          getIsAuthenticated()
      }, [])


  const checkAuth = async () => {
    const result = await useAuthMiddleware();
    setIsLoggedIn(!!result);
  };

  const {items: cartItems,updateCart,removeFromCart,countTotalPrice,clearCart, } = useCart();
  const router = useRouter();

  return (

    <Sheet open={visible} onOpenChange={(open) => onRequestClose && onRequestClose()}>

      <SheetContent side="right" className="flex flex-col h-full overflow-y-auto md:max-w-full w-full md:w-1/3">
        

        <div className="p-4 flex justify-between">
          <SheetHeader>
            <SheetTitle className="font-bold ">Votre panier</SheetTitle>
          </SheetHeader>
          <button onClick={clearCart} className="text-xs text-black font-bold "> Vider le panier </button>
        </div>

        {cartItems.length === 0 ? (

          <div className="p-4">
            <p className="text-center text-gray-500">Votre panier est vide</p>
          </div>
          
        ) : (

          cartItems.map((cartItem) => (
            <div key={cartItem.product.id} className="p-4 flex space-x-4 border-b">
              {/* product.imageUrl || "/astronaut-grey-scale.svg" */}
              <Image src={cartItem.product.imageUrl || "/astronaut-grey-scale.svg"} alt="" className="rounded object-cover" width={60} height={60} />
              <div className="flex-1">
                <h2 className="font-semibold">{cartItem.product.name}</h2>
                <div className="flex text-gray-400 text-sm space-x-1">
                  <span>{cartItem.count}</span>
                  <span>x</span>
                  <span className="font-bold text-sm"> {cartItem.count * cartItem.product.price} Fcfa</span>
                </div>
              </div>

              <div className="ml-auto">
                <button onClick={() => removeFromCart(cartItem.product)}  className="text-xs text-black font-bold  hover:underline" >
                  Retirer
                </button>
                <div className="flex items-center justify-between mt-2">
                  <button onClick={() => updateCart(cartItem.product, -1)} className="text-lg">-</button>
                  <span className="text-xs">{cartItem.count}</span>
                  <button onClick={() => updateCart(cartItem.product, 1)} className="text-lg">+</button>
                </div>
              </div>
            </div>
          ))
        )}

          <div className="mt-auto p-4">
            <div className="py-4">
              <h1 className="font-bold  text-black text-xl uppercase">Total</h1>
              <p className="font-semibold">
                <span className="text-gray-400 text-black  font-normal">Montant total:</span> {countTotalPrice()} Fcfa
              </p>
            </div>
            
            <button onClick={() => {
                if (isLoggedIn) {  router.push("/checkout"); } else { router.push("/auth/login"); }
                onRequestClose && onRequestClose();
              }} className="border-1  py-2 w-full rounded  uppercase mt-4" >
              Checkout
            </button>

          </div>

      </SheetContent>

    </Sheet>
  );
};

export default SideCart;

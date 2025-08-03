"use client";

import React, { useState } from 'react';

import { Search, Bell, ShoppingCart, User, Menu, MapPin, Phone, Calendar, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import MenuSidebar from './MenuSidebar';
import HeaderMarket from './HeaderMarket';


// Composant Liste des Produits
const ProductList = () => {
  const products = [
    {
      id: 1,
      name: "MANIOC",
      seller: "TOUT VENANT",
      price: "67 200 F CFA/ TRICYCLE",
      quantity: "4 TRICYCLE",
      publisher: "ADADE KOFFI BILE SERGE",
      publishDate: "il y a 21 jours",
      location: "Indénié-Djuablin",
      image: "/api/placeholder/200/150"
    },
    {
      id: 2,
      name: "BANANE PLANTAIN",
      seller: "PRODUCTEUR",
      price: "45 000 F CFA/ TONNE",
      quantity: "10 TONNES",
      publisher: "KOUAME JEAN PATRICK",
      publishDate: "il y a 15 jours",
      location: "Agnéby-Tiassa",
      image: "/api/placeholder/200/150"
    },
    {
      id: 3,
      name: "IGNAME",
      seller: "GROSSISTE",
      price: "35 500 F CFA/ SAC",
      quantity: "50 SACS",
      publisher: "TRAORE AMINATA",
      publishDate: "il y a 8 jours",
      location: "Haut-Sassandra",
      image: "/api/placeholder/200/150"
    },
    {
      id: 4,
      name: "CACAO",
      seller: "COOPERATIF",
      price: "125 000 F CFA/ TONNE",
      quantity: "25 TONNES",
      publisher: "COOP EBURNEA",
      publishDate: "il y a 3 jours",
      location: "Gôh",
      image: "/api/placeholder/200/150"
    }
  ];

  return (
    <div className="flex-1">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Résultats : {products.length}</h2>
        <div className="mt-2">
          <span className="bg-gray-600 text-white px-3 py-1 rounded text-sm">
            Vente en gros
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  // onError={(e) => {
                  //   e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NS41IDY1LjVIMTE0LjVWOTQuNUg4NS41VjY1LjVaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8Y2lyY2xlIGN4PSI5MyIgY3k9Ijc2IiByPSIzIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik04NS41IDg1LjVMMTAwIDcxTDEwNyA3OEwxMTQuNSA3MC41VjkySDg1LjVWODUuNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                  // }}
                />
              </div>
              <div className="p-4 space-y-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.seller}</p>
                </div>

                <div className="space-y-1">
                  <p className="font-semibold text-green-600">{product.price}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Phone className="w-4 h-4" />
                    <span>{product.quantity}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <div>Publié par {product.publisher}</div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Publié {product.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{product.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Composant Principal
const Marketplace = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      <HeaderMarket />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <MenuSidebar onClose={() => setIsMobileMenuOpen(false)} isOpen={isMobileMenuOpen} />
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-md">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <MenuSidebar onClose={() => setIsMobileMenuOpen(false)} isOpen={isMobileMenuOpen} />
            </SheetContent>
          </Sheet>

          {/* Product List */}
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
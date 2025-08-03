
import { Footer } from "@/components/home/Footer";
import AgricultureBanner from "@/components/market/AgricultureBanner";
import Forms from "@/components/market/Forms";
import HeaderMarket from "@/components/market/HeaderMarket";
import HomeMarket from "@/components/market/HomeMarket";
import PubSection from "@/components/market/PubSection";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Products } from "@/types/AllTypes";


export default async function Home() {

  const products = [
    {
      id: "1",
      name: "Tomate",
      slug: "tomate",
      description: "Tomate fraîche, idéale pour les salades.",
      mainImageUrl: "/img/tomates-fond-blanc.jpg",
      price: 1.50,
      unite: 1,
      pricePromo: 1.20,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "100",
      venteIndividuelle: true,
      nbAchatPossible: 10,
      poids: 0.2,
      longueur: 0.1,
      largeur: 0.1,
      hauteur: 0.1,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["légumes"],
      subcategories: ["fruits-légumes"]
    },
    {
      id: "2",
      name: "Piment",
      slug: "piment",
      description: "Piment frais et piquant.",
      mainImageUrl: "/img/piments.jpg",
      price: 2.00,
      unite: 1,
      pricePromo: 2000,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "150",
      venteIndividuelle: true,
      nbAchatPossible: 5,
      poids: 0.05,
      longueur: 0.05,
      largeur: 0.05,
      hauteur: 0.05,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["épices"],
      subcategories: ["produits frais"]
    },
    {
      id: "3",
      name: "Oignon",
      slug: "oignon",
      description: "Oignon blanc, idéal pour assaisonner vos plats.",
      mainImageUrl: "/img/oignon.png",
      price: 0.80,
      unite: 1,
      pricePromo: 0.70,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "200",
      venteIndividuelle: true,
      nbAchatPossible: 20,
      poids: 0.15,
      longueur: 0.1,
      largeur: 0.1,
      hauteur: 0.1,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["légumes"],
      subcategories: ["produits frais"]
    },
    {
      id: "4",
      name: "Ail",
      slug: "ail",
      description: "Ail frais, pour relever vos recettes.",
      mainImageUrl: "/img/ail.jpg",
      price: 1.00,
      unite: 1,
      pricePromo: 0.90,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "50",
      venteIndividuelle: true,
      nbAchatPossible: 10,
      poids: 0.03,
      longueur: 0.05,
      largeur: 0.05,
      hauteur: 0.05,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["épices"],
      subcategories: ["produits frais"]
    },
    {
      id: "5",
      name: "Feuille d'oignon",
      slug: "feuille-oignon",
      description: "Feuilles d'oignon fraîches, idéales pour les soupes.",
      mainImageUrl: "/img/feuilles-oignon.jpg",
      price: 1.20,
      unite: 1,
      pricePromo: 1.00,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "30",
      venteIndividuelle: true,
      nbAchatPossible: 10,
      poids: 0.1,
      longueur: 0.2,
      largeur: 0.1,
      hauteur: 0.05,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["légumes"],
      subcategories: ["herbes"]
    },
    {
      id: "6",
      name: "Aubergine Violet",
      slug: "aubergine-violet",
      description: "Aubergine de couleur violette, douce et savoureuse.",
      mainImageUrl: "/img/aubergine3.png",
      price: 2.50,
      unite: 1,
      pricePromo: 2.00,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "120",
      venteIndividuelle: true,
      nbAchatPossible: 15,
      poids: 0.25,
      longueur: 0.2,
      largeur: 0.2,
      hauteur: 0.2,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["légumes"],
      subcategories: ["produits frais"]
    },
    {
      id: "7",
      name: "Aubergine",
      slug: "aubergine",
      description: "Aubergine fraîche, parfaite pour vos recettes de cuisine.",
      mainImageUrl: "/img/aubergine2.jpg",
      price: 2.00,
      unite: 1,
      pricePromo: 2000,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "100",
      venteIndividuelle: true,
      nbAchatPossible: 15,
      poids: 0.2,
      longueur: 0.2,
      largeur: 0.2,
      hauteur: 0.2,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["légumes"],
      subcategories: ["produits frais"]
    },
    {
      id: "8",
      name: "Manioc",
      slug: "manioc",
      description: "Manioc frais, un aliment essentiel dans les cuisines tropicales.",
      mainImageUrl: "/img/manioc1.jpg",
      price: 2000,
      unite: 1,
      pricePromo: 1.60,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "50",
      venteIndividuelle: true,
      nbAchatPossible: 5,
      poids: 1.5,
      longueur: 0.5,
      largeur: 0.2,
      hauteur: 0.2,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["féculents"],
      subcategories: ["racines"]
    },
    {
      id: "9",
      name: "Igname",
      slug: "igname",
      description: "Igname frais, riche en amidon.",
      mainImageUrl: "/img/igname2.png",
      price: 2.20,
      unite: 1,
      pricePromo: 2.00,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "60",
      venteIndividuelle: true,
      nbAchatPossible: 10,
      poids: 1.2,
      longueur: 0.4,
      largeur: 0.2,
      hauteur: 0.3,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["féculents"],
      subcategories: ["racines"]
    },
    {
      id: "10",
      name: "Banane Douce",
      slug: "banane-douce",
      description: "Banane douce et sucrée, idéale pour les desserts.",
      mainImageUrl: "/img/bananes.png",
      price: 1.50,
      unite: 1,
      pricePromo: 1.20,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "200",
      venteIndividuelle: true,
      nbAchatPossible: 15,
      poids: 0.25,
      longueur: 0.2,
      largeur: 0.1,
      hauteur: 0.1,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["fruits"],
      subcategories: ["fruits frais"]
    },
    {
      id: "11",
      name: "Bande Plantain",
      slug: "bande-plantain",
      description: "Bande de plantain, parfait pour les fritures.",
      mainImageUrl: "/img/banane-plantain 1.png",
      price: 2.50,
      unite: 1,
      pricePromo: 2.20,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "80",
      venteIndividuelle: true,
      nbAchatPossible: 10,
      poids: 0.3,
      longueur: 0.4,
      largeur: 0.15,
      hauteur: 0.2,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["fruits"],
      subcategories: ["fruits frais"]
    },
    {
      id: "12",
      name: "Pomme",
      slug: "pomme",
      description: "Pomme croquante et juteuse.",
      mainImageUrl: "/img/pommes-vertes-rouges.jpg",
      price: 1.20,
      unite: 1,
      pricePromo: 1.00,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "150",
      venteIndividuelle: true,
      nbAchatPossible: 20,
      poids: 0.2,
      longueur: 0.1,
      largeur: 0.1,
      hauteur: 0.1,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["fruits"],
      subcategories: ["fruits frais"]
    },
    {
      id: "13",
      name: "Pomme de Terre",
      slug: "pomme-de-terre",
      description: "Pomme de terre fraîche, idéale pour les purées.",
      mainImageUrl: "/img/pommes-terre 1.jpg",
      price: 0.90,
      unite: 1,
      pricePromo: 0.80,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "300",
      venteIndividuelle: true,
      nbAchatPossible: 30,
      poids: 0.5,
      longueur: 0.2,
      largeur: 0.15,
      hauteur: 0.1,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["légumes"],
      subcategories: ["produits frais"]
    },
    {
      id: "14",
      name: "Avocat",
      slug: "avocat",
      description: "Avocat mûr, crémeux et délicieux.",
      mainImageUrl: "/img/avoca1.png",
      price: 2.50,
      unite: 1,
      pricePromo: 2.00,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "50",
      venteIndividuelle: true,
      nbAchatPossible: 5,
      poids: 0.3,
      longueur: 0.2,
      largeur: 0.15,
      hauteur: 0.1,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["fruits"],
      subcategories: ["fruits frais"]
    },
    {
      id: "15",
      name: "Orange",
      slug: "orange",
      description: "Orange juteuse et sucrée.",
      mainImageUrl: "/img/orange_1.jpg",
      price: 2000,
      unite: 1,
      pricePromo: 1.50,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "200",
      venteIndividuelle: true,
      nbAchatPossible: 20,
      poids: 0.3,
      longueur: 0.1,
      largeur: 0.1,
      hauteur: 0.1,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["fruits"],
      subcategories: ["fruits frais"]
    },
    {
      id: "16",
      name: "Mangue",
      slug: "mangue",
      description: "Mangue juteuse et sucrée.",
      mainImageUrl: "/img/mangue2.jpg",
      price: 2000,
      unite: 1,
      pricePromo: 1.50,
      tvaId: "tva-standard",
      etatStocks: "en stock",
      stocks: "200",
      venteIndividuelle: true,
      nbAchatPossible: 20,
      poids: 0.3,
      longueur: 0.1,
      largeur: 0.1,
      hauteur: 0.1,
      modePay: "carte",
      moyenPay: "en ligne",
      categories: ["fruits"],
      subcategories: ["fruits frais"]
    }
  ];


  return (

    <>
      <HeaderMarket />
        <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>
          <div className="w-full py-1 md:py-1 lg:py-1">
            <div className="md:container md:mx-auto">
              <div className="relative flex flex-col text-center bg-[url('/url(/homme-africain.jpg')] bg-cover bg-center rounded-md p-4 lg:p-14 gap-8 items-center" style={{ backgroundImage: `url(/homme-africain.jpg)` }}>
                {/* Superposition noire */}

                <div className="absolute inset-0 bg-black opacity-30 rounded-md"></div>
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
        </div>
      <Footer />
    </>
  );
}

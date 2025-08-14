
import { Footer } from "@/components/home/Footer";
import HeaderMarket from "@/components/market/HeaderMarket";
import MyMarket from "@/components/market/Market";

export default async function Home() {

    return (
        <>
            <div className="mb-8">
                <HeaderMarket />
                <div className={`min-h-[calc(100vh_-_56px)] mt-12 py-5`}>
                    <MyMarket />
                </div>
            </div>
            <Footer />

        </>


    );
}

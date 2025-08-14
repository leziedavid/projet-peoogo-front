"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Package, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockOrders } from "./mockOrders";
import { OrderStatus, PaymentMethod, } from "@/types/AllTypes";
import { EcommerceOrderResponse, EcommerceOrder } from "@/types/ApiReponse/EcommerceOrderResponse";

import { DataTable } from "@/components/table/dataTable";
import { ShoppingCart, StretchHorizontal, SwatchBook } from "lucide-react";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Heart } from 'lucide-react';
import { useOrderSocket } from '@/lib/socket/useOrderSocket';
import { getAllOrders, getOrdersAndRevenueStatsEcommerce, getOrdersByCreator, getOrdersByUserId, getOrdersHistoryByUserId, getOrderStatsAndGains, updateOrderStatusEcommerce } from "@/api/services/authService";
import { getUserRole } from "@/app/middleware";
import { columns as columnsEcommercecolumns } from "@/types/columns/columnsEcommerce-columns";
import { StatistiquesCommandesResponse } from "@/types/ApiReponse/StatistiquesCommandesResponse";
import LineChart from "@/components/chart/LineChart";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatistiquesEcommerceOrderResponse } from "@/types/ApiReponse/StatistiquesEcommerceOrderResponse";
import { toast } from "sonner";
import { orderStatusToFrench, paymentMethodToFrench } from "@/types/mapping/translations";
import OrderDetails from "./OrderDetails";

export default function OrderHistory() {


    useOrderSocket() // ← Active les sockets seulement ici

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAssignFormOpen, setIsAssignFormOpen] = useState(false);
    const [data, setDataValues] = useState<EcommerceOrder | undefined>(undefined);
    const [ecommerceOrder, setEcommerceOrder] = useState<EcommerceOrder[]>([]);
    const [roles, setRoles] = useState<string>("");
    const [userProductStats, setUserProductStats] = useState<StatistiquesEcommerceOrderResponse | null>(null);
    const [globalProductStats, setGlobalProductStats] = useState<StatistiquesEcommerceOrderResponse | null>(null);
    const [ordersAndRevenueStats, setOrdersAndRevenueStats] = useState<StatistiquesCommandesResponse | null>(null);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)

    // getUserroles
    const fetchroles = async () => {
        const roles = await getUserRole();
        if (roles) {
            setRoles(roles);
        }
    }
    // Récupérer toutes les commandes e-commerce
    const getAllProduct = async () => {
        try {
            const res = await getOrdersHistoryByUserId(currentPage, limit);
            if (res.data) {
                setEcommerceOrder(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Statistiques globales des commandes et gains Ecommerce
    const getOrderStatsAndGain = async () => {
        try {
            const res = await getOrderStatsAndGains();
            if (res.data) {
                setUserProductStats(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Statistiques des commandes et revenus par mois Ecommerce
    const fetchOrdersAndRevenueStats = async (startDate?: string, endDate?: string) => {
        try {
            const res = await getOrdersAndRevenueStatsEcommerce(startDate, endDate);
            if (res.data) {
                setOrdersAndRevenueStats(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };


    useEffect(() => {
        fetchroles();

        console.log("Role détecté :", roles);

        if (roles === "AGENT_ENROLEUR") {
            getAllProduct();
            fetchOrdersAndRevenueStats();
        }
        else if (roles === "USER") {
            getAllProduct();
            getOrderStatsAndGain();
            fetchOrdersAndRevenueStats();

        }
    }, [roles, startDate, endDate]);

    function closeForm() {
        setIsOpen(false);
        setDataValues(undefined);
    }

    function handleUpdate(row: EcommerceOrder) {
        setDataValues(row);
        setIsOpen(true);

    }

    function handleDelete(row: EcommerceOrder) {

    }

    function handleNextPage() {
        if (currentPage < Math.ceil(totalItems / limit)) {
            setCurrentPage(currentPage + 1);
        } else {
            alert("Vous êtes déjà sur la dernière page.");
        }
    }

    function handlePreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            alert("Vous êtes déjà sur la première page.");
        }
    }


    return (

        <div className="p-4 space-y-4">
            {ecommerceOrder.map((order, index) => (
                <div key={order.id}   className="rounded-lg bg-gray-50">
                    <div onClick={() => handleUpdate(order)} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                            {/* Icône pour type de commande (ex: Livraison ou Pickup) */}
                            <ClipboardList className="w-6 h-6 text-primary" />
                            <div>
                                <p className="font-medium text-sm">
                                    {orderStatusToFrench(order.status)},{" "}
                                    {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit",  minute: "2-digit",  })}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {paymentMethodToFrench(order.paymentMethod)}
                                </p>
                                {order.status === OrderStatus.CANCELLED && (
                                    <p className="text-sm text-red-500"> {orderStatusToFrench(OrderStatus.CANCELLED)} </p>
                                )}
                            </div>
                        </div>

                        <div className="text-right">
                            <p className={cn(  "font-semibold", !order.amount || order.amount === 0 ? "text-gray-400"  : "text-black" )}  >
                                {order.amount} XOF
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            <OrderDetails isOpen={isOpen} onClose={() => setIsOpen(false)} order={data} />
        </div>

    );
};

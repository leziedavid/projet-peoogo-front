"use client";

import { Searchs } from "@/components/dash/searchs";
import TripOrderList from "@/components/oders/TripOrderList";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useOrderSocket } from '@/lib/socket/useOrderSocket';
import { getUserRole } from "@/app/middleware";
import { de, el } from "date-fns/locale";
import {getAllDriverTripOrders, getAllPartnerTripOrders, getAllUsersTripOrders, getCanceledOrdersByDriver, getCanceledOrdersByPartner, getCanceledOrdersByUser, getTodayOrdersByDriver, getTodayOrdersByPartner, getTodayOrdersByUser, getValidatedOrdersByDriver, getValidatedOrdersByPartner, getValidatedOrdersByUser } from "@/api/services/authService";
import { Order } from "@/types/ApiReponse/ordersResponse";
import { Role } from "@/types/AllTypes";
import { Search as Icons } from "lucide-react";


export default function Page() {
    useOrderSocket() // ← Active les sockets seulement ici
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);
    const [roles, setRoles] = useState<Role | null>(null);

    // getUserRoles
    const fetchRoles = async () => {
        const role = await getUserRole();
        setRoles(role);
    };

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);

        // startDate
    const [startDate, setStartDate] = useState<string | null>(null);
    // endDate
    const [endDate, setEndDate] = useState<string | null>(null);

    // getAllUsersTripOrders

    const fetchAllUsersTripOrders = async (page: number) => {
        try {
            setLoading(true);
            const res = await getAllUsersTripOrders(page, limit);
            if (res.data) {
                setOrders(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
                setLoading(false);
            }
        } catch (e) {
            console.error("Erreur fetchAllOrders:", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllUserTodayOrders = async (page: number) => {
        try {
            setLoading(true);
            const res = await getTodayOrdersByUser(page, limit);
            if (res.data) {
                setOrders(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
                setLoading(false);
            }
        } catch (e) {
            console.error("Erreur fetchTodayOrders:", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllUserCanceledOrders = async (page: number) => {
        try {
            setLoading(true);
            const res = await getCanceledOrdersByUser(page, limit);
            if (res.data) {
                setOrders(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
                setLoading(false);
            }
        } catch (e) {
            console.error("Erreur fetchCanceledOrders:", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserValidatedOrders = async (page: number) => {
        try {
            setLoading(true);
            const res = await getValidatedOrdersByUser(page, limit);
            if (res.data) {
                setOrders(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
                setLoading(false);
            }
        } catch (e) {
            console.error("Erreur fetchValidatedOrders:", e);
        } finally {
            setLoading(false);
        }
    };

    // getAllDriverTripOrders

    const fetchAllDriverTripOrders = async (page: number) => {
        try {
            setLoading(true);
            const res = await getAllDriverTripOrders(page, limit);
            if (res.data) {
                setOrders(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
                setLoading(false);
            }
        } catch (e) {
            console.error("Erreur fetchAllOrders:", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllDriverTodayOrders = async (page: number) => {
        try {
            setLoading(true);
            const res = await getTodayOrdersByDriver(page, limit);
            if (res.data) {
                setOrders(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
                setLoading(false);
            }
        } catch (e) {
            console.error("Erreur fetchTodayOrders:", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllDriverCanceledOrders = async (page: number) => {
        try {
            setLoading(true);
            const res = await getCanceledOrdersByDriver(page, limit);
            if (res.data) {
                setOrders(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
                setLoading(false);
            }
        } catch (e) {
            console.error("Erreur fetchCanceledOrders:", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchDriverValidatedOrders = async (page: number) => {
        try {
            setLoading(true);
            const res = await getValidatedOrdersByDriver(page, limit);
            if (res.data) {
                setOrders(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
                setLoading(false);
            }
        } catch (e) {
            console.error("Erreur fetchValidatedOrders:", e);
        } finally {
            setLoading(false);
        }
    };

    // getAllPartnerTripOrders

    const fetchAllPartnerTripOrders = async (page: number) => {
        try {
            setLoading(true);
            const res = await getAllPartnerTripOrders(page, limit);
            if (res.data) {
                setOrders(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
                setLoading(false);
            }
        } catch (e) {
            console.error("Erreur fetchAllOrders:", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllPartnerTodayOrders = async (page: number) => {
        try {
            setLoading(true);
            const res = await getTodayOrdersByPartner(page, limit);
            if (res.data) {
                setOrders(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
                setLoading(false);
            }
        } catch (e) {
            console.error("Erreur fetchTodayOrders:", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllPartnerCanceledOrders = async (page: number) => {
        try {
            setLoading(true);
            const res = await getCanceledOrdersByPartner(page, limit);
            if (res.data) {
                setOrders(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
                setLoading(false);
            }
        } catch (e) {
            console.error("Erreur fetchCanceledOrders:", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchPartnerValidatedOrders = async (page: number) => {
        try {
            setLoading(true);
            const res = await getValidatedOrdersByPartner(page, limit);
            if (res.data) {
                setOrders(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
                setLoading(false);
            }
        } catch (e) {
            console.error("Erreur fetchValidatedOrders:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchroles = async () => {
            const role = await getUserRole();
            setRoles(role);
        };

        fetchroles();
    }, []);

    useEffect(() => {
        if (!roles) return;

        console.log("Role détecté :", roles);

        if (roles === "ADMIN") {
            // future logique admin
        } else if (roles === "USER") {
            fetchAllUsersTripOrders(currentPage);
            fetchAllUserTodayOrders(currentPage);
            fetchAllUserCanceledOrders(currentPage);
            fetchUserValidatedOrders(currentPage);
        } else if (roles === "PARTNER") {
            fetchAllPartnerTripOrders(currentPage);
            fetchAllPartnerTodayOrders(currentPage);
            fetchAllPartnerCanceledOrders(currentPage);
            fetchPartnerValidatedOrders(currentPage);
        } else if (roles === "LIVREUR") {
            // logique livreur
        } else if (roles === "DRIVER") {
            fetchAllDriverTripOrders(currentPage);
            fetchAllDriverTodayOrders(currentPage);
            fetchAllDriverCanceledOrders(currentPage);
            fetchDriverValidatedOrders(currentPage);
        }
    }, [roles, currentPage, startDate, endDate]);


    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-100px)]">
                <div className="flex flex-col items-center text-center space-y-4">
                    <Icons className="w-10 h-10 animate-spin text-gray-600" />
                    <p className="text-gray-600 text-lg font-medium">Recherche des commandes disponibles en cours...</p>
                </div>
            </div>
        );
    }

    return (

        <div className="w-full overflow-x-auto">
            <Searchs />
            <TripOrderList orders={orders} />
        </div>
    );
}



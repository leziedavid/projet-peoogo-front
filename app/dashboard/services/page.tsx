'use client'

import React, { useEffect, useState } from 'react'
import { LucideIcon, Utensils, Truck, Boxes, Store, Check, } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { getAllServices, getUserSubscriptions, handleSubscribes } from '@/api/services/authService'
import { Service } from '@/types/ApiReponse/ServicesResponse'
import { Button } from '@/components/ui/button'
import { useOrderSocket } from '@/lib/socket/useOrderSocket';
import SubscriptionPeriodModal from '@/components/form/SubscriptionPeriodModal'
import { columns as subscriptionColumns } from "@/types/columns/souscriptions-columns";
import { DataTable } from '@/components/table/dataTable'
import { DataTableSkeleton } from '@/components/table/data-table-skeleton'
import { ServicesInfos } from '@/components/form/ServicesInfos'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {Info,CreditCard,} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const iconMap: Record<string, LucideIcon> = {
    Utensils,
    Truck,
    Boxes,
    Store,
}

export interface Product { }
export interface MenuItem { }
export interface Delivery { }
export interface ServiceSubscription { }

// export interface Service {
//     id: string
//     name: string
//     description?: string
//     type: 'RESTAURANT' | 'DELIVERY' | 'OTHER'
//     imageUrl?: string
//     icon?: LucideIcon
//     partnerId: string
//     createdAt: string
//     updatedAt: string
//     price: number
//     promoPrice: number
//     isActivePromo: boolean
//     statusService: boolean
//     products: Product[]
//     menuItems: MenuItem[]
//     deliveries: Delivery[]
//     subscriptions: ServiceSubscription[]
// }

export default function ServicesPage() {

    useOrderSocket() // ← Active les sockets seulement ici

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);
    const [services, setService] = useState<Service[]>([]);
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
    const [period, setPeriod] = useState<{ startDate: string; endDate: string } | null>(null)
    const [userSubscriptions, setUserSubscriptions] = useState<ServiceSubscription[]>([]);
    const [serviceTypeToShow, setServiceTypeToShow] = useState<string | null>(null);

    const fetchData = async (page: number) => {
        try {
            const res = await getAllServices(page, limit);
            if (res.data) {
                setService(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
            }
        } catch (e) {
            console.error(e);
        }
    };

        /** Souscriptions actives (non expirées) d’un utilisateur */
    const getUserSubscription = async () => {
        try {
            const res = await getUserSubscriptions(currentPage, limit);
            if (res.data) {
                setUserSubscriptions(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
        getUserSubscription();
    }, [currentPage]);

    // getAllServices

        const handleSubscribe = async (serviceId: string, period: { startDate: string; endDate: string }) => {
            try {
                const payload = {
                    serviceId,
                    startDate: period.startDate,
                    endDate: period.endDate,
                }

                const res = await handleSubscribes(payload);
                if (res.statusCode === 200) {
                    toast.success(res.message)
                } else {
                    // error.message = res.message
                    toast.error(res.message)
                    console.error(res)
                }
            }
            catch (error) {
                console.error(error)
                toast.error('Erreur lors de la souscription')
            }
        }

        function handleChangeState(row: any, newStates: string[]) {
            alert(`Change state of ${row.id} to ${newStates.join(", ")}`);
        }
    
        function handleUpdate(row: any) {
        }
    
        function handleDelete(row: any) {
            if (confirm(`Êtes-vous sûr de vouloir supprimer le véhicule "${row.name}" ?`)) {
                alert(`Delete ${row.id}`);
                fetchData(currentPage);
            }
        }
    
        function handleValidate(row: any, val: string | number) {
            alert(`Validate ${row.id} with value: ${val}`);
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


        const isDataEmpty1 = !userSubscriptions || userSubscriptions.length <= 0;


    return (

        <div className="w-full overflow-x-auto">

            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">

                <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        Nos services
                    </h2>
                </div>


                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => {
                        const iconKey =
                            typeof service.icon === "string" && service.icon in iconMap
                                ? (service.icon as keyof typeof iconMap)
                                : "Utensils";
                        const Icon = iconMap[iconKey];

                        return (
                            <Card key={service.id} className={`flex flex-col justify-between h-full min-h-[200px] transition shadow-sm border  ${service.statusService ? "bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"  : "bg-gray-100 opacity-50 pointer-events-none dark:bg-gray-700" }`} >
                                <CardHeader className="pb-2">
                                    <div className="flex items-center gap-2">
                                        {Icon && <Icon className="sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-900 dark:text-white" />}
                                        <CardTitle className="text-sm truncate uppercase text-gray-900 dark:text-white">
                                            {service.name}
                                        </CardTitle>
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-1">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate uppercase">
                                        {service.description}
                                    </p>
                                </CardContent>

                                {service.statusService && (
                                    <CardFooter className="flex justify-center gap-4 mt-auto">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        onClick={() => setServiceTypeToShow(service.type)}
                                                        className="p-2 bg-blue-100 text-blue-900 hover:bg-blue-200 rounded-full transition"
                                                        aria-label="Infos service"
                                                    >
                                                        <Info className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <span>Infos sur le service</span>
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedServiceId(service.id);
                                                            setModalOpen(true);
                                                        }}
                                                        className="p-2 bg-gray-100 text-black hover:bg-primary-700 hover:text-white rounded-full transition"
                                                        aria-label="Souscrire"
                                                    >
                                                        <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <span>Souscrire à ce service</span>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </CardFooter>
                                )}
                            </Card>
                        );
                    })}
                </div>


            </div>

            {isDataEmpty1 ? (

                <DataTableSkeleton columnCount={5} rowCount={10} />

            ) : (
                <>
                        <div className="flex items-center justify-between gap-4 m-0 p-0 mt-4">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white sm:text-xl m-0 p-0">
                                Historique des souscriptions
                            </h3>
                        </div>


                        <DataTable
                            columns={subscriptionColumns}
                            data={userSubscriptions}
                            onChangeState={handleChangeState}
                            onNextPage={handleNextPage}
                            onPreviousPage={handlePreviousPage}
                            currentPage={currentPage}
                            totalItems={totalItems}
                            itemsPerPage={limit}
                        />
                    </>

                )}


                {/* Politique */}
                <div className="mt-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Notre politique de service
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        Nous nous engageons à offrir des services de qualité, sécurisés et adaptés à vos besoins. Chaque service est vérifié et suivi pour garantir une satisfaction maximale. Notre équipe reste à votre écoute pour toute assistance concernant votre souscription ou l'utilisation des services.
                    </p>
                </div>


            {selectedServiceId && (
                <SubscriptionPeriodModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSelectPeriod={(selectedPeriod) => { setPeriod(selectedPeriod)
                        handleSubscribe(selectedServiceId, selectedPeriod)
                        setModalOpen(false)
                    }}
                />
            )}


            {serviceTypeToShow && (
                <ServicesInfos
                    isOpen={!!serviceTypeToShow}
                    onClose={() => setServiceTypeToShow(null)}
                    servicesTypes={serviceTypeToShow}
                />
            )}


        </div>
    )

}



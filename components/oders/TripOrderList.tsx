'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import TripOrderDetail from "./TripOrderDetail"
import { Order } from "@/types/ApiReponse/ordersResponse"
import { formatEstimatedArrival } from "@/lib/formatEstimatedArrival"

type OrderProps = {
    orders: Order[];
}

export default function TripOrderList({ orders }: OrderProps) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [open, setOpen] = useState(false)
    const [groupedOrders, setGroupedOrders] = useState<Record<string, Order[]>>({})
    const [isLoading, setIsLoading] = useState(true)

    // Simuler le traitement de regroupement
    useEffect(() => {
        setIsLoading(true)

        const timeout = setTimeout(() => {
            const grouped = orders.reduce((acc, order) => {
                const dateKey = new Date(order.trip.date).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                })

                if (!acc[dateKey]) acc[dateKey] = []
                acc[dateKey].push(order)
                return acc
            }, {} as Record<string, Order[]>)

            setGroupedOrders(grouped)
            setIsLoading(false)
        }, 500) // petit délai pour simuler le chargement

        return () => clearTimeout(timeout)
    }, [orders])

    return (
        <>
            <div className="px-4 py-2">

                {isLoading ? (
                    <div className="flex items-center justify-center py-10">
                        <span className="text-gray-500 text-sm animate-pulse">Chargement des commandes...</span>
                    </div>
                ) : (
                    Object.entries(groupedOrders).map(([date, orders]) => (
                        <div key={date} className="mb-4">
                            <h4 className="text-gray-500 text-sm font-medium mb-2 capitalize">{date}</h4>
                            {orders.map((order) => {
                                const type = order.trip.distance > 0 ? 'Véhicule' : 'Livraison'
                                const status = order.status === 'CANCELLED' ? 'Annulée' : 'Terminée'
                                const time = order.trip.departureTime?.slice(0, 5) || "00:00"

                                return (
                                    <div key={order.id}
                                        onClick={() => {
                                            setSelectedOrder(order)
                                            setOpen(true)  }} className="bg-gray-50 rounded-xl p-4 mb-2 shadow-sm flex justify-between items-center cursor-pointer" >
                                        <div>
                                            <div className="flex items-center gap-2 font-medium">
                                                {type === 'Véhicule' ? (
                                                    <Image src="/ride.png" alt="ride" width={40} height={40} />
                                                ) : (
                                                    <span className="text-xl">📦</span>
                                                )}
                                                <span className="uppercase">
                                                    {type} : {order.trip.vehicle.type} , {formatEstimatedArrival(order.trip.createdAt)}
                                                </span>
                                            </div>
                                            {status === 'Annulée' && (
                                                <div className="text-sm mt-1 text-red-500">Annulée</div>
                                            )}
                                        </div>
                                        <div className="text-black font-semibold text-sm">
                                            {order.trip.price ?? 0} XOF
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ))
                )}
            </div>

            {selectedOrder && (
                <TripOrderDetail
                    data={selectedOrder}
                    onClose={() => {
                        setSelectedOrder(null)
                        setOpen(false)
                    }}
                    isOpen={open}
                />
            )}
        </>
    )
}

// app/(your-path)/trip-data-file.ts

"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
// On importe le type Trip depuis AllTypes.ts
import {TripStatus } from "@/types/AllTypes"  // ajuste le chemin selon ta structure
import Image from "next/image"
import { Trip } from "../ApiReponse/trajetResponse";

export const columns: ColumnDef<Trip>[] = [
    {
        accessorKey: "departure",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                DÉPART
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) =>
            <div className="flex items-center gap-2">
                <span>{row.getValue("departure")}</span>
                <Image src="/ride.png" alt="Course" width={50} height={50} className="object-contain" />
            </div>,
        },
    {
        accessorKey: "arrival",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                ARRIVÉE
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) =>
        <div>{row.getValue("arrival")}</div>,
    },
    {
        accessorKey: "date",
        header: "DATE DE DÉPART",
        cell: ({ row }) => {
            const date = new Date(row.getValue("date"))
            return (
                <div className="text-right">
                    {date.toLocaleDateString()}{" "}
                    {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
            )
        },
    },
    // {
    //     accessorKey: "departureTime",
    //     header: "HEURE DÉPART",
    //     cell: ({ row }) => <div>{row.getValue("departureTime")}</div>,
    // },
    // {
    //     accessorKey: "arrivalTime",
    //     header: "HEURE ARRIVÉE",
    //     cell: ({ row }) => <div>{row.getValue("arrivalTime")}</div>,
    // },
    {
        accessorKey: "estimatedArrival",
        header: "ARRIVÉE ESTIMÉE",
        cell: ({ row }) => {
            const date = new Date(row.getValue("estimatedArrival"))
            return (
                <div>
                    {date.toLocaleDateString()}{" "}
                    {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
            )
        },
    },
    {
        accessorKey: "availableSeats",
        header: "PLACES",
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("availableSeats")}</div>
        ),
    },
    {
        accessorKey: "distance",
        header: "DISTANCE (KM)",
        cell: ({ row }) => <div>{row.getValue("distance")} km</div>,
    },
    {
        accessorKey: "instructions",
        header: "INSTRUCTIONS",
        cell: ({ row }) => (
            <div className="italic truncate max-w-[200px]">
                {row.getValue("instructions")}
            </div>
        ),
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right">PRIX (USD)</div>,
        cell: ({ row }) => {
            const price = row.getValue("price") as number
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: "STATUT",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
]

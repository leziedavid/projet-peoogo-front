import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import Image from "next/image"
import { ServiceSubscription } from "../ApiReponse/ServiceSubscriptionResponse"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cancelSubscription } from "@/api/services/authService"
import { toast } from "sonner"


// ✅ Composant pour le switch de statut
interface StatutCellProps {
    row: any;
}

export const StatutCell: React.FC<StatutCellProps> = ({ row }) => {
    const id = row.original.id;
    const [checked, setChecked] = useState(row.original.status === "ACTIVE");
    const [loading, setLoading] = useState(false);

    const handleToggle = async (value: boolean) => {
        if (!value) {
            setLoading(true);
            try {
                await cancelSubscription(id);
                setChecked(false);
                console.log(`Souscription ${id} annulée`);
                toast.success(`Souscription ${id} annulée`);
            } catch (error) {

                // Affiche une erreur ou remets l'état à true si échec
                setChecked(true);
                console.error("Erreur lors de l'annulation de la souscription :", error);
                toast.error("Erreur lors de l'annulation de la souscription");

            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <Switch
                checked={checked}
                disabled={loading || !checked} // désactivé si déjà annulé
                onCheckedChange={handleToggle}
                id={`status-${id}`}
            />
            <Label htmlFor={`status-${id}`} className="text-xs">
                {checked ? "Publié" : "Annulé"}
            </Label>
        </div>
    );
};

export const columns: ColumnDef<ServiceSubscription>[] = [
    {
        accessorKey: "service.name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                NOM DU SERVICE
                < ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium" > {row.original.service.name} </div>,
    },
    // {
    //     accessorKey: "service.icon",
    //     header: "ICÔNE",
    //     cell: ({ row }) => {
    //         const icon = row.original.service.icon;
    //         return (
    //             <Badge className="bg-blue-100 text-blue-600 capitalize" >
    //                 {icon || "—"
    //                 }
    //             </Badge>
    //         );
    //     },
    // },
    {
        accessorKey: "service.type",
        header: "TYPE DE SERVICE",
        cell: ({ row }) => (
            <div className="uppercase font-semibold" >
                {row.original.service.type}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "STATUT",
        cell: ({ row }) => {
            const status = row.original.status;
            const statusColor =
                status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700";

            return (
                <Badge className={statusColor} >
                    {status}
                </Badge>
            );
        },
    },
    {
        id: "statut-toggle",
        header: "VISIBILITÉ",
        cell: ({ row }) => <StatutCell row={row} />,
    },
    {
        accessorKey: "startDate",
        header: "DÉBUT",
        cell: ({ row }) => {
            const date = new Date(row.original.startDate);
            return (
                <span>{date.toLocaleDateString()} </span>
            );
        },
    },
    {
        accessorKey: "endDate",
        header: "FIN",
        cell: ({ row }) => {
            const date = new Date(row.original.endDate);
            return (
                <span>{date.toLocaleDateString()} </span>
            );
        },
    },
    {
        accessorKey: "service.price",
        header: "PRIX",
        cell: ({ row }) => {
            const price = row.original.service.promoPrice || row.original.service.price;
            return <span>{price} FCFA </span>;
        },
    },
    {
        accessorKey: "subscribedAt",
        header: "DATE D’INSCRIPTION",
        cell: ({ row }) => {
            const date = new Date(row.original.subscribedAt);
            return (
                <div className="text-sm text-muted-foreground" >
                    {date.toLocaleDateString()} - {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
            );
        },
    },
]

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '../ApiReponse/ProduitsResponse';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// 📦 API de mise à jour du status (à adapter selon ton service réel)
const updateProductStatus = async (id: string, newStatus: 'ACTIVE' | 'INACTIVE') => {
    try {
        console.log(`Produit ${id} mis à jour vers le statut : ${newStatus}`);
        // await tonService.updateStatus(id, newStatus);
    } catch (error) {
        console.error('Erreur de mise à jour du statut', error);
    }
};

// ✅ Switch personnalisé pour le statut actif/inactif
const ProductStatusSwitch: React.FC<{ row: any }> = ({ row }) => {
    const id = row.original.id;
    const currentStatus = row.original.status; // ACTIVE, INACTIVE, BLOCKED

    const [checked, setChecked] = useState(currentStatus === 'ACTIVE');

    const handleToggle = async (value: boolean) => {
        setChecked(value);
        const newStatus = value ? 'ACTIVE' : 'INACTIVE';
        await updateProductStatus(id, newStatus);
    };

    return (
        <div className="flex items-center space-x-2">
            <Switch
                checked={checked}
                onCheckedChange={handleToggle}
                id={`statut-${id}`}
            />
            <Label htmlFor={`statut-${id}`} className="text-xs">
                {checked ? "Publié" : "En attente"}
            </Label>
        </div>
    );
};

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'imageUrl',
        header: 'Image',
        cell: ({ row }) => {
            const imageUrl = row.original.imageUrl || '/products.jpg';
            return (
                <div className="relative w-20 h-20">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt="Produit"
                            className="object-cover w-full h-full rounded-lg"
                            width={100}
                            height={100}
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400">
                            No image
                        </div>
                    )}
                </div>
            );
        }
    },
    {
        accessorKey: 'nom',
        header: 'Nom du produit',
    },
    {
        accessorKey: 'code',
        header: 'Code',
        cell: ({ row }) => <span className="uppercase">{row.getValue('code')}</span>
    },
    {
        accessorKey: 'quantite',
        header: 'Quantité',
    },
    {
        accessorKey: 'prixUnitaire',
        header: 'Prix unitaire',
        cell: ({ row }) => <>{row.getValue('prixUnitaire')} FCFA</>
    },
    {
        accessorKey: 'disponibleJusqua',
        header: "Date d'expiration",
        cell: ({ row }) => formatDate(row.getValue('disponibleJusqua'))
    },

    {
        header: 'Découpage',
        cell: ({ row }) => {
            const d = row.original.decoupage;
            return (
                <div className="text-sm leading-tight space-y-1">
                    <div><strong>District:</strong> {d.district?.nom}</div>
                    <div><strong>Région:</strong> {d.region?.nom}</div>
                    <div><strong>Département:</strong> {d.department?.nom}</div>
                    <div><strong>Sous-préfecture:</strong> {d.sousPrefecture?.nom}</div>
                    <div><strong>Localité:</strong> {d.localite?.nom}</div>
                </div>
            );
        }
    },
    {
        accessorKey: 'statut',
        header: 'Statut',
        cell: ({ row }) => {
            const statut = row.original.statut;
            // Map custom colors to allowed Badge variants
            const variant =
                statut === 'disponible' ? 'default' : statut === 'indisponible' ? 'destructive' : 'secondary';
            return <Badge variant={variant}>{statut || 'en attente'}</Badge>;
        }
    },
    {
        id: 'switch-status',
        header: 'Status',
        cell: ({ row }) => <ProductStatusSwitch row={row} />
    },

    {
        accessorKey: 'createdAt',
        header: 'Date de création',
        cell: ({ row }) => formatDate(row.getValue('createdAt'))
    }
];

// 📅 Formatage de date
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
}

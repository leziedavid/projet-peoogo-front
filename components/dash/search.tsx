'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Store, Bell, Wallet } from 'lucide-react';
import { Spinner } from '../icons';
import { getUserAccountNumber, getUserName, getUserWallet } from '@/app/middleware';
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger,} from '@/components/ui/dialog';
import RechargeWalletModal from '../form/RechargeWalletModal';

export function SearchInput() {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState<string | null>(null);
    //  wallet: number | null // Balance du portefeuille (peut être null)
    const [wallet, setWallet] = useState<number | null>(null);
    // getUserAccountNumber
    const [accountNumber, setAccountNumber] = useState<string | null>(null);
    const [notifications, setNotifications] = useState<string[]>([
        "Votre commande a été expédiée",
        "Nouvelle promo sur les vêtements",
        "Mise à jour de votre abonnement",
    ]);

    const [modalOpen, setModalOpen] = useState(false);

    const handleConfirm = (network: 'Moov' | 'Orange' | 'Mtn' | 'Wave', amount: number) => {
        alert(`Recharger ${amount} sur ${network}`)
        // Ici appeler l'API ou logique de recharge...
    }

    const fetchWallet = async () => {
        const wallet = await getUserWallet();
        setWallet(wallet);
    };
    const fetchAccountNumber = async () => {
        const accountNumber = await getUserAccountNumber();
        setAccountNumber(accountNumber);;
    };

    const fetchName = async () => {
        const name = await getUserName();
        setName(name);
    };

    useEffect(() => {
        fetchWallet();
        fetchAccountNumber();
        fetchName();
    }, []);

    return (
        <div className="ml-auto flex items-center gap-4 md:grow-0">

            <div
                onClick={() => setModalOpen(true)}
                className="flex flex-col items-center gap-1 cursor-pointer text-center max-w-[120px] sm:max-w-[160px]"
            >
                <div className="flex items-center gap-1 sm:gap-2">
                    <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <p className="border-b border-dashed border-muted-foreground text-xs sm:text-sm font-semibold text-muted-foreground">
                        {wallet ?? "0"} F
                    </p>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {accountNumber ?? "NR 569201385263"}
                </p>
            </div>

            {/* Notifications avec Modal */}
            <Dialog>
                <DialogTrigger asChild>
                    <button className="relative ">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                                {notifications.length}
                            </span>
                        )}
                    </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Notifications</DialogTitle>
                    </DialogHeader>
                    <ul className="space-y-2 text-sm cursor-pointer">
                        {notifications.map((notif, index) => (
                            <li key={index} className="text-muted-foreground"> • {notif}   </li>
                        ))}
                    </ul>
                </DialogContent>
            </Dialog>

            <RechargeWalletModal  open={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleConfirm} accountNumber="NR 569201385263" />

        </div>
    );
}

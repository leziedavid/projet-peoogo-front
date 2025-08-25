'use client';

import { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';
import { getUserAccountNumber, getUserName } from '@/app/middleware';
import RechargeWalletModal from '../form/RechargeWalletModal';

interface WalletData {
    wallet: any;         // ou le type exact de res.data.wallet si tu l’as
    accountNumber: string;
}

export function SearchInput() {

    const [wallet, setWallet] = useState<WalletData | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const handleConfirm = (network: 'Moov' | 'Orange' | 'Mtn' | 'Wave', amount: number) => {
        alert(`Recharger ${amount} sur ${network}`)
    }

    const fetchWallet = async () => {
        try {
            const storedData = JSON.parse(localStorage.getItem('walletData') || '{}');

            setWallet({
                wallet: storedData.wallet ?? 0,
                accountNumber: storedData.accountNumber ?? 'XXXX',
            });
        } catch (error) {
            console.error("Erreur lors de la récupération du wallet :", error);
            setWallet({
                wallet: 0,
                accountNumber: 'XXXX',
            });
        }
    };

    const fetchAccountNumber = async () => {
        const accountNumber = await getUserAccountNumber();
    };

    const fetchName = async () => {
        const name = await getUserName();
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
                        {wallet?.wallet}
                    </p>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {wallet?.accountNumber}
                </p>
            </div>

            <RechargeWalletModal open={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleConfirm} accountNumber="NR 569201385263" />

        </div>
    );
}

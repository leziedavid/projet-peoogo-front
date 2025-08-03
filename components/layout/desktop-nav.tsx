'use client';

import Link from 'next/link';
import {CarFront,Home,LifeBuoy,MapPinned,PanelLeft,Server,Settings,ShieldCheck,ShoppingCart,Store,Users,Users2} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { VercelLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { NavItem } from '../dash/nav-item';
import { useEffect, useState } from 'react';
import Securite from '../securite/Securite';
import { isSessionStillValid } from '@/app/middleware';
import SupportServiceApp from '../securite/SupportServiceApp';
import Parametres from '../parametres/Parametres';

const navItems = [
    { href: '/dashboard/compte', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { href: '/dashboard/gestion-products', label: 'Gestion des produits', icon: <Store className="h-5 w-5" /> },
    { href: '/dashboard/ecommandes', label: 'Mes commandes', icon: <ShoppingCart className="h-5 w-5" /> },
    { href: '/dashboard/enrollements', label: 'Enrollements', icon: <Users className="h-5 w-5" /> },
    { href: '/dashboard/liste-users', label: 'Liste des utilisateurs', icon: <Users2 className="h-5 w-5" /> },
    { href: '/dashboard/transaction', label: 'Transactions', icon: <Users2 className="h-5 w-5" /> },
];

export default function DesktopNav({ collapsed,  setCollapsed }: { collapsed: boolean; setCollapsed: (value: boolean) => void; }){

    const [openSecurite, setOpenSecurite] = useState(false);
    const [open, setOpen] = useState(false);

    const [openServiceApp, setOpenServiceApp] = useState(false);
    const [openParametres, setOpenParametres] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false)

        // openSecurite fonction pour ouvrir la sécurité
        const openSecuriteSheet = () => {
            setCollapsed(false);
            setOpenSecurite(true);
        };

        const openServiceAppSheet = () => {
            setOpen(false);
            setOpenSecurite(false);
            setOpenServiceApp(true);
        };
    
        const openParametresSheet = () => {
            setOpen(false);
            setOpenSecurite(false);
            setOpenServiceApp(false);
            setOpenParametres(true);
            };
    
        const getIsAuthenticated = async () => {
            const res = await isSessionStillValid()
            setIsAuthenticated(res)
        }
    
        useEffect(() => {
            getIsAuthenticated()
        }, [])
        
    
    return (

        <>

        <aside className={`fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background transition-all duration-300 ${collapsed ? 'w-16' : 'w-60' } sm:flex`} >
            <div className="flex justify-between p-2">
                {/* <Link
                    href="/"
                    className="flex h-10 w-10 justify-center rounded-full bg-primary text-primary-foreground"
                >
                    <VercelLogo className="h-4 w-4" />
                </Link> */}
                <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="text-muted-foreground">
                    <PanelLeft className="h-5 w-5" />
                </Button>
            </div>

            <nav className="flex flex-col gap-4 px-2 sm:py-5">
                {navItems.map(({ href, label, icon }) => (
                    <NavItem key={href} href={href} label={label} collapsed={collapsed}>
                        {icon}
                    </NavItem>
                ))}
            </nav>
        </aside>

        {/* <Securite onClose={() => setOpenSecurite(false)} isOpen={openSecurite} />
        <SupportServiceApp onClose={() => setOpenServiceApp(false)} isOpen={openServiceApp} />
        <Parametres onClose={() => setOpenParametres(false)} isOpen={openParametres} /> */}

        </>

    );


}

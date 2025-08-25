'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'
import { getUserImageUrl, getUserName } from '@/app/middleware'

export function User() {
    
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [name, setName] = useState<string | null>(null)


    const fetchImage = async () => {
        const url = await getUserImageUrl()
        setImageUrl(url)
    }

    const fetchName = async () => {
        const name = await getUserName()
        setName(name)
        console.log(name)
    }
    
    useEffect(() => {
        fetchImage()
        fetchName()
    }, [])

    // fonction pour se déconnecter
    const logout = (): void => {
        // Fonction de déconnexion qui supprime les tokens et redirige vers login
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token') // Supprime access_token
            localStorage.removeItem('refresh_token') // Supprime refresh_token
            window.location.href = '/auth/login' // Redirige vers la page de connexion
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                    <Image src={imageUrl || '/icon8.png'} width={36} height={36}  alt="Avatar" className="overflow-hidden rounded-full object-cover" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{name ? name : 'Mon Compte'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button variant="ghost" className='text-red-500' onClick={logout}>
                        Se déconnecter
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

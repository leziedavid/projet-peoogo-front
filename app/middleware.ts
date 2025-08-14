'use client'
// Directive Next.js pour indiquer que ce fichier est côté client (navigateur)

import { refreshAccessToken } from '@/api/services/auth'
// Import de la fonction qui appelle l'API backend pour rafraîchir le token
import { jwtDecode, JwtPayload } from 'jwt-decode'

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    DRIVER = 'DRIVER',
    PARTNER = 'PARTNER',
    LIVREUR = 'LIVREUR',
}
// Enumération des rôles utilisateurs possibles dans l'application

export enum UserStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    BLOCKED = 'BLOCKED',
}
// Enumération des statuts d'utilisateur possibles

interface DecodedToken extends JwtPayload {
    sub: string             // Identifiant unique de l'utilisateur (subject)
    role: Role              // Rôle de l'utilisateur (ex: ADMIN, USER)
    status: UserStatus      // Statut de l'utilisateur (ex: ACTIVE, BLOCKED)
    name: string | null // Nom de l'utilisateur (peut être null)
    imageUrl: string | null // URL de l'image de profil (peut être null)
    partnerId: string | null // ID du partenaire (peut être null)
    wallet: number | null // Balance du portefeuille (peut être null)
    compte: string | null // Numéro de compte (peut être null)
}

export const getTokenFromLocalStorage = (): string | null => {
    // Fonction pour récupérer le token d'accès depuis le localStorage (si on est en navigateur)
    if (typeof window !== 'undefined') {
        return localStorage.getItem('access_token') // Retourne le token ou null si absent
    }
    return null // Si on n'est pas en navigateur, retourne null
}

const isTokenValid = (token: string): boolean => {
    // Vérifie si le token JWT est encore valide (pas expiré)
    try {
        const decoded = jwtDecode<DecodedToken>(token) // Décode le token pour lire sa payload
        const currentTime = Math.floor(Date.now() / 1000) // Temps actuel en secondes UNIX
        return decoded.exp !== undefined && decoded.exp > currentTime // true si non expiré
    } catch {
        return false // En cas d'erreur de décodage, token invalide
    }
}

const tryRefreshAccessToken = async (): Promise<string | null> => {

    // Tente de rafraîchir le token d'accès à partir du refresh_token stocké
    const refreshToken = localStorage.getItem('refresh_token') // Récupère le refresh_token
    if (!refreshToken) return null // Pas de refresh_token => impossible de rafraîchir

    try {
        const response = await refreshAccessToken(refreshToken) // Appel API backend pour rafraîchir
        if (response.statusCode === 200 && response.data?.access_token) {
            // Si succès, stocke le nouveau access_token en localStorage
            localStorage.setItem('access_token', response.data.access_token)
            return response.data.access_token // Retourne le nouveau token
        }
    } catch (error) {
        console.error('Erreur lors du refresh token :', error) // Log erreur si echec appel API
    }

    return null // En cas d'échec, retourne null
}

export const useAuthMiddleware = async (): Promise<DecodedToken | null> => {
    // Fonction principale qui contrôle l’authentification et rafraîchit le token si besoin
    let token = getTokenFromLocalStorage() // Récupère le token actuel

    if (!token || !isTokenValid(token)) {
        // Si pas de token ou token invalide
        const newToken = await tryRefreshAccessToken() // Tente de rafraîchir
        if (!newToken || !isTokenValid(newToken)) {
            // Si échec rafraîchissement ou token toujours invalide
            localStorage.removeItem('access_token') // Supprime tokens
            localStorage.removeItem('refresh_token')
            window.location.href = '/auth/login' // Redirige vers la page login
            return null
        }
        token = newToken // Sinon, utilise le nouveau token
    }

    return jwtDecode<DecodedToken>(token) // Decode et retourne les infos utilisateur
}


export const useAuthMiddlewareOne = async (): Promise<DecodedToken | null> => {
    // Fonction principale qui contrôle l’authentification et rafraîchit le token si besoin
    let token = getTokenFromLocalStorage() // Récupère le token actuel

    if (!token || !isTokenValid(token)) {
        // Si pas de token ou token invalide
        const newToken = await tryRefreshAccessToken() // Tente de rafraîchir
        if (!newToken || !isTokenValid(newToken)) {
            // Si échec rafraîchissement ou token toujours invalide
            localStorage.removeItem('access_token') // Supprime tokens
            localStorage.removeItem('refresh_token')
            return null
        }
        token = newToken // Sinon, utilise le nouveau token
    }
    return jwtDecode<DecodedToken>(token) // Decode et retourne les infos utilisateur
}

export const getUserId = async (): Promise<string | null> => {
    // Récupère l'ID utilisateur depuis le token décodé
    const user = await useAuthMiddleware()
    return user?.sub ?? null
}

// getwallet

export const getUserWallet = async (): Promise<number | null> => {
    // Récupère le rôle utilisateur depuis le token décodé
    const user = await useAuthMiddleware()
    return user?.wallet ?? null
}

// compte
export const getUserAccountNumber = async (): Promise<string | null> => {
    // Récupère le rôle utilisateur depuis le token décodé
    const user = await useAuthMiddleware()
    return user?.compte ?? null
}

export const getUserRole = async (): Promise<Role | null> => {
    // Récupère le rôle utilisateur depuis le token décodé
    const user = await useAuthMiddlewareOne()
    return user?.role ?? null
}

export const getUserStatus = async (): Promise<UserStatus | null> => {
    // Récupère le statut utilisateur depuis le token décodé
    const user = await useAuthMiddleware()
    return user?.status ?? null
}

export const getUserImageUrl = async (): Promise<string | null> => {
    // Récupère l'URL de l'image utilisateur depuis le token décodé
    const user = await useAuthMiddlewareOne()
    return user?.imageUrl ?? null
}

export const getUserName = async (): Promise<string | null> => {
    // Récupère le nom de l'utilisateur depuis le token décodé
    const user = await useAuthMiddlewareOne()
    return user?.name ?? null
}

export const getUserInfos = async (): Promise<{ id: string; role: Role; partnerId: string | null } | null> => {
    const user = await useAuthMiddleware()
    if (!user) return null
    return {
        id: user.sub,
        role: user.role,
        partnerId: user.partnerId,
    }
}

export const isUserAuthenticated = async (): Promise<boolean> => {
    let token = getTokenFromLocalStorage()
    if (!token || !isTokenValid(token)) {
        const newToken = await tryRefreshAccessToken()
        if (!newToken || !isTokenValid(newToken)) {
            // Échec du refresh, l'utilisateur n'est pas authentifié
            return false
        }
        token = newToken
    }
    return true
}

export const logout = (): void => {
    // Fonction de déconnexion qui supprime les tokens et redirige vers login
    if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token') // Supprime access_token
        localStorage.removeItem('refresh_token') // Supprime refresh_token
        window.location.href = '/auth/login' // Redirige vers la page de connexion
    }
}

/**
 * Vérifie si l'utilisateur est encore authentifié via access_token ou refresh_token.
 * @returns boolean : true si un token valide est présent ou récupéré, false sinon.
 */
export const isSessionStillValid = async (): Promise<boolean> => {
    let accessToken = getTokenFromLocalStorage()

    if (accessToken && isTokenValid(accessToken)) {
        // access_token encore valide
        return true
    }

    // access_token invalide, on tente avec le refresh_token
    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) {
        // Aucun refresh_token présent
        return false
    }

    // Vérification de la validité du refresh_token lui-même
    try {
        const decodedRefresh = jwtDecode<JwtPayload>(refreshToken)
        const currentTime = Math.floor(Date.now() / 1000)

        if (!decodedRefresh.exp || decodedRefresh.exp <= currentTime) {
            // refresh_token expiré
            return false
        }
    } catch {
        // Erreur lors du décodage du refresh_token
        return false
    }

    // Le refresh_token est valide, on tente de récupérer un nouveau access_token
    const newAccessToken = await tryRefreshAccessToken()

    if (!newAccessToken || !isTokenValid(newAccessToken)) {
        // Impossible de rafraîchir ou nouveau token invalide
        return false
    }

    return true
}

import { getUserId } from '@/app/middleware'
import { UserData } from '@/types/ApiReponse/UserDataResponse'
import { User } from '@/types/ApiReponse/UsersResponse'
import { LoginDto, RefreshTokenResponse, RegisterDto, UserAuth } from '@/types/ApiRequest/Auth'
import { BaseResponse } from '@/types/BaseResponse'
import { getBaseUrl } from '@/types/baseUrl'
import { toast } from 'sonner'

// Connexion : accepte email OU phoneNumber
export const signIn = async (loginData: Partial<LoginDto>): Promise<BaseResponse<UserAuth>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        })

        return await response.json()
    } catch (error) {
        toast.error("Erreur réseau ou serveur.");
        throw error
    }
}

export const refreshAccessToken = async ( refreshToken: string ): Promise<BaseResponse<RefreshTokenResponse>> => {
    
    try {

        const response = await fetch(`${getBaseUrl()}/auth/refresh`, { method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
        })

        return await response.json()

    } catch (error) {

        throw error
    }
}

// Inscription
export const signUp = async (registerData: FormData): Promise<BaseResponse<any>> => {
    try {

        const response = await fetch(`${getBaseUrl()}/auth/register`, {
            method: 'POST',
            body: registerData,
        })

        return await response.json()

    } catch (error) {
        toast.error("Erreur réseau ou serveur.");
        throw error
    }
}


// ajouter un utilisateur par un partenaire
    export const addDriverByPartner = async (registerData: FormData): Promise<BaseResponse<any>> => {
    try {
        // Récupération de l'ID utilisateur (partnerId)
        const userId = await getUserId();

        if (!userId) {
            toast.error("Vous n'êtes pas autorisé à ajouter un chauffeur");
            throw new Error("ID utilisateur manquant");
        }

        const response = await fetch(`${getBaseUrl()}/auth/partner/add-driver/one`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
            },
            body: registerData,
        });

        return await response.json()

        
    } catch (error: any) {

        toast.error("Erreur réseau ou serveur.");
        throw error;
    }
};

// auth/userdata
export const getUserInfos = async (): Promise<BaseResponse<User>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/userdata`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Erreur ${response.status} : ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        toast.error("Erreur réseau ou serveur.");
        throw error
    }
}

// ParametresuserData

export const getUserAllData = async (): Promise<BaseResponse<UserData>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/parametres/user/infos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        return await response.json()
    } catch (error) {
        toast.error("Erreur réseau ou serveur.");
        throw error
    }
}
// updateFiles
// @Patch('users/files/update')
export const updateFiles = async (formData: FormData): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/users/files/update`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: formData,
        });

        return await response.json()
    } catch (error) {
        toast.error("Erreur réseau ou serveur.");
        throw error
    }
}

// updateProfile
// @Patch('users/profile/update/data')
export const updateProfile = async (data: any): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/users/profile/update/data`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: JSON.stringify(data), // ✅ transforme bien l'objet en JSON
        });

        return await response.json()
    } catch (error) {
        toast.error("Erreur réseau ou serveur.");
        throw error
    }
}

// validateCompte
export const validateCompte = async (userId: string, status: string): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/validate/${userId}/${status}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })
        return await response.json()
    } catch (error) {
        toast.error("Erreur réseau ou serveur.");
        throw error
    }
}

// loginWithCode
export const loginWithCode = async (code: string): Promise<BaseResponse<any>> => {
    try {

        const response = await fetch(`${getBaseUrl()}/auth/login/code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: JSON.stringify({ code }),
        })

        return await response.json()

    } catch (error) {

        toast.error("Erreur réseau ou serveur.");
        throw error

    }
}

// loginWithPhone
export const loginWithPhone = async (phoneNumber: string, password: string): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/login/phone`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: JSON.stringify({ phoneNumber, password }),
        })

        return await response.json()
    } catch (error) {
        toast.error("Erreur réseau ou serveur.");
        throw error
    }
}
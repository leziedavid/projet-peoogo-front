
import { getUserInfos } from '@/app/middleware'
import { EnrollementData } from '@/types/ApiReponse/enrollementControleResponse'
import { ActiviteResponse, DepartmentResponse, DistrictResponse, LocaliteResponse, RegionResponse, SousPrefectureResponse, StatusDossier } from '@/types/ApiReponse/ListeResponse'
import { Product } from '@/types/ApiReponse/ProduitsResponse'
import { StatistiquesDesProduitsResponse } from '@/types/ApiReponse/StatistiquesDesProduitsResponse'
import { UserEnrollementData } from '@/types/ApiReponse/userEnrollementData'
import { BaseResponse } from '@/types/BaseResponse'
import { getBaseUrl } from '@/types/baseUrl'
import { Pagination } from '@/types/pagination'
import { tr } from 'date-fns/locale'

// getUserEnrollementDataByCode

export const getUserEnrollementDataByCode = async (code: string): Promise<BaseResponse<UserEnrollementData>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/parametres/code/${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la récupération des données d\'enrôlement et découpage :', error)
        throw error
    }
}

// 'Créer un nouveau produit
export const createProduct = async (formData: FormData): Promise<BaseResponse<Product>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/produit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: JSON.stringify(formData),
        })
        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la création du produit :', error)
        throw error
    }
}

// 'Mettre à jour un produit
export const updateProduct = async (id: string, formData: FormData): Promise<BaseResponse<Product>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/produit/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: JSON.stringify(formData),
        })
        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit :', error)
        throw error
    }
}

// 'Supprimer un produit'
export const deleteProduct = async (id: string): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/produit/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })
        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la suppression du produit :', error)
        throw error
    }
}

// getProductById
export const getProductById = async (id: string): Promise<BaseResponse<Product>> => {
    try {
        if (!id) throw new Error('ID du produit manquant')

        const response = await fetch(`${getBaseUrl()}/produit/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        return await response.json()

    } catch (error) {
        console.error('Erreur lors de la récupération du produit :', error)
        throw error
    }
}

// getAllProducts
export const getAllProducts = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Product>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/produits?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error)
        throw error
    }
}

// getAllProductsIsActive
export const getAllProductsIsActive = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Product>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/produits/actives/liste?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error)
        throw error
    }
}

// getAllProductsWithStatus
export const getAllProductsWithStatus = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Product>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/produits/admin/liste?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error)
        throw error
    }
}

// all/produits-admin
export const getAllProductsAdmin = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Product>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/produits/admin/liste?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error)
        throw error
    }
}

// produit-produiteur/:code
export const getProducteurProductsByCode = async (code: string,page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Product>>> => {
    try {

        if (!code) throw new Error('Code produit manquant')
        const response = await fetch(`${getBaseUrl()}/product/produit-produiteur/${code}?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        return await response.json()

    } catch (error) {
        console.error('Erreur lors de la récupération du produit :', error)
        throw error
    }
}
// produit-produiteur/:code/stats
export const getProducteurProductStats = async (code: string): Promise<BaseResponse<StatistiquesDesProduitsResponse>> => {
    try {
        if (!code) throw new Error('Code produit manquant')

        const response = await fetch(`${getBaseUrl()}/product/produit-produiteur/${code}/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        return await response.json()

    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques des produits :', error)
        throw error
    }
}

// getGlobalProductStats
export const getGlobalProductStats = async (): Promise<StatistiquesDesProduitsResponse> => {
    try {
    const response = await fetch(`${getBaseUrl()}/produit-global`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return await response.json()

    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques globales des produits :', error)
        throw error
    }
}
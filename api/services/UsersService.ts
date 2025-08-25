import { LoginDto, RefreshTokenResponse, RegisterDto, UserAuth } from '@/types/ApiRequest/Auth'
import { BaseResponse } from '@/types/BaseResponse'
import { getBaseUrl } from '@/types/baseUrl'
import { Pagination } from '@/types/pagination'

import { User } from '@/types/ApiReponse/UsersResponse'
import { Category, OrderStatus, Variant } from '@/types/AllTypes'
import { Product } from '@/types/ApiReponse/ProduitsResponse'
import { StatistiquesDesProduitsResponse } from '@/types/ApiReponse/StatistiquesDesProduitsResponse'
import { StatistiquesCommandesResponse } from '@/types/ApiReponse/StatistiquesCommandesResponse'
import { OrderPayload } from '@/types/ApiRequest/OrderPayloadRequest'
import { EcommerceOrder, EcommerceOrderResponse } from '@/types/ApiReponse/EcommerceOrderResponse'
import { MonthlyTransactionStat, MonthlyTransactionStatsResponse } from '@/types/ApiReponse/MonthlyTransactionStatsResponse'
import { TransactionResponse } from '@/types/ApiReponse/TransactionResponse'
import { StatistiquesTransactionResponse } from '@/types/ApiReponse/StatistiquesTransactionResponse'
import { toast } from 'sonner'
import { Order } from '@/types/ApiReponse/ordersResponse'
import { Message } from '@/types/ApiReponse/MessagesResponse'
import { EnrollementStatByDate, GeoCoord } from '@/types/ApiReponse/StatistiquesEnrollementResponse'


// filterUtilisateur

export const filterUsersTableau = async (filters: FilterRequest, page: number, limit: number): Promise<BaseResponse<Pagination<User>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/admin/filter/modeAffichage/params?page=${page}&limit=${limit}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: JSON.stringify(filters),
        });

        return await response.json();

    } catch (error) {
        console.error('Erreur lors du filtrage des enrôlements :', error);
        throw error;
    }
};

export const filterUsersmodeCarte = async (filters: FilterRequest, page: number, limit: number): Promise<BaseResponse<GeoCoord[]>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/admin/filter/modeAffichage/params?page=${page}&limit=${limit}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: JSON.stringify(filters),
        });

        return await response.json();

    } catch (error) {
        console.error('Erreur lors du filtrage des enrôlements :', error);
        throw error;
    }
};

export const filterUsersmodeGraphique = async (filters: FilterRequest, page: number, limit: number): Promise<BaseResponse<EnrollementStatByDate[]>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/admin/filter/modeAffichage/params?page=${page}&limit=${limit}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: JSON.stringify(filters),
        });

        return await response.json();

    } catch (error) {
        console.error('Erreur lors du filtrage des enrôlements :', error);
        throw error;
    }
};
import { LoginDto, RefreshTokenResponse, RegisterDto, UserAuth } from '@/types/ApiRequest/Auth'
import { BaseResponse } from '@/types/BaseResponse'
import { getBaseUrl } from '@/types/baseUrl'
import { Pagination } from '@/types/pagination'
import { Service } from '@/types/ApiReponse/ServicesResponse'
import { ServiceSubscription } from '@/types/ApiReponse/ServiceSubscriptionResponse'
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
import { trace } from 'console'
import { toast } from 'sonner'
import { Order } from '@/types/ApiReponse/ordersResponse'
import { Message } from '@/types/ApiReponse/MessagesResponse'
import { DashboardStatsResponse } from '@/types/ApiReponse/dashboardStatsResponse'
import { UserListDto } from '@/types/ApiReponse/userListResponse'


// ✅ Récupérer tous les utilisateurs
export const getAllUser = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<User>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/users?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error)
        throw error
    }
};

/** Récupère l'ID du service lié à la dernière souscription active d'un utilisateur pour un type de service donné */
// getLatestActiveServiceIdByUserAndType
export const getLatestActiveServiceIdByUserAndType = async (type: string): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/subscriptions/latest-active-service-id-by-user-and-type?type=${type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })
        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la récupération de l’ID du service :', error)
        throw error
    }
}

export const getOrdersAndRevenueStats = async (startDate?: string, endDate?: string): Promise<BaseResponse<StatistiquesCommandesResponse>> => {
    try {
        const url = new URL(`${getBaseUrl()}/products/admin/stats/orders-revenue`);
        if (startDate) url.searchParams.append('startDate', startDate);
        if (endDate) url.searchParams.append('endDate', endDate);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur ${response.status} : ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des graphiques commandes/revenus :', error);
        throw error;
    }

};

// Créer une commande e-commerce
export const submitOrder = async (payload: OrderPayload): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/ecommerce-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
            },
            body: JSON.stringify(payload),
        });

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la création de la commande :", error);
        throw error;
    }
};

// Annuler une commande e-commerce
export const cancelEcommerceOrder = async (orderId: string): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(
            `${getBaseUrl()}/ecommerce-order/${orderId}/cancel`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
                },
            }
        );

        const data: BaseResponse<any> = await response.json();
        return data; // ✅ on retourne bien la réponse

    } catch (error) {
        console.error("Erreur lors de l'annulation de la commande :", error);
        throw error;
    }
};


// ✅ Mettre à jour le statut d’une commande via URL (car backend : /:id/status/:status)
export const updateOrderStatusEcommerce = async (orderId: string, newStatus: OrderStatus): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(
            `${getBaseUrl()}/ecommerce-order/${orderId}/status/${newStatus}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
                },
                // ⚠️ Pas besoin de body ici !
            }
        );
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut de la commande :", error);
        throw error;
    }
};

// Commandes contenant des produits créés par l’utilisateur connecté
export const getOrdersByCreator = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<EcommerceOrder>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/ecommerce-order/creator/orders/me?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes créées par l’utilisateur :', error);
        throw error;
    }
};

// Récupérer toutes les commandes e-commerce
export const getAllOrders = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<EcommerceOrder>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/ecommerce-order?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
        throw error;
    }
};

// Récupérer toutes les commandes e-commerce de l'utilisateur connecté getOrdersByUserId
export const getOrdersByUserId = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<EcommerceOrder>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/ecommerce-order/user/me?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
        throw error;
    }
};

export const getOrdersHistoryByUserId = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<EcommerceOrder>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/ecommerce-order/user/me/history/by-user?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
        throw error;
    }
};

// Statistiques globales des commandes et gains Ecommerce
export const getOrderStatsAndGains = async (): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/ecommerce-order/stats/orders-gains`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques globales des commandes et gains :', error);
        throw error;
    }
};
// Statistiques des commandes et revenus par mois Ecommerce
export const getOrdersAndRevenueStatsEcommerce = async (startDate?: string, endDate?: string): Promise<BaseResponse<StatistiquesCommandesResponse>> => {
    try {
        const url = new URL(`${getBaseUrl()}/ecommerce-order/stats/orders-revenue`);
        if (startDate) url.searchParams.append('startDate', startDate);
        if (endDate) url.searchParams.append('endDate', endDate);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques des commandes et revenus par mois  :', error);
        throw error;
    }


}


// "Liste paginée de toutes les commandes (admin)"
export const getAllTransactions = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<TransactionResponse>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/transactions?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
            },
        });
        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la récupération des transactions :', error)
        throw error
    }
};

// Statistiques mensuelles  Admin des transactions

export const getMonthlyTransactionStats = async (startDate?: string, endDate?: string): Promise<BaseResponse<MonthlyTransactionStat[]>> => {
    try {
        const url = new URL(`${getBaseUrl()}/transactions/stats/monthly`);
        if (startDate) url.searchParams.append('startDate', startDate);
        if (endDate) url.searchParams.append('endDate', endDate);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques mensuelles des transactions :', error);
        throw error;
    }
};

export const getMonthlyUsersTransactionStats = async (startDate?: string, endDate?: string): Promise<BaseResponse<MonthlyTransactionStat[]>> => {
    try {
        const url = new URL(`${getBaseUrl()}/transactions/stats/monthly/user`);
        if (startDate) url.searchParams.append('startDate', startDate);
        if (endDate) url.searchParams.append('endDate', endDate);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques mensuelles des transactions :', error);
        throw error;
    }
};

// "Transactions paginées d'un utilisateur par ID"
export const getTransactionsByUser = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<TransactionResponse>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/transactions/user/me?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
            },
        });
        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la récupération des transactions :', error)
        throw error
    }
};

//  Statistiques utilisateur par type
export const getUserTransactionStat = async (): Promise<BaseResponse<StatistiquesTransactionResponse>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/transactions/stats/user/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });
        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la récupération des transactions :', error)
        throw error
    }
};

//  Statistiques Admin par type
export const getAllTransactionStat = async (): Promise<BaseResponse<StatistiquesTransactionResponse>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/transactions/stats/global`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });
        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la récupération des transactions :', error)
        throw error
    }
};


// Messages API

// Créer un message (texte et/ou image)
export const createMessage = async (payload: FormData): Promise<any> => {
    try {
        const response = await fetch(`${getBaseUrl()}/messages`, {
            method: 'POST',
            headers: {
                // NE PAS mettre Content-Type ici, le navigateur le définit automatiquement pour FormData
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: payload,
        });

        if (!response.ok) {
            throw new Error(`Erreur ${response.status} : ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la création du message :", error);
        throw error;
    }
};

// Mettre à jour un message
export const updateMessage = async (id: string, payload: FormData): Promise<any> => {
    try {
        const response = await fetch(`${getBaseUrl()}/messages/${id}`, {
            method: 'PATCH',
            headers: {
                // Ne pas définir 'Content-Type' quand on utilise FormData
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: payload,
        });

        if (!response.ok) {
            throw new Error(`Erreur ${response.status} : ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la mise à jour du message :", error);
        throw error;
    }
};


// Supprimer un message
export const deleteMessage = async (id: string): Promise<any> => {
    try {
        const response = await fetch(`${getBaseUrl()}/messages/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur ${response.status}`);
        }

        console.log(`Message ${id} supprimé avec succès.`);
        // Always return a BaseResponse, even after deletion
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la suppression du message :", error);
        throw error;
    }
};

// Récupère tous les messages liés à une commande (lastOrderId)
export const getMessagesByOrderId = async (lastOrderId: string): Promise<any> => {
    try {
        const response = await fetch(`${getBaseUrl()}/messages/order/${lastOrderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur ${response.status} : ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
        throw error;
    }
};

// Récupère les messages liés à une commande avec pagination
export const getMessagesByOrderIdPaginated = async (lastOrderId: string, page: number, limit: number): Promise<any> => {
    try {
        const response = await fetch(`${getBaseUrl()}/messages/order/${lastOrderId}?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur ${response.status} : ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
        throw error;
    }
};

// Récupère les messages envoyés par un utilisateur avec pagination (userId)
export const getMessagesByUserIdPaginated = async (page: number, limit: number): Promise<BaseResponse<Pagination<Message>>> => {
    try {

        const response = await fetch(`${getBaseUrl()}/messages/user/messages?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
        throw error;
    }
};

// getMessagesBySenderIdPaginated

export const getMessagesBySenderIdPaginated = async (senderId: string, page: number, limit: number): Promise<BaseResponse<Pagination<Message>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/messages/user/messages/senderId/${senderId}?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });

        return await response.json();

    } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
        throw error;
    }
};

/** Récupère tous les messages avec pagination */
//  getAllMessagesPaginated
export const getAllMessagesPaginated = async (page: number, limit: number): Promise<BaseResponse<Pagination<Message>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/messages/user/messages/all?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
        throw error;
    }
};

// getDashboardStats

// getDashboardStats
export const getDashboardStats = async (): Promise<DashboardStatsResponse> => {
    try {
        const response = await fetch(`${getBaseUrl()}/statistique/dashboard/compte`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques :', error);
        throw error;
    }
};

// export Users filtré par createdAt
export const exportUsersExcel = async (filter: any): Promise<void> => {
    try {
        const response = await fetch(`${getBaseUrl()}/statistique/users/export`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: JSON.stringify(filter),
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'users.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Erreur lors de l’export des utilisateurs :', error);
        throw error;
    }
};

// export Enrollements filtré par status_dossier et période start_date / end_date
export const exportEnrollementsExcel = async (filter: any): Promise<void> => {
    try {
        const response = await fetch(`${getBaseUrl()}/statistique/enrollements/export`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: JSON.stringify(filter),
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'enrollements.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Erreur lors de l’export des enrôlements :', error);
        throw error;
    }
};


// agents/enroleurs
export const getAgentsEnroleurs = async (): Promise<BaseResponse<UserListDto[]>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/agents/enroleurs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques :', error);
        throw error;
    }
};

// agents/controle

export const getAgentsControles = async (): Promise<BaseResponse<UserListDto[]>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/agents/controle`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques :', error);
        throw error;
    }
};

// Ontermined
export const Ontermined = async (agent_enroleur_id: string, numero_lot: string) => {
    try {
        const response = await fetch(`${getBaseUrl()}/agents/${agent_enroleur_id}/lots/${numero_lot}/terminate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques :', error);
        throw error;
    }
};

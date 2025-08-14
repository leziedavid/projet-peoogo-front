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


// Fonction pour récupérer tous les services
export const getAllServices = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Service>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/services?page=${page}&limit=${limit}`, {
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
        console.error('Erreur lors de la récupération des services :', error)
        throw error
    }
}

// ✅ Récupérer les souscriptions d’un utilisateur

export const getUserSubscriptions = async (
    page: number = 1,
    limit: number = 10
): Promise<BaseResponse<Pagination<ServiceSubscription>>> => {
    try {
        const response = await fetch(
            `${getBaseUrl()}/subscriptions/my-subscriptions?page=${page}&limit=${limit}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Erreur ${response.status} : ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des souscriptions :', error);
        throw error;
    }
};

export const handleSubscribes = async (payload: any): Promise<any> => {
    try {
        const res = await fetch(`${getBaseUrl()}/subscriptions/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: JSON.stringify(payload),
        });

        // if (!res.ok) {
        //     throw new Error(`Erreur ${res.status} : ${res.statusText}`);
        // }

        return await res.json();
    } catch (error) {
        console.error('Erreur lors de la souscription :', error);
        throw error;
    }
};

export const cancelSubscription = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${getBaseUrl()}/subscriptions/cancel/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur ${response.status}`);
        }

        console.log(`Souscription ${id} annulée avec succès.`);
    } catch (error) {
        console.error("Erreur lors de l'annulation de la souscription :", error);
        throw error;
    }
};

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


export const getAllCategories = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Category>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/categories=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const getCategories = async (): Promise<BaseResponse<Category[]>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })
        return await response.json()
    } catch (error) {
        throw error
    }
}


// liest des produits Admin
export const getAllProducts = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Product>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/products/admin/all?page=${page}&limit=${limit}`, {
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
        console.error('Erreur lors de la récupération des produits :', error)
        throw error
    }
}

// Récupérer un produit par ID
export const getProductById = async (id: string): Promise<BaseResponse<Product>> => {
    try {
        if (!id) throw new Error("ID du produit manquant")

        const response = await fetch(`${getBaseUrl()}/products/${id}`, {
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
        console.error('Erreur lors de la récupération du produit :', error)
        throw error
    }
}

// Liste des produits d’un service
export const getProductsByService = async (serviceId: string, page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Product>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/products?serviceId/${serviceId}?page=${page}&limit=${limit}`, {
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
        console.error('Erreur lors de la récupération des produits du service :', error)
        throw error
    }
}

// Tous les produits valides (non expirés)
export const getAllValidProducts = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Product>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/products/valid/user?page=${page}&limit=${limit}`, {
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
        console.error('Erreur lors de la récupération des produits valides :', error)
        throw error
    }
}

// Tous Produits valides pour l’utilisateur connecté
export const getUserValidProducts = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Product>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/products/valid/user?page=${page}&limit=${limit}`, {
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
        console.error('Erreur lors de la récupération des produits valides :', error)
        throw error
    }
}

// getVariantByVariantType
export const getVariantByVariantType = async (variantType: string): Promise<BaseResponse<Variant>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/variants/variantType/${variantType}`, {
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

// create a new product
export const createProduct = async (formData: FormData): Promise<BaseResponse<Product>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/products`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
                // Pas besoin de 'Content-Type': multipart/form-data → géré automatiquement par FormData
            },
            body: formData,
        });

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la création du produit :", error);
        throw error;
    }
};

//Mettre à jour un produit
export const updateProduct = async (id: string, formData: FormData): Promise<BaseResponse<Product>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/products/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: formData,
        });

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la mise à jour du produit :", error);
        throw error;
    }
};

//Supprimer un produit'
export const deleteProduct = async (id: string): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la suppression du produit :", error);
        throw error;
    }
};


// 1. getUserProductStats()

export const getUserProductStats = async (): Promise<BaseResponse<StatistiquesDesProduitsResponse>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/products/me/stats`, {
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
        console.error('Erreur lors de la récupération des statistiques utilisateur :', error);
        throw error;
    }
};

// ✅ 2. getGlobalProductStats()

export const getGlobalProductStats = async (): Promise<BaseResponse<StatistiquesDesProduitsResponse>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/products/admin/stats`, {
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
        console.error('Erreur lors de la récupération des statistiques globales :', error);
        throw error;
    }
};

// ✅ 3. getOrdersAndRevenueStats(startDate?: string, endDate?: string)

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

// Tous les produits valides (non expirés)
export const getAllProductsValides = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Product>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/products/valid/all?page=${page}&limit=${limit}`, {
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
        console.error('Erreur lors de la récupération des produits valides :', error)
        throw error
    }
}

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

// ✅ Mettre à jour le statut d’une commande via URL (car backend : /:id/status/:status)
export const updateOrderStatusEcommerce = async ( orderId: string,newStatus: OrderStatus): Promise<BaseResponse<any>> => {
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

export const getMessagesBySenderIdPaginated = async (senderId: string,page: number, limit: number): Promise<BaseResponse<Pagination<Message>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/messages/user/messages?page=${page}&limit=${limit}&senderId=${senderId}`, {
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
            const response = await fetch(`${getBaseUrl()}/messages/user/messages?page=${page}&limit=${limit}`, {
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

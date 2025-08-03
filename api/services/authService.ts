import { LoginDto, RefreshTokenResponse, RegisterDto, UserAuth } from '@/types/ApiRequest/Auth'
import { BaseResponse } from '@/types/BaseResponse'
import { getBaseUrl } from '@/types/baseUrl'
import { Pagination } from '@/types/pagination'
import { Trip } from '@/types/ApiReponse/trajetResponse'
import { ListesVehicle, Vehicle } from '@/types/ApiReponse/VehicleResponse'
import { getUserInfos } from '@/app/middleware'
import { Service } from '@/types/ApiReponse/ServicesResponse'
import { DriverInfo, VehicleWithDrivers } from '@/types/ApiReponse/Vehicle-with-drivers'
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



export const fetchTrips = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Trip>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/trips?page=${page}&limit=${limit}`, {
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

// Rechercher des trajets selon des critères géographiques et temporels

export const searchTrips = async (page: number = 1, limit: number = 10, payload: any): Promise<BaseResponse<Pagination<Trip>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/trips/search?page=${page}&limit=${limit}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Erreur ${response.status} : ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des trajets :', error);
        throw error;
    }
};

export const fetchTripsByDrivers = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Trip>>> => {
    try {
        const user = await getUserInfos();
        if (!user) throw new Error("Utilisateur non authentifié");
        // Utiliser partnerId s’il est défini, sinon fallback sur l'id de l'utilisateur
        const identifier = user.partnerId ?? user.id;
        const response = await fetch(
            `${getBaseUrl()}/trips/by-driver/${identifier}?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Erreur serveur: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des trajets du conducteur :", error);
        throw error;
    }
};

export const fetchTripById = async (tripId: string): Promise<BaseResponse<Trip>> => {
    try {
        if (!tripId) throw new Error("ID du trajet manquant");

        const response = await fetch(`${getBaseUrl()}/trips/${tripId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur serveur: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération du trajet :", error);
        throw error;
    }
};

// ✅ Création d'un trajet
export const createTrip = async (payload: any): Promise<BaseResponse<Trip>> => {
    const res = await fetch(`${getBaseUrl()}/trips`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
        },
        body: JSON.stringify(payload),
    });
    return await res.json();
};

// ✅ Modification d'un trajet
export const updateTrip = async (id: string, payload: any): Promise<BaseResponse<Trip>> => {
    const res = await fetch(`${getBaseUrl()}/trips/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
        },
        body: JSON.stringify(payload),
    });
    return await res.json();
};

// Nouvelle fonction pour récupérer les véhicules d'un partenaire
export const fetchVehiclesByPartner = async (partnerId: string, page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Vehicle>>> => {
    try {
        const url = `${getBaseUrl()}/vehicles/by-partner/${partnerId}?page=${page}&limit=${limit}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`, },
        })
        return await response.json()
    } catch (error) {
        throw error
    }
}

// fetchAllvehicles
export const fetchAllVehicles = async (): Promise<BaseResponse<ListesVehicle[]>> => {
    try {
        const user = await getUserInfos()

        if (!user) throw new Error('Utilisateur non authentifié')

        // Utiliser partnerId s’il est défini, sinon fallback sur l'id de l'utilisateur
        const identifier = user.partnerId ?? user.id

        const response = await fetch(`${getBaseUrl()}/vehicles?partnerId=${identifier}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        return await response.json()
    } catch (error) {
        console.error('Erreur dans fetchAllVehicles:', error)
        throw error
    }
}

// Fonction pour créer un véhicule
export const createVehicle = async (formData: FormData): Promise<BaseResponse<ListesVehicle>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/vehicles`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
                // Pas besoin de 'Content-Type': multipart/form-data → géré automatiquement par FormData
            },
            body: formData,
        });

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la création du véhicule :", error);
        throw error;
    }
};

// Fonction pour modifier un véhicule existant
export const updateVehicle = async (vehicleId: string, formData: FormData): Promise<BaseResponse<ListesVehicle>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/vehicles/${encodeURIComponent(vehicleId)}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
                // multipart/form-data → ne surtout pas définir le Content-Type manuellement
            },
            body: formData,
        });

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la mise à jour du véhicule :", error);
        throw error;
    }
};

// Fonction pour passer une commande
export const createOrder = async (orderId: string, userId: string | null): Promise<any> => {
    try {
        const response = await fetch(`${getBaseUrl()}/order/create/${orderId}?userId=${userId}`, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: null, // équivalent à `-d ''` dans curl
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la création de la commande :", error);
        throw error;
    }
};

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

// Fonction pour récupérer les véhicules avec leurs conducteurs
export const getVehiclesWithDrivers = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<VehicleWithDrivers>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/vehicles/with-drivers/all?page=${page}&limit=${limit}`, {
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


// Liste des véhicules d’un partenaire (sans pagination)
export const getAllVehiclesByPartner = async (): Promise<BaseResponse<ListesVehicle[]>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/vehicles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })
        return await response.json()
    } catch (error) {
        console.error('Erreur dans fetchAllVehicles:', error)
        throw error
    }
}
// Liste de tous les conducteurs d’un partenaire (sans pagination)
export const getAlldriversByPartner = async (): Promise<BaseResponse<DriverInfo[]>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/drivers/by-partner/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })
        return await response.json()
    } catch (error) {
        console.error('Erreur dans fetchAllVehicles:', error)
        throw error
    }
}

// ✅ PATCH /api/auth/vehicle/{vehicleId}/assign-driver/{driverId}
export const assignDriver = async (vehicleId: string, driverId: string): Promise<BaseResponse<any>> => {

    const res = await fetch(`${getBaseUrl()}/auth/vehicle/${vehicleId}/assign-driver/${driverId}`, {
        method: 'PATCH',
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${localStorage.getItem('access_token') || ''}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to assign driver: ${res.statusText}`);
    }

    return await res.json();
};


// ✅ PATCH /api/auth/vehicle/{vehicleId}/remove-driver/{driverId}
export const removeDriver = async (vehicleId: string, driverId: string): Promise<BaseResponse<any>> => {

    const res = await fetch(`${getBaseUrl()}/auth/vehicle/${vehicleId}/remove-driver/${driverId}`, {
        method: 'PATCH',
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${localStorage.getItem('access_token') || ''}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to assign driver: ${res.statusText}`);
    }

    return await res.json();
};


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
        const response = await fetch(`${getBaseUrl()}/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur ${response.status}`);
        }

        console.log(`Produit ${id} supprimé avec succès.`);
        // Always return a BaseResponse, even after deletion
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
export const updateOrderStatusEcommerce = async (
    orderId: string,
    newStatus: OrderStatus
): Promise<BaseResponse<any>> => {
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


// api pour les commandes sur un trajet (trip)

// Créer une commande sur un trajet
export const createOrderTrajet = async (tripId: string): Promise<any> => {
    try {
        const token = localStorage.getItem('access_token');

        if (!token) {
            toast.error('Vous devez être connecté pour créer une commande.');
        }

        const response = await fetch(`${getBaseUrl()}/order/tripId/${tripId}`, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la création de la commande trajet :", error);
        throw error;
    }
};

// Annuler une commande de trajte
export const cancelOrderTrajet = async (orderId: string): Promise<any> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour annuler une commande.');
        }

        const response = await fetch(`${getBaseUrl()}/order/cancel/${orderId}`, {
            method: 'PATCH',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de l'annulation de la commande trajet :", error);
        throw error;
    }
};

// Valider une commande de trajte (chauffeur)

export const validateOrderTrajet = async (orderId: string): Promise<any> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour valider une commande.');
        }

        const response = await fetch(`${getBaseUrl()}/order/validate/${orderId}`, {
            method: 'PATCH',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la validation de la commande trajet :", error);
        throw error;
    }
};

// Terminer une commande de trajte (chauffeur)

export const completeOrderTrajet = async (orderId: string): Promise<any> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour terminer une commande.');
        }

        const response = await fetch(`${getBaseUrl()}/order/complete/${orderId}`, {
            method: 'PATCH',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la validation de la commande trajet :", error);
        throw error;
    }
};

// Obtenir les statistiques des commande d’un chauffeur

export const getDriverStats = async (driverId: string): Promise<any> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour obtenir les statistiques.');
        }

        const response = await fetch(`${getBaseUrl()}/order/stats/driver/${driverId}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des statistiques des commandes du chauffeur :", error);
        throw error;
    }
};

// Obtenir les statistiques des commandes d’un partenaire
export const getPartnerStats = async (partnerId: string): Promise<any> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour obtenir les statistiques.');
        }

        const response = await fetch(`${getBaseUrl()}/order/stats/partner/${partnerId}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des statistiques des commandes du chauffeur :", error);
        throw error;
    }
};

// Obtenir toutes les commandes d’un utilisateur getAllUsersTripOrders
export const getAllUsersTripOrders = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Order>>> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour obtenir les commandes.');
        }
        const userId = null;
        const response = await fetch(`${getBaseUrl()}/order/user/${userId}/all?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des commandes de l'utilisateur :", error);
        throw error;
    }
};

// Obtenir les commandes du jour d’un utilisateur getTodayOrdersByUser
export const getTodayOrdersByUser = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Order>>> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour obtenir les commandes.');
        }
        const userId = null;
        const response = await fetch(`${getBaseUrl()}/order/user/${userId}/today?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des commandes du jour d'un utilisateur :", error);
        throw error;
    }
};

// Obtenir les commandes annulées d’un utilisateur getCanceledOrdersByUser
export const getCanceledOrdersByUser = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Order>>> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour obtenir les commandes.');
        }
        const userId = null;
        const response = await fetch(`${getBaseUrl()}/order/user/${userId}/canceled?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });


        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des commandes annulées d'un utilisateur :", error);
        throw error;
    }
};

// Obtenir les commandes validées d’un utilisateur getValidatedOrdersByUser
export const getValidatedOrdersByUser = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Order>>> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour obtenir les commandes.');
        }
        const userId = null;
        const response = await fetch(`${getBaseUrl()}/order/user/${userId}/validated?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });


        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des commandes validées d'un utilisateur :", error);
        throw error;
    }
};

// Obtenir toutes les commandes d’un chauffeur getAllDriverTripOrders
export const getAllDriverTripOrders = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Order>>> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour obtenir les commandes.');
        }
        const driverId = null;
        const response = await fetch(`${getBaseUrl()}/order/driver/${driverId}/all?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });


        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des commandes du chauffeur :", error);
        throw error;
    }
};

// Obtenir les commandes du jour d’un chauffeur getTodayOrdersByDriver
export const getTodayOrdersByDriver = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Order>>> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour obtenir les commandes.');
        }
        const driverId = null;
        const response = await fetch(`${getBaseUrl()}/order/driver/${driverId}/today?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });


        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des commandes du jour d'un chauffeur :", error);
        throw error;
    }
};
// Obtenir les commandes annulées d’un chauffeur getCanceledOrdersByDriver
export const getCanceledOrdersByDriver = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Order>>> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour obtenir les commandes.');
        }
        const driverId = null;
        const response = await fetch(`${getBaseUrl()}/order/driver/${driverId}/canceled?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des commandes annulées d'un chauffeur :", error);
        throw error;
    }
};

// Obtenir les commandes validées d’un chauffeur getValidatedOrdersByDriver
export const getValidatedOrdersByDriver = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Order>>> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour obtenir les commandes.');
        }
        const driverId = null;
        const response = await fetch(`${getBaseUrl()}/order/driver/${driverId}/validated?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des commandes validées d'un chauffeur :", error);
        throw error;
    }
};

// Obtenir toutes les commandes d’un partenaire getAllPartnerTripOrders
export const getAllPartnerTripOrders = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Order>>> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour obtenir les commandes.');
        }
        const partnerId = null;
        const response = await fetch(`${getBaseUrl()}/order/partner/${partnerId}/all?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des commandes du partenaire :", error);
        throw error;
    }
};

// Obtenir les commandes du jour d’un partenaire getTodayOrdersByPartner
export const getTodayOrdersByPartner = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Order>>> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour obtenir les commandes.');
        }
        const partnerId = null;
        const response = await fetch(`${getBaseUrl()}/order/partner/${partnerId}/today?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur HTTP ${response.status} : ${errorText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des commandes du jour d'un partenaire :", error);
        throw error;
    }
};
// Obtenir les commandes annulées d’un partenaire getCanceledOrdersByPartner
export const getCanceledOrdersByPartner = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Order>>> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour obtenir les commandes.');
        }
        const partnerId = null;
        const response = await fetch(`${getBaseUrl()}/order/partner/${partnerId}/canceled?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur HTTP ${response.status} : ${errorText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des commandes annulées d'un partenaire :", error);
        throw error;
    }
};

// Obtenir les commandes validées d’un partenaire getValidatedOrdersByPartner
export const getValidatedOrdersByPartner = async (page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Order>>> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('Vous devez être connecté pour obtenir les commandes.');
        }
        const partnerId = null;
        const response = await fetch(`${getBaseUrl()}/order/partner/${partnerId}/validated?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            }
            // Pas besoin de "body" si vide
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur HTTP ${response.status} : ${errorText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des commandes validées d'un partenaire :", error);
        throw error;
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
"use client";

import { DataTable } from "@/components/table/dataTable";
import { getUserColumns } from "@/types/columns/users-columns";
import { useOrderSocket } from '@/lib/socket/useOrderSocket';
import { User } from "@/types/ApiReponse/UsersResponse";
import { useEffect, useState } from "react";
import { getAllUser } from "@/api/services/authService";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import FilesPreviewDialog from "@/components/form/filesPreviewDialog";
import FilterUser from "@/components/filter/FilterUser";
import { filterEnrollementsmodeCarte, filterEnrollementsmodeGraphique, filterEnrollementsTableau, getAllPaginate } from '@/api/services/enrollementsServices';
import { EnrollementData } from "@/types/ApiReponse/enrollementControleResponse";
import { EnrollementStatByDate, GeoCoord } from "@/types/ApiReponse/StatistiquesEnrollementResponse";
import { toast } from "sonner";
import AddUsersForms from "@/components/form/AddUsersForms";
import { Role, TypeCompte, UserFormValues, UserStatus } from "@/types/ApiRequest/User";
import { deleteUser } from "@/api/services/auth";
import DeleteDialog from '@/components/Dialog/DeleteDialog';


export default function Page() {

    // useOrderSocket() 

    const [user, setUser] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [initialValues, setInitialValues] = useState<UserFormValues>();
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [modeAffichage, setModeAffichage] = useState<'tableau' | 'carte' | 'graphique'>('tableau');
    const [results, setResults] = useState<EnrollementData[]>([]);
    const [listes, setListes] = useState<EnrollementData[]>([]);
    const [resultsGraphique, setResultsGraphique] = useState<EnrollementStatByDate[]>([]);
    const [resultsCarte, setResultsCarte] = useState<GeoCoord[]>([]);
    const [deleteDialog, setDeleteDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);



    const fetchefilterEnrollementsTableau = async (filter: FilterRequest) => {
        setLoading(true);
        const data = await filterEnrollementsTableau(filter, currentPage, limit);
        if (data.statusCode === 200) {
            setListes(data?.data?.data ?? []);
            setTotalItems(data?.data?.total ?? 0);
            setCurrentPage(data?.data?.page ?? 1);
            setLoading(false);
        } else {
            setLoading(false);
            setListes([]);
        }
    };

    const fetchefilterEnrollementsmodeGraphique = async (filter: FilterRequest) => {
        setLoading(true);
        const data = await filterEnrollementsmodeGraphique(filter, currentPage, limit);
        if (data.statusCode === 200) {
            setResultsGraphique(data?.data ?? []);
            setLoading(false);
        } else {
            setLoading(false);
            setListes([]);
        }
    };

    const fetchefilterEnrollementsmodeCarte = async (filter: FilterRequest) => {
        setLoading(true);
        const data = await filterEnrollementsmodeCarte(filter, currentPage, limit);
        if (data.statusCode === 200) {
            setResultsCarte(data?.data ?? []);
            setLoading(false);
        } else {
            setLoading(false);
            setListes([]);
        }
    };

    const searchData = async (filter: FilterRequest): Promise<void> => {
        setLoading(true);

        try {

            const mode = (filter.modeAffichage === 'tableau' || filter.modeAffichage === 'carte' || filter.modeAffichage === 'graphique') ? filter.modeAffichage : 'tableau';
            setModeAffichage(mode); // ✅ Met à jour le mode dans le state

            console.log('Filtre appliqué:', filter);
            console.log('Filtre appliqué:', filter);

            const handlers: Record<string, (f: FilterRequest) => void> = {
                carte: fetchefilterEnrollementsmodeCarte,
                graphique: fetchefilterEnrollementsmodeGraphique,
                tableau: fetchefilterEnrollementsTableau,
            };

            const handler = handlers[mode] || fetchefilterEnrollementsTableau;
            await handler({ ...filter, modeAffichage: mode });

        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = (url: string, isImg: boolean) => {
        if (isImg) {
            setPreviewUrl(url);
            setDialogOpen(true);
        } else {
            window.open(url, "_blank");
        }
    };

    const fetchData = async () => {
        try {
            const res = await getAllUser(currentPage, limit);
            if (res.data) {
                setUser(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);


    function handleChangeState(row: User, newStates: string[]) {
        alert(`Change state of ${row.id} to ${newStates.join(", ")}`);
    }

    function formatUserForForm(row: User): UserFormValues {
        return {
            id: row.id,
            name: row.name || '',
            email: row.email || '',
            password: '',
            confirmPassword: '',
            role: Object.values(Role).includes(row.role as Role) ? (row.role as Role) : undefined,
            typeCompte: Object.values(TypeCompte).includes(row.typeCompte as TypeCompte) ? (row.typeCompte as TypeCompte) : undefined,
            status: Object.values(UserStatus).includes(row.status as UserStatus) ? (row.status as UserStatus) : undefined,
            phoneCountryCode: row.phoneCountryCode || '',
            phoneNumber: row.phoneNumber || '',
            file: undefined,
        };
    }

    // Exemple d'utilisation
    function handleUpdate(row: User) {
        setIsFormOpen(true);
        setInitialValues(formatUserForForm(row));
    }


    function handleDelete(row: any) {
        setSelectedId(row.id);
        setDialogOpen(true);
    }

    const handleDeleteClick = async (id: string): Promise<void> => {
        const result = await deleteUser(id);
        if (result.statusCode !== 200) {
            toast.error(result.message);
            fetchData();
        } else {
            toast.success("utilisateur supprimé avec succès");
            setDeleteDialogOpen(false);
            fetchData();
        }
    };

    function handleValidate(row: User, val: string | number) {
        alert(`Validate ${row.id} with value: ${val}`);
    }

    function handleNextPage() {
        if (currentPage < Math.ceil(totalItems / limit)) {
            setCurrentPage(currentPage + 1);
        } else {
            toast.error("Vous êtes déjà sur la dernière page.");
        }
    }

    function handlePreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            toast.error("Vous êtes déjà sur la première page.");
        }
    }
    
    function openUserForm() {
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
        setInitialValues(undefined);
        fetchData();
    }


    const isDataEmpty = !user || user.length <= 0;

    return (

        <div className="w-full overflow-x-auto">


            <FilterUser onFilter={searchData} />

            <div className="flex justify-end mb-4 space-x-2">
                <Button onClick={openUserForm} className="bg-gray-600 hover:bg-[#B07B5E] text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2" >
                    <UserPlus className="w-4 h-4" />
                    Ajouter un compte
                </Button>
            </div>


            {isDataEmpty ? (

                <DataTableSkeleton columnCount={5} rowCount={10} />

            ) : (

                <>
                    <DataTable
                        columns={getUserColumns(handlePreview)}
                        data={user}
                        onChangeState={handleChangeState}
                        onUpdateData={handleUpdate}
                        onDeleteData={handleDelete}
                        onNextPage={handleNextPage}
                        onPreviousPage={handlePreviousPage}
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={limit}
                    />


                    <FilesPreviewDialog imageUrl={previewUrl} open={dialogOpen} onOpenChange={setDialogOpen} />
                </>

            )}

            {isFormOpen && (
                <AddUsersForms initialValue={initialValues} onClose={closeForm} isOpen={isFormOpen} fetchData={fetchData} />
            )}
            
                <DeleteDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onConfirm={() => {  if (selectedId) handleDeleteClick(selectedId);}}/>

        </div>
    );
}



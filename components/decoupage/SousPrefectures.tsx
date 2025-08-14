'use client';

import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { DistrictResponse, SousPrefectureResponse } from "@/types/ApiReponse/ListeResponse";
import {getSousPrefectures } from "@/api/services/decoupageServices";
import { DataTable } from '@/components/table/dataTable';
import { columns as columnSousPrefecture } from "@/types/columns/sousPrefecturesColumns";

export default function SousPrefectures() {

    const [isMobile, setIsMobile] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);
    // pour la supression
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [sousPrefectures, setSousPrefectures] = useState<SousPrefectureResponse[]>([]);
    // const [localites, setLocalites] = useState<LocaliteResponse[]>([]);

    // Gestion des actions (peut-être adapté selon ta logique)


    const getDistrict = async () => {
        try {
            const res = await getSousPrefectures(currentPage, limit);

            if (res.statusCode === 200 && res.data) {
                setSousPrefectures(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getDistrict();
    }, [currentPage]);

    function handleChangeState(row: any, newStates: string[]) {
        alert(`Change state of ${row.id} to ${newStates.join(", ")}`);
    }

    function handleUpdate(row: any) {

    }

    function handleDelete(row: any) {
        setSelectedId(row.id);
        setDialogOpen(true);
    }

    const handleDeleteClick = async (id: string): Promise<void> => {
    };

    function handleNextPage() {
        if (currentPage < Math.ceil(totalItems / limit)) {
            setCurrentPage(currentPage + 1);
        } else {
            alert("Vous êtes déjà sur la dernière page.");
        }
    }

    function handlePreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            alert("Vous êtes déjà sur la première page.");
        }
    }




    return (
        <>

            <div className="w-full overflow-x-auto">

                <div className='mt-4'>
                    <h3 className="text-lg font-semibold">Lites des districts</h3>
                    <p className="text-sm text-gray-600">{sousPrefectures.length} résultats trouvés</p>
                </div>

                <DataTable
                    columns={columnSousPrefecture}
                    data={sousPrefectures}
                    onChangeState={handleChangeState}
                    onUpdateData={handleUpdate}
                    onNextPage={handleNextPage}
                    onPreviousPage={handlePreviousPage}
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={limit}
                />

            </div>
        </>
    );

}

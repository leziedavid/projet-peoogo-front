'use client';

import React, { useState, useEffect } from 'react';
import { filterEnrollementsmodeCarte, filterEnrollementsmodeGraphique, filterEnrollementsTableau, getAllPaginate } from '@/api/services/enrollementsServices';
import { EnrollementData } from '@/types/ApiReponse/enrollementControleResponse';
import Image from 'next/image';
import { columns as enrollementColumns } from '@/types/columns/enrollement-columns';
import { DataTableSkeleton } from '@/components/table/data-table-skeleton';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { DataTable } from '@/components/table/dataTable';
import { Card, CardHeader } from '@/components/ui/card';
import SearchFilter from '@/components/filter/GlobalFilter';
import DetailEnrollement from '@/components/filter/DetailEnrollement';
import { fa } from 'zod/v4/locales';
import { EnrollementStatByDate, GeoCoord } from '@/types/ApiReponse/StatistiquesEnrollementResponse';
import EnrollementGraph from '@/components/chart/EnrollementGraph';
import EnrollementMap from '@/components/chart/EnrollementMap.client';

const DEFAULT_IMAGE_URL = '/IMG_5195.png';

export default function Page() {
    const [listes, setListes] = useState<EnrollementData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [InitialValue, setInitialValues] = useState<EnrollementData | undefined>(undefined);
    const [resultsGraphique, setResultsGraphique] = useState<EnrollementStatByDate[]>([]);
    const [resultsCarte, setResultsCarte] = useState<GeoCoord[]>([]);
    const [modeAffichage, setModeAffichage] = useState<'tableau' | 'carte' | 'graphique'>('tableau');

    const stateMap: Record<string, string> = {
        "EN ATTENTE": "PENDING",
        "VALIDÉ": "VALIDATED",
        "EN COURS": "IN_PROGRESS",
        "DÉMARRÉ": "STARTED",
        "TERMINÉ": "COMPLETED",
        "ANNULÉ": "CANCELLED",
    };
    const [results, setResults] = useState<EnrollementData[]>([]);

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

    // const searchData = async (filter: FilterRequest): Promise<void> => {
    //     setLoading(true);

    //     try {
    //         console.log('Filtre appliqué:', filter);
    //         switch (filter.modeAffichage) {
    //             case 'carte':
    //                 fetchefilterEnrollementsmodeCarte(filter);
    //                 break;
    //             case 'graphique':
    //                 fetchefilterEnrollementsmodeGraphique(filter);
    //                 break;

    //             case 'tableau':
    //                 fetchefilterEnrollementsTableau(filter);

    //             default:
    //                 filter.modeAffichage = 'tableau';
    //                 fetchefilterEnrollementsTableau(filter);
    //                 break;
    //         }

    //     } catch (error) {
    //         console.error('Erreur lors de la recherche:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const fetchEnrollements = async (page: number, limit: number) => {

        setLoading(true);
        try {
            const response = await getAllPaginate(page, limit);
            if (response.statusCode === 200) {
                setListes(response?.data?.data ?? []);
                setTotalItems(response?.data?.total ?? 0);
                setCurrentPage(response?.data?.page ?? 1);
            } else {
                console.error("Erreur lors de la récupération des enrôlements :", response.message);
                setListes([]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des enrôlements :", error);
            setListes([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnrollements(currentPage, limit);
    }, [currentPage, limit]);

    const isDataEmpty = !loading && listes.length === 0;

    async function handleChangeState(row: EnrollementData, newStates: string[]) {

    }


    const onClose = () => {
        setIsFormOpen(false);
        setInitialValues(undefined);
    }
    function handleUpdate(row: EnrollementData) {
        setInitialValues(row);
        setIsFormOpen(true);
    }

    function handleDelete(row: EnrollementData) {

    }

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

        <div className="w-full overflow-x-auto mb-4">

            <h1 className="text-2xl font-bold">Statistiques sur les enrollements</h1>

            <SearchFilter onFilter={searchData} />

                {loading ? (

                    <DataTableSkeleton columnCount={5} rowCount={10} />

                ) : isDataEmpty ? (

                    <div className="flex flex-col items-center justify-center mt-10 text-center">
                        <Image
                            src="/error.svg"
                            alt="Aucune donnée"
                            width={180}
                            height={180}
                        />
                        <p className="mt-4 text-gray-600 text-sm">Aucune donnée trouvée</p>
                    </div>

                ) : (

                <>
                            <div className='mt-4'>
                                <h3 className="text-lg font-semibold">Résultats de la recherche</h3>
                                <p className="text-sm text-gray-600">{listes.length} résultats trouvés</p>
                            </div>

                            {modeAffichage === 'tableau' && (
                                <DataTable
                                    columns={enrollementColumns}
                                    data={listes}
                                    onChangeState={handleChangeState}
                                    onUpdateData={handleUpdate}
                                    onDeleteData={handleDelete}
                                    onNextPage={handleNextPage}
                                    onPreviousPage={handlePreviousPage}
                                />
                            )}

                            {modeAffichage === 'graphique' && (
                                <EnrollementGraph data={resultsGraphique} />
                            )}

                            {modeAffichage === 'carte' && (
                                <EnrollementMap data={resultsCarte} />
                            )}
                </>

            )}

            <DetailEnrollement initialValue={InitialValue} isOpen={isFormOpen} onClose={onClose} />

        </div>

    );
}
'use client';

import { useEffect, useState, useTransition } from 'react';
import { Clock, Bookmark, Users, Play, Store, UserPlus, FileText, Calendar, ChevronDown, LucideIcon, Flame, Send, Heart, Eye, NotepadText, MapPinned, Car, LayoutGrid, PiggyBank, ArrowLeftRight } from "lucide-react"

export function Tableau() {

    return (

        <div className="dark:bg-gray-800 w-full">

            <div className="col-span-3 md:col-span-2 flex flex-col items-center md:items-start gap-4 pt-1 px-2">

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8 pt-4 mx-auto w-full">

                    <div title="All contributed components"
                        className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                        <div className="flex gap-2 items-center">
                            <span className="font-bold text-2xl md:text-2xl">30</span>
                            <NotepadText className="w-8 h-8" />
                        </div>
                        <span className="font-semibold text-sm text-center">Commandes</span>
                    </div>

                    <div title="Users got help"
                        className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                        <div className="flex gap-2 items-center">
                            <span className="font-bold text-2xl md:text-2xl">93.9k</span>
                            <Users className="w-8 h-8" />
                        </div>
                        <span className="font-semibold text-sm text-center">Comptes</span>
                    </div>

                    <div title="Total favorites received on components"
                        className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                        <div className="flex gap-2 items-center">
                            <span className="font-bold text-2xl md:text-2xl">60</span>
                            <MapPinned className="w-8 h-8" />
                        </div>
                        <span className="font-semibold text-sm text-center">Trajets</span>
                    </div>

                    <div title="component views"
                        className="md:col-start-2 lg:col-auto flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                        <div className="flex gap-2 items-center">
                            <span className="font-bold text-2xl md:text-2xl">3.3k</span>
                            <Car className="w-8 h-8" />
                        </div>
                        <span className="font-semibold text-sm text-center">Vehicules</span>
                    </div>


                    <div title="All contributed components"
                        className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                        <div className="flex gap-2 items-center">
                            <span className="font-bold text-2xl md:text-2xl">30</span>
                            <LayoutGrid className="w-8 h-8" />
                        </div>
                        <span className="font-semibold text-sm text-center">Produits</span>
                    </div>

                    <div title="Users got help"
                        className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                        <div className="flex gap-2 items-center">
                            <span className="font-bold text-2xl md:text-2xl">93.9k</span>
                            <Users className="w-8 h-8" />
                        </div>
                        <span className="font-semibold text-sm text-center">Chauffeurs</span>
                    </div>

                    <div title="Total favorites received on components"
                        className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                        <div className="flex gap-2 items-center">
                            <span className="font-bold text-2xl md:text-2xl">60 F</span>
                            <PiggyBank className="w-8 h-8" />
                        </div>
                        <span className="font-semibold text-sm text-center">Gains</span>
                    </div>

                    <div title="component views"
                        className="md:col-start-2 lg:col-auto flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                        <div className="flex gap-2 items-center">
                            <span className="font-bold text-2xl md:text-2xl">3.3k</span>
                            <ArrowLeftRight className="w-8 h-8" />
                        </div>
                        <span className="font-semibold text-sm text-center">Transactions</span>
                    </div>

                </div>


            </div>

        </div>

    );
}

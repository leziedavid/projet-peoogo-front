
'use client';

import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import EnrollementForm from '@/components/form/EnrollementForm';
import { isSessionStillValid } from '../middleware';
import EnrollementLogin from '@/components/form/EnrollementLogin';

const Page = () => {

    const [activeTab, setActiveTab] = useState('ENROLEMENT REJETER');

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [loginStateChange, setLoginStateChange] = useState(false); // Pour écouter les changements

    const tabs = [
        { id: 'ENROLEMENT REJETER', label: 'ENROLEMENT REJETER', badge: 3 },
        { id: 'FORMULAIRE', label: 'FORMULAIRE', badge: null },
    ];

    // 🔄 Vérifie la session au montage et à chaque changement de loginStateChange
    useEffect(() => {
        const checkSession = async () => {
            const valid = await isSessionStillValid();
            setIsLoggedIn(valid);
            if (!valid) {
                setLoginModalOpen(true); // Ouvre automatiquement le modal si non connecté
            }
        };
        checkSession();
    }, [loginStateChange]);

    const handleLoginSuccess = () => {
        setLoginStateChange(!loginStateChange); // Déclenche une revalidation
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'ENROLEMENT REJETER':
                return (
                    <div className="bg-white rounded-lg p-6">
                        <h3 className="text-lg text-[#045d28] font-semibold  mb-4">Enrôlements Rejetés</h3>
                        <p className=" mb-4">Liste des enrôlement rejetées.</p>
                        <div className="space-y-3">
                            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                                <h4 className="font-medium text-red-800">Enrôlement #001</h4>
                                <p className="text-sm text-red-600">Rejetée le 20/07/2025 - Documents incomplets</p>
                            </div>
                            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                                <h4 className="font-medium text-red-800">Enrôlement #002</h4>
                                <p className="text-sm text-red-600">Rejetée le 18/07/2025 - Informations incorrectes</p>
                            </div>
                            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                                <h4 className="font-medium text-red-800">Enrôlement #003</h4>
                                <p className="text-sm text-red-600">Rejetée le 15/07/2025 - Critères non respectés</p>
                            </div>
                        </div>
                    </div>
                );
            case 'FORMULAIRE':
                return (
                    <div className="">
                        <EnrollementForm initialValues={{}} />
                    </div>
                );
            default:
                return null;
        }
    };

    // 🛡️ Affichage de l'écran de garde si pas connecté
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col text-center p-4">
                {/* Nom de l'application */}
                <h1 className="text-4xl font-bold text-[#045d28] mb-4">App Collecte</h1>
                <p className="text-sm text-gray-600 mb-6">Votre outil de suivi terrain</p>

                <img src="/collecte.svg"  alt="Verrouillé" className="w-40 h-40 mb-6"  />
                <h2 className="text-xl font-semibold mb-2 text-gray-700">
                    Vous devez vous connecter pour accéder au formulaire
                </h2>
                <p className="text-gray-500 mb-4">
                    Veuillez cliquer sur le bouton ci-dessous pour vous connecter avec votre code d'enrôlement.
                </p>
                <button
                    onClick={() => setLoginModalOpen(true)}
                    className="text-white bg-[#045d28] hover:bg-green-700 font-medium rounded-lg text-sm px-6 py-2"
                >
                    Se connecter
                </button>

                {/* Modal de connexion */}
                <EnrollementLogin
                    isOpen={loginModalOpen}
                    onClose={() => setLoginModalOpen(false)}
                    state={loginStateChange}
                />
            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gray-50 py-8 bg-white ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* User Profile Card - Centered */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-lg p-6 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-[#045d28]">
                            <User size={50} className="text-gray-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">DAVID TRA BI</h1>
                        <p className="text-gray-600">AGENT ENROLLEUR</p>
                    </div>
                </div>
                {/* Tabs Navigation */}
                <div className="bg-white rounded-lg mb-6">
                    <div className=" border-gray-200">
                        <nav className="flex flex-wrap justify-center gap-2 p-4">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-[#045d28] text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`} >
                                    {tab.label}
                                    {tab.badge && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {tab.badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="mb-8">
                    {renderTabContent()}
                </div>
            </div>

            {/* Modal connexion (au cas où l'utilisateur le referme manuellement mais veut se reconnecter) */}
            <EnrollementLogin
                isOpen={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                state={loginStateChange}
            />

        </div>
        
    );

};

export default Page;
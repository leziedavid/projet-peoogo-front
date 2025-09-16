'use client';
import React, { useState } from 'react';
import SliderManager from '@/components/form/SliderManager';
import PubliciteManager from '@/components/form/PubliciteManager';
import ReglageManager from '@/components/form/ReglageManager';
import { FileText, Settings, Image, Users } from 'lucide-react';
import PartenaireManager from '@/components/form/PartenaireManager';

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState('sliders');

    return (

        <div className="w-full overflow-x-auto">
            <div className="min-h-screen bg-gray-50 mb-10">
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-4xl mx-auto px-6">
                        <nav className="flex space-x-8" aria-label="Tabs">
                            {[
                                { id: 'sliders', name: 'Sliders', icon: Image },
                                { id: 'reglages', name: 'Réglages', icon: Settings },
                                { id: 'publicites', name: 'Publicités', icon: FileText },
                                { id: 'partenaires', name: 'Partenaires', icon: Users },
                            ].map((tab) => {
                                const IconComponent = tab.icon;
                                return (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`} >
                                        <IconComponent className="h-4 w-4" />
                                        {tab.name}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {activeTab === 'sliders' && <SliderManager />}
                {activeTab === 'reglages' && <ReglageManager />}
                {activeTab === 'publicites' && <PubliciteManager />}
                {activeTab === 'partenaires' && <PartenaireManager />}
            </div>

        </div>

    );
}

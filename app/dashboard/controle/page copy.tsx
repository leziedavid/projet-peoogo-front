
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {CheckCircle,Clock,XCircle,ChevronLeft,ChevronRight,SkipBack,SkipForward,RefreshCw,Phone} from 'lucide-react';

const QualityControlInterface = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages] = useState(50);
    const [status, setStatus] = useState('');

    const stats = {
        validated: { count: 0, color: 'bg-green-500', icon: CheckCircle },
        pending: { count: 50, color: 'bg-yellow-500', icon: Clock },
        rejected: { count: 0, color: 'bg-red-500', icon: XCircle }
    };

    const currentRecord = {
        lotNumber: '1753263164',
        status: 'NON TRAITE',
        enrollmentDate: '12-11-2024',
        enrollerName: 'KONAN AYA DECOTTE GISELE (aD103)',
        district: 'GOH-DJIBOUA',
        subPrefecture: 'LAKOTA',
        region: 'LOH-DJIBOUA',
        locality: 'ZOKOLLIÉ',
        department: 'LAKOTA',
        recordId: '8011',
        firstName: 'BAKOUAN',
        lastName: 'THEOTIME',
        birthDate: '30/12/1989',
        birthPlace: 'DASSA BF',
        gender: 'Masculin',
        activity: 'Producteur',
        phone: '0747740893',
        documentType: 'Aucun'
    };

    const handleNavigation = (direction:any) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'first') {
            setCurrentPage(1);
        } else if (direction === 'last') {
            setCurrentPage(totalPages);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-teal-600 text-white p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Controle & Supervision</h1>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <RefreshCw className="w-4 h-4 text-teal-600" />
                        </div>
                        <span className="bg-teal-700 px-2 py-1 rounded text-sm">TB</span>
                    </div>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-white border-b px-6 py-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span className="hover:text-gray-900 cursor-pointer">Accueil</span>
                    <span>›</span>
                    <span className="hover:text-gray-900 cursor-pointer">Controle (types d'acteur)</span>
                    <span>›</span>
                    <span className="text-gray-900 font-medium">Contrôle Qualité (agriculteurs)</span>
                </div>
            </div>

            <div className="p-6">
                {/* Navigation and Stats */}
                <div className="flex items-center justify-between mb-6">
                    {/* Stats Cards */}
                    <div className="flex space-x-4">
                        {Object.entries(stats).map(([key, stat]) => {
                            const IconComponent = stat.icon;
                            return (
                                <Card key={key} className="min-w-[160px]">
                                    <CardContent className="p-4">
                                        <div className={`${stat.color} rounded-lg p-3 mb-2`}>
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
                                        <div className="text-sm text-gray-600 capitalize">
                                            Dossier(s) {key === 'validated' ? 'validé(s)' : key === 'pending' ? 'non traité(s)' : 'rejeté(s)'}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleNavigation('first')}>
                            <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleNavigation('prev')}>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="px-3 py-1 bg-white border rounded text-sm font-medium">
                            {currentPage}/{totalPages}
                        </span>
                        <Button variant="outline" size="sm" onClick={() => handleNavigation('next')}>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleNavigation('last')}>
                            <SkipForward className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button className="bg-teal-600 hover:bg-teal-700">
                            Terminer
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Record Info */}
                    <div className="lg:col-span-1 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">N° de lot: {currentRecord.lotNumber}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium">Statut du dossier:</span>
                                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                        {currentRecord.status}
                                    </Badge>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div><span className="font-medium">Date de l'enrôlement:</span> {currentRecord.enrollmentDate}</div>
                                    <div><span className="font-medium">Nom de l'enrôleur:</span> {currentRecord.enrollerName}</div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div><span className="font-medium">District:</span> {currentRecord.district}</div>
                                        <div><span className="font-medium">Région:</span> {currentRecord.region}</div>
                                        <div><span className="font-medium">Département:</span> {currentRecord.department}</div>
                                    </div>
                                    <div>
                                        <div><span className="font-medium">Sous-préfecture:</span> {currentRecord.subPrefecture}</div>
                                        <div><span className="font-medium">Localité:</span> {currentRecord.locality}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Photo Card */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="aspect-[3/4] bg-gray-100 rounded-lg border-2 border-orange-300 overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                        <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
                                            <span className="text-gray-600 text-lg font-medium">Photo</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Middle Column - Document */}
                    <div className="lg:col-span-1">
                        <Card className="h-full">
                            <CardContent className="p-4">
                                <div className="aspect-[3/4] bg-gray-100 rounded-lg border overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-green-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                                <span className="text-green-700 font-medium">DOC</span>
                                            </div>
                                            <p className="text-gray-600">Document d'identité</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <Button variant="outline" size="sm">
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                    <span className="text-sm text-gray-600">1 / 2</span>
                                    <Button variant="outline" size="sm">
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Form */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold">N°</span>
                                    <Badge className="bg-blue-100 text-blue-800">{currentRecord.recordId}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="nom" className="text-sm font-medium">Nom</Label>
                                        <Input id="nom" value={currentRecord.firstName} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="prenoms" className="text-sm font-medium">Prénoms</Label>
                                        <Input id="prenoms" value={currentRecord.lastName} className="mt-1" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="birthDate" className="text-sm font-medium">Date de naissance</Label>
                                        <Input id="birthDate" value={currentRecord.birthDate} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="birthPlace" className="text-sm font-medium">Lieu de naissance</Label>
                                        <Input id="birthPlace" value={currentRecord.birthPlace} className="mt-1" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="gender" className="text-sm font-medium">Sexe</Label>
                                        <Select defaultValue={currentRecord.gender}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Masculin">Masculin</SelectItem>
                                                <SelectItem value="Féminin">Féminin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="activity" className="text-sm font-medium">Activité</Label>
                                        <Input id="activity" value={currentRecord.activity} className="mt-1" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="phone" className="text-sm font-medium">Téléphone</Label>
                                        <div className="relative mt-1">
                                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <Input id="phone" value={currentRecord.phone} className="pl-10" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="docType" className="text-sm font-medium">Type de document</Label>
                                        <Select defaultValue={currentRecord.documentType}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Aucun">Aucun</SelectItem>
                                                <SelectItem value="CNI">CNI</SelectItem>
                                                <SelectItem value="Passeport">Passeport</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="status" className="text-sm font-medium">Statut</Label>
                                    <Select value={status} onValueChange={setStatus}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Choisissez un statut pour ce dossier" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="valide">Validé</SelectItem>
                                            <SelectItem value="rejete">Rejeté</SelectItem>
                                            <SelectItem value="en_attente">En attente</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex space-x-2 pt-4">
                                    <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                                        Soumettre
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        Passer sur ce dossier
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t px-6 py-4 mt-8">
                <p className="text-sm text-gray-500">© 2025 Mobisoft</p>
            </div>
        </div>
    );
};

export default QualityControlInterface;
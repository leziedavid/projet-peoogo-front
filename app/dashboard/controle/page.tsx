'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle, ChevronLeft, ChevronRight, SkipBack, SkipForward, RefreshCw, Phone, FolderCheck, Folder, FolderX } from 'lucide-react';
import { controlEnrollement, getAllPaginate, updateEnrollementPartialData } from '@/api/services/enrollementsServices';
import { EnrollementData } from '@/types/ApiReponse/enrollementControleResponse';
import { formatDateHeureFr } from '@/app/util/dataFormat';
import Image from 'next/image';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { toast } from 'sonner';

const DEFAULT_IMAGE_URL = '/IMG_5195.png';
// const DEFAULT_IMAGE_URL = '/icon_default.svg';
// const DEFAULT_IMAGE_URL = '/users.jpg';
export default function ControleQualite() {
    const [lot, setLot] = useState<EnrollementData[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentRecord, setCurrentRecord] = useState<EnrollementData | null>(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({ valide: 0, en_attente: 0, rejete: 0 });

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        datedenaissance: '',
        lieudenaissance: '',
        sexe: '',
        status_dossier: '',
        numroprincipal: '',
        situationmatrimoniale: '',
        niveaudinstruction: '',
        languelocaleparle: '',
        autreslanguelocaleparle: '',
        nationalit: '',
        site: '',
        campementquartier: '',
        coordonneesgeo: '',
        activitprincipaleId: '',
        spculationprincipaleId: '',
        superficiedevotreparcellecultu: 0,
        indiquezlasuperficieenha: 0,
        quantitproduction: 0,
        prcisezlenombre: 0,
        moyendestockage: '',
        photo: '',
        document1: '',
        document2: '',
        commentaire_controle: '',
        numero_lot: '',
    });

    // Calculer les statistiques

    useEffect(() => {
        async function loadLot() {
            setLoading(true);
            try {
                const res = await getAllPaginate(1, 50);
                if (res.data?.data?.length) {
                    setLot(res.data.data);
                    setCurrentIndex(0);
                    setStatus(res.data.data[0].status_dossier || res.data.data[0].status_dossier || '');
                } else {
                    setLot([]);
                    setCurrentIndex(0);
                    setCurrentRecord(null as any);
                    setStatus('');
                }
            } catch (e) {
                console.error('Erreur lors du chargement:', e);
                alert('Erreur lors du chargement des données');
            } finally {
                setLoading(false);
            }
        }
        loadLot();
    }, []);

    useEffect(() => {

        if (lot.length === 0) {
            setCurrentRecord(null);
            return;
        }
        setCurrentRecord(lot[currentIndex]);

        setStatus(lot[currentIndex].status_dossier || lot[currentIndex].status_dossier || '');
        const rec = lot[currentIndex];
        setFormData({
            nom: rec.nom || '',
            prenom: rec.prenom || '',
            datedenaissance: rec.datedenaissance || '',
            lieudenaissance: rec.lieudenaissance || '',
            sexe: rec.sexe || '',
            status_dossier: rec.status_dossier || '',
            numroprincipal: rec.numroprincipal || '',
            situationmatrimoniale: rec.situationmatrimoniale || '',
            niveaudinstruction: rec.niveaudinstruction || '',
            languelocaleparle: rec.languelocaleparle || '',
            autreslanguelocaleparle: rec.autreslanguelocaleparle || '',
            nationalit: rec.nationalit || '',
            site: rec.site || '',
            campementquartier: rec.campementquartier || '',
            coordonneesgeo: rec.coordonneesgeo || '',
            activitprincipaleId: rec.activitprincipaleId || '',
            spculationprincipaleId: rec.spculationprincipaleId || '',
            superficiedevotreparcellecultu: rec.superficiedevotreparcellecultu ?? 0,
            indiquezlasuperficieenha: rec.indiquezlasuperficieenha ?? 0,
            quantitproduction: rec.quantitproduction ?? 0,
            prcisezlenombre: rec.prcisezlenombre ?? 0,
            moyendestockage: rec.moyendestockage || '',
            photo: rec.photo || '',
            document1: rec.document1 || '',
            document2: rec.document2 || '',
            commentaire_controle: rec.commentaire_controle || '',
            numero_lot: rec.numero_lot || '',
        });
    }, [currentIndex, lot]);

    const handleNavigation = (action: any) => {
        if (lot.length === 0) return;
        if (action === 'first') setCurrentIndex(0);
        else if (action === 'prev' && currentIndex > 0) setCurrentIndex(currentIndex - 1);
        else if (action === 'next' && currentIndex < lot.length - 1) setCurrentIndex(currentIndex + 1);
        else if (action === 'last') setCurrentIndex(lot.length - 1);
    };

    const handleRefresh = async () => {
        setLoading(true);
        try {
            const res = await getAllPaginate(1, 100);
            if (res.data?.data?.length) {
                setLot(res.data.data);
                setCurrentIndex(0);
                setStatus(res.data.data[0].status_dossier || res.data.data[0].status_dossier || '');
            }
        } catch (e) {
            console.error('Erreur lors du rafraîchissement:', e);
            alert('Erreur lors du rafraîchissement');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: any, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

const handleSubmit = async () => {

    if (!currentRecord) return;
    setLoading(true);

    console.log('sexe:', formData.sexe);
        const payload = {
            sexe: formData.sexe,
            status_dossier: status,
            commentaire_controle: formData.commentaire_controle,
            numeroLot: formData.numero_lot,
        };
        const res = await controlEnrollement(currentRecord.id, payload);
        
        if (res.statusCode === 200) {
            toast.success(res.message);
            handleRefresh();
            setLoading(false);

        }else {
            console.error('Erreur lors du contrôle:', res.message);
            toast.error(res.message);
            setLoading(false);
        }

};


    const handleSkip = () => {
        if (currentIndex < lot.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            alert('Vous êtes au dernier dossier');
        }
    };

    if (loading && !currentRecord) return <div className="p-4 text-center">Chargement...</div>;
    if (!currentRecord) return <div className="p-4 text-center">Aucun enregistrement disponible.</div>;

    const currentPage = currentIndex + 1;
    const totalPages = lot.length;
    const photoUrl = currentRecord.photo || DEFAULT_IMAGE_URL;

    const images: string[] = [
        currentRecord.photo || DEFAULT_IMAGE_URL,
        currentRecord.document1 || DEFAULT_IMAGE_URL,
        currentRecord.document2 || DEFAULT_IMAGE_URL,
    ];

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'valide': return 'bg-green-100 text-green-800';
            case 'rejete': return 'bg-red-100 text-red-800';
            default: return 'bg-orange-100 text-orange-800';
        }
    };

    const statusLabels: Record<string, string> = {
        NON_TRAITE: 'NON TRAITÉ',
        VAL: 'VALIDÉ',
        REJ: 'REJETÉ',
        DOUBLON: 'DOUBLON',
        ENCOURS: 'EN COURS',
        DEL: 'SUPPRIMÉ',
        IMAGE_INCOR: 'IMAGE INCORRECTE',
        DOUBLON_NUMBER: 'DOUBLON NUMÉRO',
    };

    const getStatusText = (status: string) => {
        return statusLabels[status] || 'STATUT INCONNU';
    };

    return (

        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-bold">Contrôle & Supervision</h1>

            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                <div>
                    <p className="text-sm">N° de lot:</p>
                    <p className="font-semibold text-lg">1753263164</p>
                </div>

                <div className="flex gap-2 items-center space-x-2">
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
                    <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700">
                        Terminer
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="bg-green-100 border border-green-400">
                    <CardContent className="flex items-center justify-between p-4">
                        <div>
                            <p className="text-sm text-green-900">Dossier(s) validé(s)</p>
                            <p className="text-2xl font-bold text-green-900">0</p>
                        </div>
                        <FolderCheck className="text-green-700 w-10 h-10" />
                    </CardContent>
                </Card>

                <Card className="bg-yellow-100 border border-yellow-400">
                    <CardContent className="flex items-center justify-between p-4">
                        <div>
                            <p className="text-sm text-yellow-900">Dossier(s) non traité(s)</p>
                            <p className="text-2xl font-bold text-yellow-900">0</p>
                        </div>
                        <Folder className="text-yellow-700 w-10 h-10" />
                    </CardContent>
                </Card>

                <Card className="bg-red-100 border border-red-400">
                    <CardContent className="flex items-center justify-between p-4">
                        <div>
                            <p className="text-sm text-red-900">Dossier(s) rejeté(s)</p>
                            <p className="text-2xl font-bold text-red-900">0</p>
                        </div>
                        <FolderX className="text-red-700 w-10 h-10" />
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
                        <div className="p-4">
                            <h6 className="mb-2 text-slate-800 text-xl font-semibold"> Statut du dossier :
                                <Badge variant="outline" className="bg-gray-500 text-white px-3 py-1 rounded-md">
                                    {getStatusText(currentRecord?.status_dossier ?? '')}
                                </Badge></h6>

                            <div className="text-slate-600 leading-normal font-light">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Date de l'enrôlement:</span>
                                    <span className="font-semibold text-gray-900">{formatDateHeureFr(currentRecord.createdAt) || 'Non disponible'}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Nom de l'enrôleur:</span>
                                    <span className="font-semibold text-gray-900">{currentRecord.agent_enroleur?.name || 'Non disponible'}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">FORMULAIRE : </span>
                                    <span className="font-semibold text-gray-900">{currentRecord.TypeCompte || 'Non disponible'}</span>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
                        <div className="p-4">
                            <h5 className="mb-2 text-slate-800 text-xl font-semibold"> Decoupage </h5>
                            <div className="text-slate-600 leading-normal font-light">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">District:</span>
                                    <span className="font-semibold text-gray-900">{currentRecord.decoupage?.district?.nom || 'Non disponible'}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Région:</span>
                                    <span className="font-semibold text-gray-900">{currentRecord.decoupage?.region?.nom || 'Non disponible'}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Département:</span>
                                    <span className="font-semibold text-gray-900">{currentRecord.decoupage?.department?.nom || 'Non disponible'}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Sous-préfecture:</span>
                                    <span className="font-semibold text-gray-900">{currentRecord.decoupage?.sousPrefecture?.nom || 'Non disponible'}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Localité:</span>
                                    <span className="font-semibold text-gray-900">{currentRecord.decoupage?.localite?.nom || 'Non disponible'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white p-4 rounded-lg shadow-sm">
                {/* Photo Card */}
                <div className="h-full">
                    <Card className="h-full">
                        <CardContent className="p-4 h-full flex flex-col">
                            <div className="flex-1 bg-gray-100 rounded-lg border-1 border-orange-300 overflow-hidden">
                                {currentRecord.photo ? (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        <Image src={photoUrl} alt="Photo du candidat" width={180} height={180} className="object-contain w-full h-full "/>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        <Image src={photoUrl} alt="Photo du candidat" width={180} height={180} className="object-contain w-full h-full "/>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Document Card */}
                <div className="h-full">
                    <Card className="h-full">
                        <CardContent className="p-4 h-full flex flex-col">
                            <div className="flex-1 relative">
                                <Carousel className="w-full h-full">
                                    <CarouselContent className="h-full">
                                        {images.map((img, index) => (
                                            <CarouselItem key={index} className="h-full">
                                                <div className="p-1 h-full">
                                                    <div className="h-full flex flex-col">
                                                        <div className="flex-1 overflow-hidden rounded-lg">
                                                            <Image
                                                                src={img}
                                                                alt={`Image ${index + 1}`}
                                                                width={300}
                                                                height={300}
                                                                className="object-cover w-full h-full"
                                                            />
                                                        </div>
                                                        <div className="text-center mt-2 text-sm text-gray-600">
                                                            Page {index + 1}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>

                                    {/* Boutons de navigation intégrés */}
                                    <div className="flex items-center justify-center gap-4 mt-4">
                                        <CarouselPrevious className="relative translate-x-0 translate-y-0" />
                                        <CarouselNext className="relative translate-x-0 translate-y-0" />
                                    </div>
                                </Carousel>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Form Card */}
                <div className="h-full">
                    <Card className="h-full">
                        <CardHeader className="pb-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-lg font-semibold">N°</span>
                                <Badge className="bg-blue-100 text-blue-800">{currentRecord.code || currentRecord.id}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="nom" className="text-sm font-medium">Nom</Label>
                                        <Input
                                            id="nom"
                                            value={formData.nom}
                                            onChange={(e) => handleChange('nom', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="prenoms" className="text-sm font-medium">Prénoms</Label>
                                        <Input
                                            id="prenoms"
                                            value={formData.prenom}
                                            onChange={(e) => handleChange('prenom', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="birthDate" className="text-sm font-medium">Date de naissance</Label>
                                        <Input
                                            id="birthDate"
                                            type="date"
                                            value={formData.datedenaissance}
                                            onChange={(e) => handleChange('datedenaissance', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="birthPlace" className="text-sm font-medium">Lieu de naissance</Label>
                                        <Input
                                            id="birthPlace"
                                            value={formData.lieudenaissance}
                                            onChange={(e) => handleChange('lieudenaissance', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="gender" className="text-sm font-medium">Sexe</Label>
                                        <Select value={formData.sexe} onValueChange={(value) => handleChange('sexe', value)}>
                                            <SelectTrigger className="mt-1 w-full h-10">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="FEMME">Féminin</SelectItem>
                                                <SelectItem value="HOMME">Masculin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="activity" className="text-sm font-medium">Activité</Label>
                                        <Input
                                            id="activity"
                                            value={currentRecord.activitprincipale?.nom}
                                            onChange={(e) => handleChange('activitprincipaleId', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="phone" className="text-sm font-medium">Téléphone</Label>
                                    <div className="relative mt-1">
                                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="phone"
                                            value={formData.numroprincipal}
                                            onChange={(e) => handleChange('numroprincipal', e.target.value)}
                                            className="pl-10 w-full h-10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="status" className="text-sm font-medium">Statut</Label>
                                    <Select
                                        value={status}
                                        onValueChange={(value) => { setStatus(value); handleChange('status_dossier', value);  }} >
                                        <SelectTrigger className="mt-1 w-full h-10">
                                            <SelectValue placeholder="Choisissez un statut pour ce dossier"
                                                // 🔥 On précise le label à afficher
                                                children={statusLabels[status] ?? ''}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="VAL">VALIDE</SelectItem>
                                            <SelectItem value="REJ">REJETÉ</SelectItem>
                                            <SelectItem value="DOUBLON">DOUBLON</SelectItem>
                                            <SelectItem value="IMAGE_INCOR">IMAGE INCORRECTE</SelectItem>
                                            <SelectItem value="DOUBLON_NUMBER">DOUBLON NUMÉRO</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {status && (
                                    <div className="mt-4">
                                        <Label htmlFor="commentaire" className="text-sm font-medium">Commentaire du contrôle</Label>
                                        <textarea id="commentaire" rows={3} className="w-full border rounded p-2 mt-1 text-sm"
                                            placeholder="Saisissez votre commentaire ici..." value={formData.commentaire_controle}
                                            onChange={(e) => handleChange('commentaire_controle', e.target.value)}
                                        />
                                    </div>
                                )}

                            </div>

                            {/* Boutons toujours en bas */}
                            <div className="flex space-x-2 pt-4 mt-auto">
                                <Button className="flex-1 bg-teal-600 hover:bg-teal-700" onClick={handleSubmit} disabled={loading || !status} >
                                    {loading ? 'Traitement...' : 'Soumettre'}
                                </Button>

                                <Button className="flex-1 bg-gray-100 hover:bg-white text-red-600 hover:text-black" onClick={handleSubmit} disabled={loading}>
                                    Libérer le lot
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>

    );
}
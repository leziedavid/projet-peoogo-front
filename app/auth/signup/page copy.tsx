'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/schema/RegisterSchema';
import { Role, RoleLabels } from '@/types/roles';
import { FileUploader } from '@/components/upload/FileUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { PhoneInput } from '@/components/phone/phone-input';
import { Mail, User, Lock, UserCheck, Globe, Phone, Camera, FileText, CreditCard, EyeOff, Eye } from "lucide-react"
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { toast } from 'sonner';


const roles: Role[] = Object.values(Role);

export default function SignupPage() {

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        mode: 'onChange',
    });

    // Pour gérer la valeur du phone dans PhoneInput
    const [phoneValue, setPhoneValue] = useState('');
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [phoneValid, setPhoneValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1);

    // Pour gérer les fichiers
    const [files, setFiles] = useState<Record<string, File[]>>({});
    const [progresses, setProgresses] = useState<Record<string, Record<string, number>>>({});


    // Pour désactiver le select role si rôle en localStorage
    const [fixedRole, setFixedRole] = useState<Role | null>(null);

    // Chargement initial du role depuis localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedRole = localStorage.getItem('role') as Role | null;
            if (storedRole && roles.includes(storedRole)) {
                setFixedRole(storedRole);
                setValue('role', storedRole, { shouldValidate: true, shouldDirty: true });
            }
        }
    }, [setValue]);

    // Synchroniser la valeur du téléphone dans react-hook-form à chaque changement valide
    useEffect(() => {
        setValue('phoneNumber', phoneValue, { shouldValidate: true });
    }, [phoneValue, setValue]);

    // Extraire et mettre à jour automatiquement le code pays (exemple: "+33")
    useEffect(() => {
        const countryCode = phoneValue.startsWith('+') ? phoneValue.split(' ')[0] : '';
        if (countryCode) {
            setValue('phoneCountryCode', countryCode, { shouldValidate: true });
        }
    }, [phoneValue, setValue]);


    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPhoneValue(e.target.value)
            setPhoneValid(true);
            if (!phoneTouched) setPhoneTouched(true)
    }

    const handleValueChange = (name: string, fileList: File[]) => {
        setFiles((prev) => ({ ...prev, [name]: fileList }));
        setValue(name as any, fileList, { shouldValidate: true }); // cast pour éviter l'erreur de typage
    };

    const handleUpload = async (name: string, files: File[]) => {
        const fileProgress: Record<string, number> = {};

        for (const file of files) {
            fileProgress[file.name] = 0;
            setProgresses((prev) => ({
                ...prev,
                [name]: { ...(prev[name] || {}), ...fileProgress },
            }));

            await new Promise((res) => setTimeout(res, 300)); // simulation
            fileProgress[file.name] = 100;

            setProgresses((prev) => ({
                ...prev,
                [name]: { ...(prev[name] || {}), ...fileProgress },
            }));
        }
    };

    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {


        // Validation du téléphone avant soumission
        if (!phoneValid) {
            toast.error('Numéro de téléphone invalide');
            return;
        }

        try {
            // Destructurer pour enlever confirmPassword et préparer les données
            const { confirmPassword, ...formData } = data;
            // Créer FormData pour gérer les fichiers
            const payload = new FormData();

            // Ajouter les données textuelles
            payload.append('email', formData.email);
            payload.append('name', formData.name);
            payload.append('phoneCountryCode', formData.phoneCountryCode ?? '');
            payload.append('phoneNumber', formData.phoneNumber ?? '');
            payload.append('password', formData.password);
            payload.append('role', formData.role);

            // Ajouter les fichiers
            if (formData.file && formData.file.length > 0) {
                // Photo de profil (un seul fichier)
                payload.append('profilePhoto', formData.file[0]);
            }

            // Ajouter les documents si nécessaire selon le rôle
            if (showDocuments.includes(formData.role)) {

                if (formData.permis && formData.permis.length > 0) {
                    payload.append('drivingLicense', formData.permis[0]);
                }

                if (formData.carte && formData.carte.length > 0) {
                    payload.append('identityCard', formData.carte[0]);
                }
            }

            console.log('✅ Données préparées pour l\'API');

            // Optionnel : visualiser le contenu du FormData pour débuggage
            console.log('FormData contents:');

            for (let [key, value] of payload.entries()) {
                if (value instanceof File) {
                    console.log(`${key}: ${value.name} (${value.size} bytes)`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            }

            // Appel API (remplacez par votre endpoint)
            const response = await fetch('/api/register', {
                method: 'POST',
                body: payload, // Ne pas définir Content-Type, le navigateur le fera automatiquement
            });

            if (!response.ok) {
                toast.error('Erreur lors de l\'inscription. Veuillez réessayer.');
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log('✅ Inscription réussie:', result);

            // Rediriger ou afficher un message de succès
            // router.push('/login') ou autre action

        } catch (error) {
            console.error('❌ Erreur lors de l\'inscription:', error);
            toast.error('Erreur lors de l\'inscription. Veuillez réessayer.');
        }
    };


    // Récupérer la valeur du role dans le form (pour afficher les fichiers conditionnels)
    const selectedRole = watch('role');
    // Roles qui doivent afficher permis + cni
    const showDocuments = ['DRIVER', 'PARTNER', 'LIVREUR'];

    // Ajoutez ces fonctions de validation dans votre composant
    const isStep1Valid = () => {
        const emailValue = watch('email');
        const nameValue = watch('name');
        const phoneCountryCodeValue = watch('phoneCountryCode');
        const phoneNumberValue = watch('phoneNumber');

        return emailValue &&
            nameValue &&
            phoneCountryCodeValue &&
            phoneNumberValue &&
            phoneValid &&
            !errors.email &&
            !errors.name &&
            !errors.phoneCountryCode &&
            !errors.phoneNumber;
    };

    const isStep2Valid = () => {
        const passwordValue = watch('password');
        const confirmPasswordValue = watch('confirmPassword');
        const roleValue = watch('role');

        return passwordValue &&
            confirmPasswordValue &&
            roleValue &&
            !errors.password &&
            !errors.confirmPassword &&
            !errors.role;
    };

    const isStep3Valid = () => {
        const fileValue = watch('file');

        if (showDocuments.includes(selectedRole)) {
            const permisValue = watch('permis');
            const carteValue = watch('carte');

            return fileValue && fileValue.length > 0 &&
                permisValue && permisValue.length > 0 &&
                carteValue && carteValue.length > 0 &&
                !errors.file && !errors.permis && !errors.carte;
        }

        return fileValue && fileValue.length > 0 && !errors.file;
    };


    return (

        <>

            <div className="flex min-h-full h-screen">
                <div className="flex flex-1 flex-col justify-center py-0 px-6 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <h1 className="text-5xl font-bold tracking-tight"> Ouvrir un compte gratuit</h1>
                        </div>
                        <div className="">

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-4">

                                {step === 1 && (
                                    <>
                                        <h2 className="text-md font-medium">Informations de contact</h2>

                                        <div>
                                            <Label htmlFor="email mb-2">Email</Label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Mail className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input id="email" type="email"  {...register('email')} className="w-full py-2 pl-12 pr-4 text-base rounded-md border-1 outline-none focus:border-orange-600 focus:ring-0 bg-white"
                                                />
                                            </div>
                                            {errors.email?.message && <p className="text-sm text-red-500">{errors.email.message}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="name">Nom complet</Label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <User className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input id="name" type="text" {...register('name')} className="w-full py-2 pl-12 pr-4 text-base rounded-md border-1 outline-none focus:border-orange-600 focus:ring-0 bg-white" />
                                            </div>
                                            {errors.name?.message && <p className="text-sm text-red-500">{errors.name.message}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="phoneCountryCode">Code pays</Label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Globe className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <Input id="phoneCountryCode" type="text" {...register('phoneCountryCode')} disabled className="bg-gray-100 cursor-not-allowed pl-10  py-5 block w-full rounded-sm borderbg-white focus:border-black-900 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-orange-600" />
                                            </div>
                                            {errors.phoneCountryCode?.message && (
                                                <p className="text-sm text-red-500">{errors.phoneCountryCode.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label className="block mb-2">Numéro de téléphone</Label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                                    <Phone className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <PhoneInput
                                                    value={phoneValue}
                                                    onChange={handlePhoneChange}
                                                    placeholder="Numéro de téléphone"
                                                    className="pl-10 focus:border-orange-600"
                                                />
                                            </div>
                                            {phoneTouched && !phoneValid && (
                                                <p className="text-red-500 text-sm mt-1">Numéro invalide</p>
                                            )}
                                            {errors.phoneNumber?.message && (
                                                <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
                                            )}
                                        </div>

                                        <Button  disabled={!isStep1Valid()} type="button" onClick={() => setStep(2)} className="w-full">
                                            Suivant
                                        </Button>

                                    </>
                                )}


                                {step === 2 && (
                                    <>
                                        <h2 className="text-md font-bold">Création du mot de passe</h2>


                                        <div>
                                            <Label htmlFor="password" className="mb-2 block text-lg font-medium">Mot de passe</Label>
                                            <div className="relative">
                                                {/* Icône cadenas à gauche */}
                                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                {/* Champ mot de passe */}
                                                <input id="password" type={showPassword ? 'text' : 'password'} {...register('password')} className="w-full py-2 pl-12 pr-4 text-base rounded-md border-1 outline-none focus:border-orange-600 focus:ring-0 bg-white placeholder-gray-400" placeholder="Mot de passe"  />
                                                {/* Bouton pour toggle visibilité */}
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none" >
                                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                </button>
                                            </div>

                                            {/* Message d’erreur */}
                                            {errors.password?.message && (
                                                <p className="text-sm text-red-500">{errors.password.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="password" className="mb-2 block text-lg font-medium">Confirmer le mot de passe</Label>
                                            <div className="relative">
                                                {/* Icône cadenas à gauche */}
                                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                {/* Champ mot de passe */}
                                                <input id="password" type={showPassword ? 'text' : 'password'} {...register('confirmPassword')} className="w-full py-2 pl-12 pr-4 text-base rounded-md border-1 outline-none focus:border-orange-600 focus:ring-0 bg-white placeholder-gray-400" placeholder="Confirmez le mot de passe"  />
                                                {/* Bouton pour toggle visibilité */}
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none" >
                                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                </button>
                                            </div>

                                            {/* Message d’erreur */}
                                            {errors.password?.message && (
                                                <p className="text-sm text-red-500">{errors.confirmPassword?.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="role">Type de compte</Label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                                    <UserCheck className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <select id="role" {...register('role')} className="w-full border rounded px-3 py-2 pl-10 bg-white focus:border-orange-600"
                                                    disabled={!!fixedRole} style={fixedRole ? { backgroundColor: '#e5e7eb', cursor: 'not-allowed' } : {}} >
                                                    <option value="">Sélectionnez un type de compte</option>
                                                    {roles.map((r) => (
                                                        <option key={r} value={r}>
                                                            {RoleLabels[r]}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.role?.message && <p className="text-sm text-red-500">{errors.role.message}</p>}
                                        </div>

                                        <div className="flex justify-between">
                                            <Button type="button" variant="outline" onClick={() => setStep(1)}>
                                                Retour
                                            </Button>
                                            <Button  disabled={!isStep2Valid()} type="button" onClick={() => setStep(3)}>
                                                Suivant
                                            </Button>
                                        </div>
                                    </>
                                )}


                                {step === 3 && (
                                    <>
                                        <h2 className="text-md font-bold">Vérification de votre identité</h2>

                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Camera className="h-5 w-5 text-gray-600" />
                                                <h3 className="font-semibold">Photo de profil</h3>
                                            </div>
                                            <FileUploader
                                                name="file"
                                                multiple={false}
                                                value={files}
                                                onValueChange={handleValueChange}
                                                onUpload={handleUpload}
                                                progresses={progresses}
                                            />
                                            <p className="text-sm text-red-500">
                                                {typeof errors.file?.message === 'string' ? errors.file.message : ''}
                                            </p>
                                        </div>

                                        {showDocuments.includes(selectedRole) && (
                                            <>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <CreditCard className="h-5 w-5 text-gray-600" />
                                                        <h3 className="font-semibold">Permis de conduire</h3>
                                                    </div>
                                                    <FileUploader
                                                        name="permis"
                                                        multiple={false}
                                                        value={files}
                                                        onValueChange={handleValueChange}
                                                        onUpload={handleUpload}
                                                        progresses={progresses}
                                                    />
                                                    {typeof errors.permis?.message === 'string' && (
                                                        <p className="text-sm text-red-500">{errors.permis.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <FileText className="h-5 w-5 text-gray-600" />
                                                        <h3 className="font-semibold">Pièce d'identité (CNI)</h3>
                                                    </div>
                                                    <FileUploader
                                                        name="carte"
                                                        multiple={false}
                                                        value={files}
                                                        onValueChange={handleValueChange}
                                                        onUpload={handleUpload}
                                                        progresses={progresses}
                                                    />
                                                    {typeof errors.carte?.message === 'string' && (
                                                        <p className="text-sm text-red-500">{errors.carte.message}</p>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        <div className="flex justify-between">
                                            <Button type="button" variant="outline" onClick={() => setStep(2)}>
                                                Précédent
                                            </Button>
                                            <Button disabled={!isStep3Valid()} type="submit">Créer un compte</Button>
                                        </div>
                                    </>
                                )}

                            </form>

                        </div>
                    </div>
                </div>

                <div className="relative hidden w-0 flex-1 lg:block">
                    <div className="absolute inset-0 h-full w-full">
                        <Image src="/woman.jpg" alt="" fill className="object-cover brightness-50" style={{ objectFit: 'cover' }} />
                    </div>
                </div>
            </div>
        </>

    );
}

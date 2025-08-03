'use client';

import React, { useEffect, useState } from 'react';
import { useForm, UseFormSetValue } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { Mail, Phone, Lock, Eye, EyeOff, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/phone/phone-input';
import { toast } from 'sonner';
import { signIn } from '@/api/services/auth';
import { LoginDto } from '@/types/ApiRequest/Auth';
import { Role } from '@/types/AllTypes';

// Schéma de validation Zod pour la connexion
const LoginSchema = z.object({
    email: z.string().email("Email invalide").optional(),
    phoneNumber: z.string().optional(),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
}).refine((data) => {
    // Au moins un identifiant doit être fourni
    return data.email || data.phoneNumber;
}, {
    message: "Email ou numéro de téléphone requis",
    path: ["email"],
});

export default function LoginPage() {

    const router = useRouter();

    // États pour le formulaire de connexion
    const [loginMode, setLoginMode] = useState('email'); // 'email' ou 'phone'
    const [phoneValue, setPhoneValue] = useState('');
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [phoneValid, setPhoneValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Configuration du formulaire
    const { register, handleSubmit, setValue, watch, formState: { errors },reset,clearErrors,
        } = useForm<z.infer<typeof LoginSchema>>({
            resolver: zodResolver(LoginSchema),
            mode: 'onChange',
        });

    // Gestion du changement de mode (email/téléphone)
    useEffect(() => {
        // Nettoyer les erreurs quand on change de mode
        clearErrors();
        // Réinitialiser les champs selon le mode
        if (loginMode === 'email') {
            setValue('phoneNumber', '');
            setPhoneValue('');
            setPhoneValid(false);
            setPhoneTouched(false);
        } else {
            setValue('email', '');
        }
    }, [loginMode, setValue, clearErrors]);

    // Synchroniser la valeur du téléphone dans react-hook-form
    useEffect(() => {
        if (loginMode === 'phone') {
            setValue('phoneNumber', phoneValue, { shouldValidate: true });
        }
    }, [phoneValue, setValue, loginMode]);

    // Gestion du changement de numéro de téléphone
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setPhoneValue(e.target.value);
        setPhoneValid(true); // Vous pouvez ajouter une vraie validation ici
        if (!phoneTouched) setPhoneTouched(true);
    };

    // Validation du formulaire de connexion
    const isLoginFormValid = () => {

        const passwordValue = watch('password');

        if (loginMode === 'email') {
            const emailValue = watch('email');
            return emailValue && passwordValue && !errors.email && !errors.password;

        } else {
            const phoneNumberValue = watch('phoneNumber');
            // console.log(phoneNumberValue);
            return phoneNumberValue && passwordValue && phoneValid && !errors.phoneNumber && !errors.password;
        }
    };


    // Typage de la fonction
    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        
        console.log(data);
        // Vérification du numéro si mode téléphone
        if (loginMode === 'phone' && !phoneValid) {
            toast.error('Numéro de téléphone invalide')
            return
        }

        // Construction des données selon le mode
        const loginData: Partial<LoginDto> = { password: data.password, ...(loginMode === 'email' ? { email: data.email } : { phoneNumber: data.phoneNumber }), }
        console.log(loginData);

        try {

            const apiResponse = await signIn(loginData)

            if (apiResponse.statusCode === 200 && apiResponse.data) {

                const { access_token, refresh_token, user } = apiResponse.data
                // Enregistrement des tokens
                localStorage.setItem('access_token', access_token)
                localStorage.setItem('refresh_token', refresh_token)
                document.cookie = `token=${access_token}; path=/`
                toast.success('Connexion réussie !')

                // ✅ Redirection conditionnelle si une action est stockée
                const action = localStorage.getItem('action');
                if (action === 'createOrder') {
                    localStorage.removeItem('action');
                    router.push('/trajets'); // ou autre page
                    return; // ⛔ Éviter la suite
                }

                switch (user.role) {
                    case Role.ADMIN:
                        router.push('/dashboard/admin')
                        break
                    case Role.LIVREUR:
                        router.push('/dashboard/livreur')
                        break
                    default:
                        router.push('/dashboard/compte') // Tous les autres rôles vont ici
                        break
                }

                reset() // Réinitialise le formulaire
                
            } else if (apiResponse.statusCode === 400) {

                toast.error(apiResponse.message || 'Informations incorrectes')

            } else if (apiResponse.statusCode === 500) {

                toast.error('Erreur serveur, veuillez réessayer')

            } else if (apiResponse.statusCode === 401) {

                toast.error(apiResponse.message || 'Identifiants invalides')
            }

            else {
                toast.error('Erreur inconnue')
            }
        } catch (error) {

            console.error('Erreur lors de la connexion :', error)
            toast.error('Une erreur est survenue lors de la connexion')
        }
    }



    return (


        <>

            <div className="flex min-h-full h-screen">
                <div className="flex flex-1 flex-col justify-center py-0 px-6 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className="">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg ">
                                <div className="text-center mb-8">
                                    <h2 className="text-4xl font-bold text-gray-900">Se connecter</h2>
                                    <p className="text-gray-600 mt-2">Connectez-vous avec votre email ou numéro de téléphone</p>
                                </div>

                                {/* Toggle pour choisir le mode de connexion */}
                                <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                                    <button type="button" onClick={() => setLoginMode('email')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${loginMode === 'email' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-900' }`} >
                                        <Mail className="h-4 w-4 inline mr-2" />
                                        Email
                                    </button>
                                    <button type="button" onClick={() => setLoginMode('phone')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${loginMode === 'phone' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-900' }`} >
                                        <Phone className="h-4 w-4 inline mr-2" />
                                        Téléphone
                                    </button>
                                </div>

                                {/* Champ Email (affiché si mode email) */}
                                {loginMode === 'email' && (
                                    <div>
                                        <Label htmlFor="email" className="mb-2 block">Adresse email</Label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input id="email" type="email" {...register('email')} className="w-full py-3 pl-12 pr-4 text-base rounded-md border border-gray-300 outline-none focus:border-orange-600 focus:ring-0 bg-white" placeholder="votre@email.com" />
                                        </div>
                                        {errors.email?.message && (
                                            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                                        )}
                                    </div>
                                )}

                                {/* Champs Téléphone (affichés si mode téléphone) */}
                                {loginMode === 'phone' && (
                                    <>

                                        <div>
                                            <Label className="block mb-2">Numéro de téléphone</Label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                                    <Phone className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <PhoneInput value={phoneValue} onChange={handlePhoneChange} placeholder="Numéro de téléphone" className="pl-10 focus:border-orange-600" />
                                            </div>
                                            {phoneTouched && !phoneValid && ( <p className="text-red-500 text-sm mt-1">Numéro invalide</p>  )}
                                            {errors.phoneNumber?.message && (
                                                <p className="text-sm text-red-500 mt-1">{errors.phoneNumber.message}</p>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* Champ Mot de passe */}
                                <div>
                                    <Label htmlFor="password" className="mb-2 block">Mot de passe</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input id="password" type={showPassword ? 'text' : 'password'} {...register('password')} className="w-full py-3 pl-12 pr-12 text-base rounded-md border border-gray-300 outline-none focus:border-orange-600 focus:ring-0 bg-white"  placeholder="Votre mot de passe" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none hover:text-gray-700" >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    {errors.password?.message && (
                                        <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                                    )}
                                </div>

                                {/* Lien mot de passe oublié */}
                                <div className="text-right">
                                    <button type="button" onClick={() => { console.log('Mot de passe oublié'); }} className="text-sm text-orange-600 hover:text-orange-700 font-medium" >
                                        Mot de passe oublié ?
                                    </button>
                                </div>

                                {/* Bouton de connexion */}
                                <Button type="submit" disabled={!isLoginFormValid()} className="w-full py-3 text-base font-medium bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed" >
                                    Se connecter
                                </Button>

                                {/* Séparateur */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Ou</span>
                                    </div>
                                </div>

                                {/* Lien vers inscription */}
                                <div className="text-center">
                                    <p className="text-gray-600">
                                        Pas encore de compte ?{' '}
                                        <button type="button" onClick={() => { console.log('Redirection vers inscription'); }} className="text-orange-600 hover:text-orange-700 font-medium" >
                                            Créer un compte
                                        </button>
                                    </p>
                                </div>
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



"use client";


import { useState } from 'react';
import { User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginByPhoneCode } from '@/api/services/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { AllRole, Role } from '@/types/AllTypes';

const loginSchema = z.object({
    login: z.string().min(1, "Le login est requis"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema), });

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const res = await loginByPhoneCode(data);

            if (res.statusCode === 200 && res.data) {
                const { access_token, refresh_token, user } = res.data;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                document.cookie = `token=${access_token}; path=/`;
                toast.success('Connexion réussie !');

                const action = localStorage.getItem('action');
                if (action === 'createOrder') {
                    localStorage.removeItem('action');
                    router.push('/trajets');
                    return;
                }
            console.log(user.role);

                switch (user.role) {
                    case Role.ADMIN:
                        router.push('/dashboard/compte')
                        break
                    case Role.AGENT_ENROLEUR:
                        router.push('/enrollements')
                        break
                    case Role.AGENT_CONTROLE:
                        router.push('/dashboard/enrollements')
                        break
                    case Role.PRODUCTEUR:
                        router.push('/mon-compte')
                        break
                    case Role.USER:
                        router.push('/mon-compte')
                        break
                    default:
                        router.push('/')
                        break
                }

                reset(); // Réinitialisation du formulaire
            } else if (res.statusCode === 400) {
                toast.error(res.message || 'Informations incorrectes');
            } else if (res.statusCode === 500) {
                toast.error('Erreur serveur, veuillez réessayer');
            } else if (res.statusCode === 401) {
                toast.error(res.message || 'Identifiants invalides');
            } else {
                toast.error('Erreur inconnue');
            }
        } catch (error) {
            // console.error('Erreur lors de la connexion :', error);
            toast.error('Une erreur est survenue lors de la connexion');
        }
    };

    return (

        <div>
            <h1 className="text-3xl font-bold mb-2">SE CONNECTER</h1>
            <p className="text-gray-600 mb-8">
                Veuillez entrer vos informations de connexion pour accéder à votre compte
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        id="login"
                        type="text"
                        placeholder="Numéro de téléphone / login"
                        className="pl-10"
                        aria-invalid={!!errors.login}
                        aria-describedby="login-error"
                        {...register('login')}
                    />
                </div>
                {errors.login && (
                    <p id="login-error" className="text-red-600 text-sm mt-1">
                        {errors.login.message}
                    </p>
                )}

                {/* Password */}
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mot de passe"
                        className="pr-10"
                        aria-invalid={!!errors.password}
                        aria-describedby="password-error"
                        {...register('password')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {errors.password && (
                    <p id="password-error" className="text-red-600 text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full bg-[#B07B5E] hover:bg-green-900">
                    {isSubmitting ? 'Connexion...' : 'Suivant'}
                </Button>

                <Button variant="outline" className="w-full text-green-800 hover:bg-green-900 hover:text-white">
                    Accueil
                </Button>
            </form>
            <div className="flex items-center justify-between mt-4 text-sm">

                <Link href="/auth/forgot-password" className="text-[#B07B5E] hover:underline" >
                    Mot de passe oublié ?
                </Link>

                <Link href="/auth/signup" className="text-[#B07B5E] hover:underline" >
                    Créer un compte
                </Link>
            </div>

        </div>
    );
}

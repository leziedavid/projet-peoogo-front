"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { UsersSchema } from "@/schema/UsersSchema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Role, RoleLabels, UserStatus } from "@/types/roles";
import { PhoneInput } from "@/components/phone/phone-input";
import { FileUploader } from "@/components/upload/FileUploader";
import { Eye, EyeOff, Mail, User, Lock, X, Globe } from "lucide-react";
// import { User as UserType } from "@/types/user"; // 👈 import du bon type
import { User as UserType  } from "@/types/ApiReponse/UsersResponse";
// import { User as UserType } from "@/types/user"; // 👈 import du bon type

type UserFormProps = {
    initialValues?: Partial<UserType>;
    isOpen: boolean;
    onClose: () => void;
};

export function UserForm({ initialValues, isOpen, onClose }: UserFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [phoneValue, setPhoneValue] = useState("");
    const [files, setFiles] = useState<Record<string, File[]>>({});
    const [progresses, setProgresses] = useState<Record<string, Record<string, number>>>({});
    const [phoneValid, setPhoneValid] = useState(true);

    type UserFormFields = z.infer<typeof UsersSchema>;

    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<UserFormFields>({
        resolver: zodResolver(UsersSchema),
        defaultValues: {
            email: initialValues?.email || "",
            name: initialValues?.name || "",
            password: "",
            role: (initialValues?.role as Role) ?? Role.DRIVER,
            status: initialValues?.status || UserStatus.INACTIVE,
            phoneNumber: initialValues?.phoneNumber || "",
            phoneCountryCode: initialValues?.phoneCountryCode || "",
        }
    });

    useEffect(() => {
        if (initialValues?.phoneNumber) {
            setPhoneValue(initialValues.phoneNumber);
            setValue("phoneNumber", initialValues.phoneNumber);
            setValue("phoneCountryCode", initialValues.phoneCountryCode ?? "");
        }
    }, [initialValues, setValue]);

    const handleValueChange = (name: string, fileList: File[]) => {
        setFiles((prev) => ({ ...prev, [name]: fileList }));
        setValue(name as any, fileList, { shouldValidate: true });
    };

    const handleUpload = async (name: string, files: File[]) => {
        const fileProgress: Record<string, number> = {};
        for (const file of files) {
            fileProgress[file.name] = 0;
            setProgresses((prev) => ({
                ...prev,
                [name]: { ...(prev[name] || {}), ...fileProgress },
            }));
            await new Promise((res) => setTimeout(res, 300));
            fileProgress[file.name] = 100;
            setProgresses((prev) => ({
                ...prev,
                [name]: { ...(prev[name] || {}), ...fileProgress },
            }));
        }
    };

    useEffect(() => {
        setValue("phoneNumber", phoneValue);
        const code = phoneValue.startsWith("+") ? phoneValue.split(" ")[0] : "";
        setValue("phoneCountryCode", code);
    }, [phoneValue, setValue]);

    const onSubmit = async (data: z.infer<typeof UsersSchema>) => {
        try {
            if (!phoneValid) {
                toast.error("Numéro de téléphone invalide");
                return;
            }

            const payload = new FormData();
            payload.append("email", data.email);
            payload.append("name", data.name);
            payload.append("role", data.role);
            payload.append("status", data.status ?? "INACTIVE");
            if (data.password) payload.append("password", data.password);
            if (data.phoneNumber) payload.append("phoneNumber", data.phoneNumber);
            if (data.phoneCountryCode) payload.append("phoneCountryCode", data.phoneCountryCode);

            if (data.file?.[0]) payload.append("profilePhoto", data.file[0]);
            if (data.permis?.[0]) payload.append("drivingLicense", data.permis[0]);
            if (data.carte?.[0]) payload.append("identityCard", data.carte[0]);

            const method = initialValues?.id ? "PUT" : "POST";

            const response = await fetch(`/api/user${initialValues?.id ? `/${initialValues.id}` : ""}`, {
                method,
                body: payload,
            });

            if (!response.ok) throw new Error("Erreur lors de l'enregistrement");

            toast.success(`Utilisateur ${initialValues?.id ? "modifié" : "créé"} avec succès`);
            onClose();

        } catch (error) {
            toast.error("Erreur lors de la soumission");
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50">
            <div className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0 w-full md:w-[50vw] shadow-xl' : 'translate-x-full w-100'} bg-white`}>
                <h2 className="text-xl font-bold mb-4">{initialValues?.id ? "Modifier l'utilisateur" : "Créer un utilisateur"}</h2>
                <Button onClick={onClose} className="absolute top-2.5 end-2.5 bg-red-500 text-white rounded-full w-8 h-8">
                    <X className="w-4 h-4" />
                </Button>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
                    {/* Email */}
                    <div>
                        <Label>Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <input type="email" {...register("email")} className="w-full py-2 pl-12 pr-4 text-base rounded-md border-1 outline-none focus:border-orange-600 focus:ring-0 bg-white placeholder-gray-400"  />
                        </div>
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    {/* Nom */}
                    <div>
                        <Label>Nom</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <input {...register("name")} className="w-full py-2 pl-12 pr-4 text-base rounded-md border-1 outline-none focus:border-orange-600 focus:ring-0 bg-white placeholder-gray-400"  />
                        </div>
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Mot de passe */}
                    <div>
                        <Label>Mot de passe</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <input type={showPassword ? "text" : "password"} {...register("password")} className="w-full py-2 pl-12 pr-4 text-base rounded-md border-1 outline-none focus:border-orange-600 focus:ring-0 bg-white placeholder-gray-400"  />
                            <div className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </div>
                        </div>
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="password" className="mb-2 block text-lg font-medium">Confirmer le mot de passe</Label>
                        <div className="relative">
                            {/* Icône cadenas à gauche */}
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            {/* Champ mot de passe */}
                            <input id="password" type={showPassword ? 'text' : 'password'} {...register('confirmPassword')} className="w-full py-2 pl-12 pr-4 text-base rounded-md border-1 outline-none focus:border-orange-600 focus:ring-0 bg-white placeholder-gray-400" placeholder="Confirmez le mot de passe" />
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

                    {/* Rôle */}
                    <div>
                        <Label>Rôle</Label>
                        <Select onValueChange={(val) => setValue("role", val as Role)} defaultValue={initialValues?.role ?? "DRIVER"}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un rôle" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(Role).map((role) => (
                                    <SelectItem key={role} value={role}>
                                        {RoleLabels[role]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
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

                    {/* Téléphone */}
                    <div>
                        <Label>Téléphone</Label>
                        <PhoneInput value={phoneValue} onChange={(e) => setPhoneValue(e.target.value)} />
                        {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
                    </div>

                    {/* Uploads */}
                    <div>
                        <Label>Photo de profil</Label>
                        <FileUploader name="file" multiple={false} value={files} onValueChange={handleValueChange} onUpload={handleUpload} progresses={progresses} />
                    </div>
                    <div>
                        <Label>Permis de conduire</Label>
                        <FileUploader name="permis" multiple={false} value={files} onValueChange={handleValueChange} onUpload={handleUpload} progresses={progresses} />
                    </div>
                    <div>
                        <Label>Carte d'identité</Label>
                        <FileUploader name="carte" multiple={false} value={files} onValueChange={handleValueChange} onUpload={handleUpload} progresses={progresses} />
                    </div>

                    <Button type="submit" className="w-full">{initialValues?.id ? "Mettre à jour" : "Créer l'utilisateur"}</Button>
                </form>
            </div>
        </div>
    );
}

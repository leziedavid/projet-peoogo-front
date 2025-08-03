'use client';

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import SelectDecoupageProduct from "../filter/SelectDecoupageProduct";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Camera, CreditCard } from "lucide-react";
import { FileUploader } from "../upload/FileUploader";
import { ProductsRequest } from "@/types/ApiRequest/ProductsRequest";
import { TypeCompte } from "@/types/ApiRequest/EnrollementRequest";
import { UserEnrollementData } from "@/types/ApiReponse/userEnrollementData";
import { SubmitHandler } from "react-hook-form";

const venteTypes = ["vente en gros", "vente en unité"];
const paymentMethods = ["Mobile Money", "Espèces", "Carte Bancaire"];
const typeActeurs = ["AGRICULTEURS", "AQUACULTEURS", "AUTRE_ACTEURS", "APICULTEURS", "REVENDEUR", "TRANSFORMATEUR", "ACHETEUR"];
const unites = ["KG", "SAC", "TRICYCLE", "TONNE", 'BOITE'];

const productSchema = z.object({
    libelle: z.string().min(2, "Libellé requis"),
    paymentMethod: z.string().min(1, "Méthode requise"),
    unit: z.string().min(1, "Unité requise"),
    quantity: z.coerce.number().positive("Quantité requise"),
    price: z.coerce.number().positive("Prix requis"),
    saleType: z.string().min(1, "Type de vente requis"),
    type_acteur: z.nativeEnum(TypeCompte),
    availableStartDate: z.string().min(1, "Date de début requise"),
    availableEndDate: z.string().min(1, "Date de fin requise"),
    description: z.string().min(5, "Description requise"),
    images: z.instanceof(File).optional(),
    autre_images: z.instanceof(File).optional(),
    decoupage: z.object({
        districtId: z.string(),
        regionId: z.string(),
        departmentId: z.string(),
        sousPrefectureId: z.string(),
        localiteId: z.string(),
    }),
}).refine(data => new Date(data.availableStartDate) <= new Date(data.availableEndDate), {
    message: "La date de début doit être antérieure ou égale à la date de fin.",
    path: ["availableEndDate"],
});

// type ProductsRequest = z.infer<typeof productSchema>;

interface ProductFormProps {
    initialValues?: Partial<ProductsRequest>;
    userEnrollementData: UserEnrollementData | null;
}

export default function ProductForm({ initialValues, userEnrollementData }: ProductFormProps) {

    const [previewData, setPreviewData] = useState<ProductsRequest | null>(null);
    const [files, setFiles] = useState<Record<string, File[]>>({});
    const [progresses, setProgresses] = useState<Record<string, Record<string, number>>>({});
    const [decoupage, setDecoupage] = useState({
        districtId: '',
        regionId: '',
        departmentId: '',
        sousPrefectureId: '',
        localiteId: '',
        ...initialValues?.decoupage,
    });

    const getValidTypeActeur = (value: string | undefined): TypeCompte => {
        if (value && typeActeurs.includes(value)) {
            return value as TypeCompte;
        }
        return typeActeurs[0] as TypeCompte; // fallback si invalide ou absent
    }

    const defaultTypeActeur = getValidTypeActeur(userEnrollementData?.enrollement?.TypeCompte);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
        trigger,
        getValues,
        setValue,
    } = useForm<ProductsRequest>({
        resolver: zodResolver(productSchema),
        mode: "onChange",
        defaultValues: {
            type_acteur: defaultTypeActeur,
            ...initialValues,
            decoupage: {
                districtId: '',
                regionId: '',
                departmentId: '',
                sousPrefectureId: '',
                localiteId: '',
                ...initialValues?.decoupage,
            },
        },
    });

    useEffect(() => {
        const value = userEnrollementData?.enrollement?.TypeCompte;
        if (value && typeActeurs.includes(value)) {
            setValue("type_acteur", value as TypeCompte, { shouldValidate: true });
        }
    }, [userEnrollementData, setValue]);




    // Handle fichiers upload
    const handleValueChange = (name: string, fileList: File[]) => {
        setFiles((prev) => ({ ...prev, [name]: fileList }));
        setValue(name as any, fileList[0] ?? null, { shouldValidate: true });
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

    const onPreview = async () => {
        const valid = await trigger();
        if (valid) {
            const values = getValues();
            console.log('Preview values:', decoupage); // ⬅️ regarde s'il contient déjà decoupage
            setPreviewData({ ...values, decoupage });
        }
    };

    const onSubmitHandler: SubmitHandler<ProductsRequest> = async (data) => {
        if (!userEnrollementData?.decoupage) {
            console.warn("Découpage utilisateur non disponible");
            return;
        }
        const decoupage = {
            districtId: userEnrollementData.decoupage.district?.id,
            regionId: userEnrollementData.decoupage.region?.id,
            departmentId: userEnrollementData.decoupage.department?.id,
            sousPrefectureId: userEnrollementData.decoupage.sousPrefecture?.id,
            localiteId: userEnrollementData.decoupage.localite?.id,
        };

        console.log('🚀 ProductsRequest:', data);
        console.log('🗺️ Découpage:', decoupage);
        const formData = new FormData();
        formData.append('nom', data.libelle);
        formData.append('description', data.description);
        formData.append('quantite', data.quantity.toString());
        formData.append('prixUnitaire', data.price.toString());
        formData.append('paymentMethod', data.paymentMethod);
        formData.append('unit', data.unit);
        formData.append('saleType', data.saleType);
        formData.append('type_acteur', data.type_acteur);
        formData.append('disponibleDe', data.availableStartDate);
        formData.append('disponibleJusqua', data.availableEndDate);
        formData.append('decoupage', JSON.stringify(decoupage));

        if (files['image']?.[0]) {
            formData.append('image', files['image'][0]);
        }

        if (files['autre_images']) {
            files['autre_images'].forEach(file => {
                formData.append('autre_images', file);
            });
        }

        console.log('🚀 FormData:');
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }


        // try {
        //     const res = await createProduct(formData);
        //     if (res.statusCode === 201) {
        //         toast.success(res.message);
        //         getAllProducts();
        //         onClose();
        //     } else {
        //         toast.error(res.message);
        //         console.error('Erreur lors de la création du produit :', res.message);
        //     }
        // } catch (error) {
        //     console.error('Erreur lors de la création du produit :', error);
        //     toast.error('Erreur lors de la création du produit :', error);
        // }



        // Tu peux ici envoyer `decoupage` avec `data`, ex. :
        // onSubmit({ ...data, decoupage });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6 mb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="md:col-span-2">
                        <Label className="mb-2">Découpage géographique *</Label>
                        <SelectDecoupageProduct
                            initialDecoupage={{
                                districtId: userEnrollementData?.decoupage.districtId,
                                regionId: userEnrollementData?.decoupage.regionId,
                                departmentId: userEnrollementData?.decoupage.departmentId,
                                sousPrefectureId: userEnrollementData?.decoupage.sousPrefectureId,
                                localiteId: userEnrollementData?.decoupage.localiteId,
                            }}
                            onChange={(value) =>
                                setDecoupage({
                                    districtId: value.districtId ?? '',
                                    regionId: value.regionId ?? '',
                                    departmentId: value.departmentId ?? '',
                                    sousPrefectureId: value.sousPrefectureId ?? '',
                                    localiteId: value.localiteId ?? '',
                                })
                            }
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Libellé de l’annonce *</Label>
                        <Input {...register("libelle")} placeholder="Ex: Tomates fraîches du jour" className="w-full py-2" />
                        {errors.libelle && <p className="text-red-500 text-sm">{errors.libelle.message}</p>}
                    </div>

                    <div>
                        <Label className="mb-2">Type d'acteur *</Label>
                        <Controller
                            control={control}
                            name="type_acteur"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value || ""}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionnez votre rôle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {typeActeurs.map(type => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.type_acteur && <p className="text-red-500 text-sm">{errors.type_acteur.message}</p>}
                    </div>

                    <div>
                        <Label className="mb-2">Méthode de paiement *</Label>
                        <Controller
                            control={control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value || ""}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Méthode de paiement" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {paymentMethods.map(method => (
                                            <SelectItem key={method} value={method}>{method}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
                    </div>

                    <div>
                        <Label className="mb-2">Unité *</Label>
                        <Controller
                            control={control}
                            name="unit"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value || ""}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionnez votre rôle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {unites.map(type => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.unit && <p className="text-red-500 text-sm">{errors.unit.message}</p>}
                    </div>

                    <div>
                        <Label className="mb-2">Quantité *</Label>
                        <Input type="number" {...register("quantity")} placeholder="Quantité" className="w-full" />
                        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
                    </div>

                    <div>
                        <Label className="mb-2">Prix unitaire *</Label>
                        <Input type="number" {...register("price")} placeholder="Prix unitaire" className="w-full" />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                    </div>

                    <div>
                        <Label className="mb-2">Type de vente *</Label>
                        <Controller
                            control={control}
                            name="saleType"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value || ""}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Type de vente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {venteTypes.map(type => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.saleType && <p className="text-red-500 text-sm">{errors.saleType.message}</p>}
                    </div>

                    <div>
                        <Label className="mb-2">Date début *</Label>
                        <Input type="date" {...register("availableStartDate")} className="w-full" />
                        {errors.availableStartDate && <p className="text-red-500 text-sm">{errors.availableStartDate.message}</p>}
                    </div>

                    <div>
                        <Label className="mb-2">Date fin *</Label>
                        <Input type="date" {...register("availableEndDate")} className="w-full" />
                        {errors.availableEndDate && <p className="text-red-500 text-sm">{errors.availableEndDate.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <Label className="mb-2">Description *</Label>
                        <Textarea {...register("description")} placeholder="Décrire votre produit..." className="w-full" />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                </div>



                {/* Upload fichiers */}
                <Card>
                    <CardHeader>
                        <CardTitle>Documents</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Camera className="h-5 w-5 text-gray-600" />
                                <h3 className="font-semibold">Image principal du produit</h3>
                            </div>

                            <FileUploader name="images" multiple={false} value={files} onValueChange={handleValueChange} onUpload={handleUpload} progresses={progresses} />

                            {errors.images && (
                                <p className="text-sm text-red-500">{String(errors.images.message)}</p>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Camera className="h-5 w-5 text-gray-600" />
                                <h3 className="font-semibold">Autre image du produit (2 Image maximum) </h3>
                            </div>
                            <FileUploader name="autre_images" multiple={true} value={files} onValueChange={handleValueChange} onUpload={handleUpload} progresses={progresses} />
                            {errors.autre_images && (
                                <p className="text-sm text-red-500">{String(errors.autre_images.message)}</p>
                            )}
                        </div>

                    </CardContent>
                </Card>

                <div className="flex flex-col md:flex-row gap-4 pt-4 mb-4">
                    <Button
                        type="button"
                        onClick={onPreview}
                        className="w-full md:w-auto bg-gray-500 hover:bg-gray-600" >
                        Prévisualiser
                    </Button>
                    <Button type="submit" disabled={!isValid} className="w-full md:w-auto" >
                        {Object.keys(initialValues ?? {}).length > 0 ? "Mettre à jour le produit" : "Publier le produit"}
                    </Button>
                </div>

            </form>

            {previewData && (
                <div className="mt-6 border p-4 rounded-md shadow bg-white">
                    <h2 className="text-lg font-bold mb-4">Résumé de l’annonce</h2>
                    <ul className="space-y-2 text-sm">
                        <li><strong>Libellé:</strong> {previewData.libelle}</li>
                        <li><strong>Type d’acteur:</strong> {previewData.type_acteur}</li>
                        <li><strong>Type de vente:</strong> {previewData.saleType}</li>
                        <li><strong>Méthode de paiement:</strong> {previewData.paymentMethod}</li>
                        <li><strong>Unité:</strong> {previewData.unit}</li>
                        <li><strong>Quantité:</strong> {previewData.quantity}</li>
                        <li><strong>Prix unitaire:</strong> {previewData.price}</li>
                        <li><strong>Disponibilité:</strong> du {previewData.availableStartDate} au {previewData.availableEndDate}</li>
                        <li><strong>Description:</strong> {previewData.description}</li>
                        {/* <li><strong>Localisation:</strong> {Object.values(decoupage).join(" > ")}</li> */}
                    </ul>
                </div>
            )}
        </>
    );
}

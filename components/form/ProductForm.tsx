import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { X, Plus } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { ProductRequest, VariantType } from '@/types/ApiRequest/ProductRequest';
import { FileUploader } from '../upload/FileUploader';
import { createProduct, getLatestActiveServiceIdByUserAndType, getVariantByVariantType, updateProduct } from '@/api/services/authService';
import { getUserId, getUserInfos } from '@/app/middleware';
import { toast } from 'sonner';

type ProductFormProps = {
    initialValues?: Partial<ProductRequest>;
    isOpen: boolean;
    onClose: () => void;
    categories: { id: string; name: string }[];
    variants: { type: VariantType; options: { id: string; label: string }[] }[];
    getAllProducts: () => void;
};

export function ProductForm({ initialValues, isOpen, onClose, categories,variants, getAllProducts }: ProductFormProps) {

    const { register, handleSubmit, control, setValue, watch, formState: { isSubmitting } } = useForm<ProductRequest>({
        defaultValues: initialValues as any,
    });

    const [files, setFiles] = useState<Record<string, File[]>>({});
    const [progresses, setProgresses] = useState<Record<string, Record<string, number>>>({});
    const [categoryFilter, setCategoryFilter] = useState('');
    const selectedVariantType = watch('variantType');
    const selectedVariantIds = watch('variantIds') || [];
    const [userID, setUserID] = useState<string | null>(null);
    const [serviceID, setServiceID] = useState<string | null>(null);
    const [variantOptions, setVariantOptions] = useState<{ id: string; label: string }[]>([]);
    const isEditMode = !!initialValues?.id;

    const getServiceID = async () => {
        const res = await getLatestActiveServiceIdByUserAndType("ECOMMERCE");
        if (res.statusCode === 200 && res.data) {
            setServiceID(res.data);
        }
    };

    useEffect(() => { getServiceID() }, []);

    const getUserID = async () => {
        const res = await getUserId();
        if (res) {
            setUserID(res);
        }
    };

    useEffect(() => { getUserID() }, []);

    useEffect(() => {

        const fetchVariants = async () => {
            if (!selectedVariantType) return;
            try {
                const res = await getVariantByVariantType(selectedVariantType);
                if (res.statusCode === 200 && Array.isArray(res.data)) {
                    const mapped = res.data.map((variant: any) => ({
                        id: variant.id,
                        label: variant.name + (variant.value ? ` - ${variant.value}` : ''),
                    }));
                    setVariantOptions(mapped);
                }
            } catch (err) {
                console.error("Erreur de chargement des variantes", err);
            }
        };

        fetchVariants();
    }, [selectedVariantType]);

    const addVariant = (id: string) => {
        if (!selectedVariantIds.includes(id)) {
            setValue('variantIds', [...selectedVariantIds, id]);
        }
    };

    const removeVariant = (id: string) => {
        setValue('variantIds', selectedVariantIds.filter(v => v !== id));
    };

    const onSubmit = async (data: ProductRequest) => {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.description || '');
        formData.append('price', data.price.toString());
        formData.append('stock', data.stock.toString());
        formData.append('categoryId', data.categoryId);

        const resolvedServiceId = initialValues?.serviceId ?? serviceID;
        if (resolvedServiceId) {
            formData.append('serviceId', resolvedServiceId);
        }

        if (data.variantIds && data.variantIds.length > 0) {
            formData.append('variantIds', data.variantIds.join(','));
        }

        if (data.variantType) {
            formData.append('variantType', data.variantType);
        }

        if (files['imageFile']?.[0]) {
            formData.append('imageFile', files['imageFile'][0]);
        }

        if (files['files']) {
            files['files'].forEach(file => {
                formData.append('files', file);
            });
        }

        try {
            if (isEditMode) {
                // formData.append('id', initialValues.id!); // ou tout autre champ pour identifier le produit
            const res = await updateProduct(initialValues.id!, formData);
                if (res.statusCode === 200) {
                    toast.success(res.message);
                    getAllProducts();
                    onClose();

                } else {
                    toast.error(res.message);
                    console.error('Erreur lors de la mise à jour du produit :', res.message);
                }
            } else {
            const res = await createProduct(formData);
                if (res.statusCode === 201) {
                    toast.success(res.message);
                    getAllProducts();
                    onClose();

                } else {
                    toast.error(res.message);
                }
            }

        } catch (error) {
            console.error('Erreur lors de l’envoi :', error);
        }
    };


    const handleValueChange = (name: string, fileList: File[]) => {
        setFiles((prev) => ({ ...prev, [name]: fileList }));
        setValue(name as any, fileList, { shouldValidate: true });
    };

    const handleUpload = async (name: string, fileList: File[]) => {
        const progressMap: Record<string, number> = {};

        for (const file of fileList) {
            progressMap[file.name] = 0;

            setProgresses((prev) => ({
                ...prev,
                [name]: {
                    ...(prev[name] || {}),
                    ...progressMap,
                },
            }));

            await new Promise((res) => setTimeout(res, 300));

            progressMap[file.name] = 100;

            setProgresses((prev) => ({
                ...prev,
                [name]: {
                    ...(prev[name] || {}),
                    ...progressMap,
                },
            }));
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-black/50 z-50">
            <div className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto w-full md:w-[50vw] bg-white dark:bg-gray-800 shadow-xl transition-transform transform translate-x-0">
                <h5 className="text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase mb-4">
                    {initialValues?.id ? 'Modifier un produit' : 'Nouveau produit'}
                </h5>

                <Button
                    type="button"
                    className="absolute top-2.5 end-2.5 bg-red-500 text-white w-8 h-8 rounded-lg flex items-center justify-center"
                    onClick={onClose}
                >
                    <X className="w-3 h-3" />
                    <span className="sr-only">Fermer</span>
                </Button>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input id="name" {...register('name', { required: true })} />
                    </div>

                    <div className="sm:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" {...register('description')} />
                    </div>

                    <div>
                        <Label htmlFor="price">Prix</Label>
                        <Input type="number" step="0.01" id="price" {...register('price', { valueAsNumber: true })} />
                    </div>

                    <div>
                        <Label htmlFor="stock">Stock</Label>
                        <Input type="number" id="stock" {...register('stock', { valueAsNumber: true })} />
                    </div>

                    {/* <div className="sm:col-span-2">
                        <Label htmlFor="sku">SKU</Label>
                        <Input id="sku" {...register('sku')} />
                    </div> */}

                    <div className="sm:col-span-2 w-full">
                        <Label>Catégorie</Label>
                        <Controller
                            control={control}
                            name="categoryId"
                            rules={{ required: true }}
                            render={({ field }) => {
                                const filteredCategories = categories.filter(cat =>
                                    cat.name.toLowerCase().includes(categoryFilter.toLowerCase())
                                );

                                return (
                                    <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Sélectionnez une catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <div className="p-2">
                                                <Input
                                                    placeholder="Rechercher une catégorie..."
                                                    value={categoryFilter}
                                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                                    className="w-full"
                                                />
                                            </div>
                                            {filteredCategories.length > 0 ? (
                                                filteredCategories.map(cat => (
                                                    <SelectItem key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <div className="px-4 py-2 text-sm text-gray-500">Aucune catégorie trouvée</div>
                                            )}
                                        </SelectContent>
                                    </Select>
                                );
                            }}
                        />
                    </div>

                    <div className="sm:col-span-2 w-full">
                        <Label>Type de variante</Label>
                        <Controller
                            control={control}
                            name="variantType"
                            render={({ field }) => (
                                <Select
                                    onValueChange={(val) => {
                                        field.onChange(val as VariantType);
                                        setValue('variantIds', []);
                                    }}
                                    value={field.value || ''}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choisir un type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(VariantType).map(vt => (
                                            <SelectItem key={vt} value={vt}>
                                                {vt}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    {variantOptions.length > 0 && (
                        <div className="sm:col-span-2">
                            <Label>Options</Label>
                            <div className="flex flex-wrap gap-2">
                                {variantOptions.map(opt => (
                                    <Button
                                        key={opt.id}
                                        variant={selectedVariantIds.includes(opt.id) ? 'secondary' : 'outline'}
                                        size="sm"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addVariant(opt.id);
                                        }}
                                    >
                                        <Plus size={16} />
                                        {opt.label}
                                    </Button>
                                ))}
                            </div>
                            {selectedVariantIds.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedVariantIds.map(id => {
                                        const opt = variantOptions.find(o => o.id === id);
                                        return (
                                            <span key={id} className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                                                {opt?.label || id}
                                                <X className="ml-1 cursor-pointer" onClick={() => removeVariant(id)} />
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="sm:col-span-2">
                        <Label>Image principale</Label>
                        <FileUploader
                            name="imageFile"
                            multiple={false}
                            value={{ imageFile: files['imageFile'] || [] }}
                            onValueChange={(name, f) => handleValueChange(name, f)}
                            onUpload={(name, f) => handleUpload(name, f)}
                            progresses={{ imageFile: progresses['imageFile'] }}
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <Label>Autres images</Label>
                        <FileUploader
                            name="files"
                            multiple={true}
                            value={{ files: files['files'] || [] }}
                            onValueChange={(name, f) => handleValueChange(name, f)}
                            onUpload={(name, f) => handleUpload(name, f)}
                            progresses={{ files: progresses['files'] || {} }}
                        />
                    </div>

                    <Button type="submit" className="sm:col-span-2 w-full mt-4" disabled={isSubmitting}>
                        {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                </form>
            </div>
        </div>
    ) : null;
}

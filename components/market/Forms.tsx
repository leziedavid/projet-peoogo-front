"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    CalendarClock,
    Mail,
    MapPin,
    MoveRight,
    Phone,
    User,
    Building,
    MessageSquare,
    Briefcase
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getPhoneData, PhoneInput } from "../phone/phone-input";

// Objets spécifiques au domaine agricole
const objetsAgricoles = [
    { value: "achat_produits", label: "Achat de produits agricoles" },
    { value: "vente_produits", label: "Vente de produits agricoles" },
    { value: "formation_agricole", label: "Formation et accompagnement agricole" },
    { value: "financement_agricole", label: "Financement et crédit agricole" },
    { value: "equipements_agricoles", label: "Équipements et matériels agricoles" },
    { value: "conseil_technique", label: "Conseil technique et agronomique" },
    { value: "certification_bio", label: "Certification biologique" },
    { value: "transformation_produits", label: "Transformation de produits agricoles" },
    { value: "marche_producteurs", label: "Accès au marché pour producteurs" },
    { value: "innovation_agricole", label: "Innovation et technologie agricole" },
    { value: "partenariat_cooperatives", label: "Partenariat avec coopératives" },
    { value: "assurance_agricole", label: "Assurance et protection des cultures" },
    { value: "autre", label: "Autre" }
];

const taillesEntreprises = [
    { value: "producteur_individuel", label: "Producteur individuel" },
    { value: "1-10", label: "1-10 employés (Petite exploitation)" },
    { value: "11-50", label: "11-50 employés (Moyenne exploitation)" },
    { value: "51-200", label: "51-200 employés (Grande exploitation)" },
    { value: "201-500", label: "201-500 employés (Agro-industrie)" },
    { value: "501-1000", label: "501-1000 employés (Groupe agricole)" },
    { value: "1000+", label: "1000+ employés (Multinationale)" }
];

const FormSchema = z.object({
    phone: z.string().min(1, "Le numéro de téléphone est obligatoire"),
    nomPrenom: z.string().min(2, "Le nom et prénom sont obligatoires"),
    email: z.string().email("Adresse email invalide"),
    job_title: z.string().min(2, "Le titre du poste est obligatoire"),
    company_name: z.string().min(2, "Le nom de l'entreprise/exploitation est obligatoire"),
    objets: z.enum([
        "achat_produits",
        "vente_produits",
        "formation_agricole",
        "financement_agricole",
        "equipements_agricoles",
        "conseil_technique",
        "certification_bio",
        "transformation_produits",
        "marche_producteurs",
        "innovation_agricole",
        "partenariat_cooperatives",
        "assurance_agricole",
        "autre"
    ], {
        required_error: "Veuillez sélectionner un objet de contact"
    }),
    company_size: z.enum([
        "producteur_individuel",
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "501-1000",
        "1000+"
    ], {
        required_error: "Veuillez sélectionner la taille de votre structure"
    }),
    contents: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type FormValues = z.infer<typeof FormSchema>;

interface Props { }

const Forms: React.FC<Props> = ({ }) => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            phone: "",
            nomPrenom: "",
            email: "",
            job_title: "",
            company_name: "",
            contents: "",
        },
    });

    async function onSubmit(data: FormValues) {
        try {
            const phoneData = getPhoneData(data.phone);
            if (!phoneData.isValid) {
                form.setError("phone", {
                    type: "manual",
                    message: "Numéro de téléphone invalide",
                });
                return;
            }

            setLoading(true);

            // Préparation de l'objet à envoyer à l'API
            const contactData = {
                phone: data.phone,
                nomPrenom: data.nomPrenom.trim(),
                email: data.email.toLowerCase().trim(),
                job_title: data.job_title.trim(),
                company_name: data.company_name.trim(),
                objets: data.objets,
                company_size: data.company_size,
                contents: data.contents.trim(),
                timestamp: new Date().toISOString(),
                source: "contact_form_agricole"
            };

            console.log("Données à envoyer:", contactData);

            // Simulation d'appel API - Remplacez par votre vraie API
            // const result = await addContacts(token, JSON.stringify(contactData));
            // if (result.statusCode !== 200) {
            //     toast.error(result.message);
            // } else {
            //     toast.success("Votre message a bien été envoyé avec succès !");
            //     setSubmitted(true);
            //     form.reset();
            // }

            // Simulation pour la démo
            await new Promise(resolve => setTimeout(resolve, 2000));
            toast.success("Votre message a bien été envoyé avec succès !");
            setSubmitted(true);
            form.reset();

        } catch (error) {
            console.error("Erreur lors de l'envoi:", error);
            toast.error("Une erreur est survenue lors de l'envoi du message");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="w-full py-10 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                    <div className="bg-white rounded-lg px-4 py-6">
                        <div className="bg-gray-50 w-full h-full rounded-xl p-6 md:p-12 flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">Contactez-nous</h2>
                                <p className="text-gray-600">Votre adresse électronique ne sera pas publiée.</p>
                                <p className="text-gray-600 font-bold text-sm mb-6">Les champs obligatoires sont marqués (*)</p>

                                <div className="bg-gray-50 md:w-4/5 space-y-6 p-4 rounded-lg ">
                                    <div className="flex gap-4 border-b pb-4">
                                        <MapPin className=" mt-0 text-green-800" />
                                        <div className="font-extrabold ">FASSO 2000</div>
                                    </div>

                                    <div className="flex gap-4 border-b pb-4">
                                        <Phone className=" mt-0 text-green-800" />
                                        <div className="font-extrabold ">+226 01 02 03 04</div>
                                    </div>

                                    <div className="flex gap-4 border-b pb-4">
                                        <Mail className=" mt-0 text-green-800" />
                                        <div className="font-extrabold ">fasso@gmail.com</div>
                                    </div>

                                    <div className="flex gap-4">
                                        <CalendarClock className=" mt-2 text-green-800" />
                                        <div className="font-extrabold ">OUVERT DE 07H00 - 23H00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="bg-white rounded-lg px-4 py-6">
                        <div className="bg-gray-50 w-full h-full rounded-xl p-6 md:p-12">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col justify-between space-y-4">

                                    <div className="flex-1 space-y-4">
                                        {/* Nom et Prénom */}
                                        <FormField
                                            control={form.control}
                                            name="nomPrenom"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-[#022d13]" />
                                                        Nom et Prénom *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Entrez votre nom complet"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Email */}
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2">
                                                        <Mail className="w-4 h-4" />
                                                        Email *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="votre.email@exemple.com"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Téléphone */}
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2">
                                                        <Phone className="w-4 h-4" />
                                                        Téléphone *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <PhoneInput
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            placeholder="Numéro de téléphone"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Poste */}
                                        <FormField
                                            control={form.control}
                                            name="job_title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2">
                                                        <Briefcase className="w-4 h-4" />
                                                        Poste/Fonction *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Ex: Producteur, Agronome, Directeur..."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Nom de l'entreprise */}
                                        <FormField
                                            control={form.control}
                                            name="company_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2">
                                                        <Building className="w-4 h-4" />
                                                        Nom de l'exploitation/entreprise *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nom de votre structure"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Objet du contact */}
                                        <FormField
                                            control={form.control}
                                            name="objets"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Objet de votre contact *</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Sélectionnez l'objet de votre demande" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {objetsAgricoles.map((objet) => (
                                                                <SelectItem key={objet.value} value={objet.value}>
                                                                    {objet.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Taille de l'entreprise */}
                                        <FormField
                                            control={form.control}
                                            name="company_size"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Taille de votre structure *</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Sélectionnez la taille de votre structure" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {taillesEntreprises.map((taille) => (
                                                                <SelectItem key={taille.value} value={taille.value}>
                                                                    {taille.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Message */}
                                        <FormField
                                            control={form.control}
                                            name="contents"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2">
                                                        <MessageSquare className="w-4 h-4" />
                                                        Votre message *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Décrivez votre demande en détail..."
                                                            className="min-h-[120px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="gap-4 w-full mt-6"
                                        style={{ backgroundColor: '#022d13' }}
                                        disabled={loading}  >
                                        {loading ? "Envoi en cours..." : "Envoyer le message"}
                                        <MoveRight className="w-4 h-4" />
                                    </Button>

                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forms;
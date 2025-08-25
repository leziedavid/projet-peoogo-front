
// utils/dateFormat.ts

export function formatDateHeureFr(dateString: string): string {
    if (!dateString) return 'Non disponible';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Format invalide';

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} à ${hours}h${minutes}`;
}

/**
 * @description formatter la date
 */
export function formatDate(dateString) {
    return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "short",
        day: "2-digit"
    }).format(new Date(dateString))
}
/**
 * Constantes liées à la gestion des dates
 */

export interface MonthOption {
  label: string;
  value: number;
}

/**
 * Liste des mois de l'année en français
 */
export const MONTHS: MonthOption[] = [
  { label: 'Janvier', value: 1 },
  { label: 'Février', value: 2 },
  { label: 'Mars', value: 3 },
  { label: 'Avril', value: 4 },
  { label: 'Mai', value: 5 },
  { label: 'Juin', value: 6 },
  { label: 'Juillet', value: 7 },
  { label: 'Août', value: 8 },
  { label: 'Septembre', value: 9 },
  { label: 'Octobre', value: 10 },
  { label: 'Novembre', value: 11 },
  { label: 'Décembre', value: 12 },
];

/**
 * Génère un tableau de jours (1-31)
 */
export const generateDays = (): number[] => {
  return Array.from({ length: 31 }, (_, i) => i + 1);
};

/**
 * Génère un tableau d'années autour de l'année courante
 * @param range Nombre d'années avant et après l'année courante (défaut: 5)
 */
export const generateYears = (range: number = 5): number[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: range * 2 + 1 }, (_, i) => currentYear - range + i);
};

/**
 * Formate une date ISO en chaîne lisible en français
 * @param dateString Date au format ISO (YYYY-MM-DD)
 * @returns Chaîne formatée ("Aujourd'hui", "Hier" ou date complète)
 */
export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (dateString === today) return "Aujourd'hui";
  if (dateString === yesterdayStr) return "Hier";

  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Convertit une date (jour, mois, année) en chaîne ISO
 */
export const toISODateString = (day: number, month: number, year: number): string => {
  const date = new Date(year, month - 1, day);
  return date.toISOString().split('T')[0];
};

/**
 * Retourne la date actuelle au format ISO
 */
export const getTodayISOString = (): string => {
  return new Date().toISOString().split('T')[0];
};

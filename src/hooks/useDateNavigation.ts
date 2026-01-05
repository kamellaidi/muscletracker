import { useCallback, useEffect, useState } from 'react';
import { getTodayISOString, toISODateString } from '../constants/dates';

/**
 * Hook personnalisé pour la gestion de la navigation de dates
 *
 * Permet de sélectionner et naviguer entre les dates (jour précédent, suivant, aujourd'hui)
 * et maintient une synchronisation entre les composants jour/mois/année et la date ISO
 *
 * @returns {Object} État et fonctions de navigation de date
 */
export const useDateNavigation = () => {
  const currentDate = new Date();

  // État des composants de date
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Date au format ISO (YYYY-MM-DD)
  const [selectedDateString, setSelectedDateString] = useState(getTodayISOString());

  /**
   * Synchronise la date ISO lorsque les composants jour/mois/année changent
   */
  useEffect(() => {
    const newDateString = toISODateString(selectedDay, selectedMonth, selectedYear);
    setSelectedDateString(newDateString);
  }, [selectedDay, selectedMonth, selectedYear]);

  /**
   * Navigue vers la date d'aujourd'hui
   */
  const goToToday = useCallback(() => {
    const today = new Date();
    setSelectedDay(today.getDate());
    setSelectedMonth(today.getMonth() + 1);
    setSelectedYear(today.getFullYear());
  }, []);

  /**
   * Navigue vers le jour précédent
   */
  const goToPreviousDay = useCallback(() => {
    const date = new Date(selectedYear, selectedMonth - 1, selectedDay);
    date.setDate(date.getDate() - 1);
    setSelectedDay(date.getDate());
    setSelectedMonth(date.getMonth() + 1);
    setSelectedYear(date.getFullYear());
  }, [selectedDay, selectedMonth, selectedYear]);

  /**
   * Navigue vers le jour suivant
   */
  const goToNextDay = useCallback(() => {
    const date = new Date(selectedYear, selectedMonth - 1, selectedDay);
    date.setDate(date.getDate() + 1);
    setSelectedDay(date.getDate());
    setSelectedMonth(date.getMonth() + 1);
    setSelectedYear(date.getFullYear());
  }, [selectedDay, selectedMonth, selectedYear]);

  /**
   * Vérifie si la date sélectionnée est aujourd'hui
   */
  const isToday = selectedDateString === getTodayISOString();

  return {
    // État de la date
    selectedDay,
    selectedMonth,
    selectedYear,
    selectedDateString,
    isToday,

    // Setters pour les pickers
    setSelectedDay,
    setSelectedMonth,
    setSelectedYear,

    // Fonctions de navigation
    goToToday,
    goToPreviousDay,
    goToNextDay,
  };
};

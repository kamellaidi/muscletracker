import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Button from '../../src/components/Button';
import { DateSelector } from '../../src/components/workout/DateSelector';
import { WorkoutFormModal } from '../../src/components/workout/WorkoutFormModal';
import { WorkoutList } from '../../src/components/workout/WorkoutList';
import { WorkoutSummary } from '../../src/components/workout/WorkoutSummary';
import { WORKOUT_MESSAGES } from '../../src/constants/messages';
import { useDateNavigation } from '../../src/hooks/useDateNavigation';
import { useWorkoutForm } from '../../src/hooks/useWorkoutForm';
import StorageService from '../../src/services/StorageService';
import { WorkoutEntry } from '../../src/types';
import { COLORS } from '../../src/utils/theme';

/**
 * Page principale de gestion des séances d'entraînement
 *
 * Permet de :
 * - Sélectionner une date pour la séance
 * - Visualiser les exercices de la séance
 * - Ajouter de nouveaux exercices via une navigation à 3 niveaux
 *   1. Sélection du groupe musculaire
 *   2. Sélection de l'exercice
 *   3. Saisie des détails (séries, reps, poids)
 * - Voir un résumé statistique de la séance
 */
export default function WorkoutPage() {
  // Gestion de la navigation de dates
  const dateNavigation = useDateNavigation();

  // État local
  const [todayWorkouts, setTodayWorkouts] = useState<WorkoutEntry[]>([]);
  const [showModal, setShowModal] = useState(false);

  /**
   * Callback appelé après l'ajout d'un exercice
   * Mise à jour optimiste de la liste sans recharger depuis le storage
   */
  const handleWorkoutAdded = useCallback((newWorkout: WorkoutEntry) => {
    setTodayWorkouts((prev) => [...prev, newWorkout]);
    setShowModal(false);
  }, []);

  // Gestion du formulaire d'ajout d'exercice
  const workoutForm = useWorkoutForm(dateNavigation.selectedDateString, handleWorkoutAdded);

  /**
   * Charge les workouts de la date sélectionnée
   */
  const loadData = useCallback(async () => {
    try {
      const workoutsData = await StorageService.getWorkoutsByDate(
        dateNavigation.selectedDateString
      );
      setTodayWorkouts(workoutsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, [dateNavigation.selectedDateString]);

  // Recharger les données quand la date change
  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <ScrollView style={styles.container}>
      {/* Sélecteur de date */}
      <DateSelector
        selectedDay={dateNavigation.selectedDay}
        selectedMonth={dateNavigation.selectedMonth}
        selectedYear={dateNavigation.selectedYear}
        selectedDateString={dateNavigation.selectedDateString}
        isToday={dateNavigation.isToday}
        onDayChange={dateNavigation.setSelectedDay}
        onMonthChange={dateNavigation.setSelectedMonth}
        onYearChange={dateNavigation.setSelectedYear}
        onPreviousDay={dateNavigation.goToPreviousDay}
        onNextDay={dateNavigation.goToNextDay}
        onToday={dateNavigation.goToToday}
      />

      {/* Résumé de la séance */}
      <WorkoutSummary workouts={todayWorkouts} />

      {/* Bouton d'ajout d'exercice */}
      <Button
        title={WORKOUT_MESSAGES.LABELS.ADD_EXERCISE}
        onPress={() => setShowModal(true)}
        style={styles.addButton}
      />

      {/* Liste des exercices */}
      <WorkoutList workouts={todayWorkouts} />

      {/* Modal d'ajout d'exercice avec navigation à 3 niveaux */}
      <WorkoutFormModal
        visible={showModal}
        selectedExercise={workoutForm.selectedExercise}
        sets={workoutForm.sets}
        reps={workoutForm.reps}
        weight={workoutForm.weight}
        useWeight={workoutForm.useWeight}
        isFormValid={workoutForm.isFormValid()}
        onClose={() => setShowModal(false)}
        onExerciseSelect={workoutForm.setSelectedExercise}
        onSetsChange={workoutForm.setSets}
        onRepsChange={workoutForm.setReps}
        onWeightChange={workoutForm.setWeight}
        onUseWeightChange={workoutForm.setUseWeight}
        onSubmit={workoutForm.handleSubmit}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  addButton: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
});

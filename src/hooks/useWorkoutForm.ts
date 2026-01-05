import { useState } from 'react';
import { Alert } from 'react-native';
import { Exercise } from '../data/exercisesDatabase';
import StorageService from '../services/StorageService';
import { WORKOUT_MESSAGES } from '../constants/messages';

/**
 * Hook personnalisé pour la gestion du formulaire d'ajout d'exercice
 *
 * Gère l'état du formulaire, la validation et la soumission
 *
 * @param selectedDateString - Date ISO de la séance
 * @param onWorkoutAdded - Callback appelé après l'ajout réussi d'un exercice
 * @returns {Object} État et fonctions du formulaire
 */
export const useWorkoutForm = (
  selectedDateString: string,
  onWorkoutAdded: (workout: any) => void
) => {
  // État du formulaire
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [useWeight, setUseWeight] = useState(true);

  /**
   * Valide le formulaire
   * @returns {boolean} True si le formulaire est valide
   */
  const isFormValid = (): boolean => {
    if (!selectedExercise) return false;
    if (!sets.trim() || parseInt(sets) <= 0) return false;
    if (!reps.trim() || parseInt(reps) <= 0) return false;

    // Si l'utilisateur veut utiliser du poids, il doit être renseigné et > 0
    if (useWeight && (!weight.trim() || parseFloat(weight) <= 0)) return false;

    return true;
  };

  /**
   * Réinitialise le formulaire à ses valeurs par défaut
   */
  const resetForm = () => {
    setSelectedExercise(null);
    setSets('3');
    setReps('');
    setWeight('');
    setUseWeight(true);
  };

  /**
   * Soumet le formulaire et ajoute l'exercice à la séance
   */
  const handleSubmit = async () => {
    // Validation complète avec messages d'erreur
    if (!selectedExercise) {
      Alert.alert('Erreur', WORKOUT_MESSAGES.ERRORS.NO_EXERCISE);
      return;
    }

    if (!sets.trim() || parseInt(sets) <= 0) {
      Alert.alert('Erreur', WORKOUT_MESSAGES.ERRORS.INVALID_SETS);
      return;
    }

    if (!reps.trim() || parseInt(reps) <= 0) {
      Alert.alert('Erreur', WORKOUT_MESSAGES.ERRORS.INVALID_REPS);
      return;
    }

    if (useWeight && (!weight.trim() || parseFloat(weight) <= 0)) {
      Alert.alert('Erreur', WORKOUT_MESSAGES.ERRORS.INVALID_WEIGHT);
      return;
    }

    try {
      // Création de l'exercice avec les données de la base de données
      const newWorkout = await StorageService.addWorkout({
        date: selectedDateString,
        exerciseId: selectedExercise.id,
        exerciseName: selectedExercise.name,
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: useWeight ? parseFloat(weight) : 0, // 0 si au poids de corps
      });

      // Mise à jour optimiste via le callback
      onWorkoutAdded(newWorkout);

      // Réinitialisation du formulaire
      resetForm();

      Alert.alert('Succès', WORKOUT_MESSAGES.SUCCESS.WORKOUT_ADDED);
    } catch {
      Alert.alert('Erreur', WORKOUT_MESSAGES.ERRORS.ADD_FAILED);
    }
  };

  return {
    // État du formulaire
    selectedExercise,
    sets,
    reps,
    weight,
    useWeight,

    // Setters
    setSelectedExercise,
    setSets,
    setReps,
    setWeight,
    setUseWeight,

    // Fonctions
    isFormValid,
    resetForm,
    handleSubmit,
  };
};

import React, { useState } from 'react';
import { View, Text, Modal, ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Button from '../Button';
import Input from '../Input';
import { Exercise } from '../../data/exercisesDatabase';
import { COLORS, SPACING } from '../../utils/theme';
import { WORKOUT_MESSAGES } from '../../constants/messages';
import { MuscleGroupBadges } from './MuscleGroupBadges';
import { ExerciseSelectionList } from './ExerciseSelectionList';

interface WorkoutFormModalProps {
  visible: boolean;
  selectedExercise: Exercise | null;
  sets: string;
  reps: string;
  weight: string;
  useWeight: boolean;
  isFormValid: boolean;
  onClose: () => void;
  onExerciseSelect: (exercise: Exercise) => void;
  onSetsChange: (value: string) => void;
  onRepsChange: (value: string) => void;
  onWeightChange: (value: string) => void;
  onUseWeightChange: (value: boolean) => void;
  onSubmit: () => void;
}

type NavigationLevel = 'category' | 'exercise' | 'form';

/**
 * Modal de formulaire pour ajouter un exercice à la séance
 *
 * Gère une navigation à 3 niveaux :
 * 1. Sélection du groupe musculaire (badges)
 * 2. Sélection de l'exercice (liste)
 * 3. Formulaire (séries, reps, poids)
 */
export const WorkoutFormModal: React.FC<WorkoutFormModalProps> = ({
  visible,
  selectedExercise,
  sets,
  reps,
  weight,
  useWeight,
  isFormValid,
  onClose,
  onExerciseSelect,
  onSetsChange,
  onRepsChange,
  onWeightChange,
  onUseWeightChange,
  onSubmit,
}) => {
  // État de navigation
  const [currentLevel, setCurrentLevel] = useState<NavigationLevel>('category');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  /**
   * Réinitialise la navigation quand le modal se ferme/ouvre
   */
  const handleClose = () => {
    setCurrentLevel('category');
    setSelectedGroupId(null);
    onClose();
  };

  /**
   * Navigation vers la liste des exercices d'un groupe
   */
  const handleSelectGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
    setCurrentLevel('exercise');
  };

  /**
   * Navigation vers le formulaire après sélection d'un exercice
   */
  const handleSelectExercise = (exercise: Exercise) => {
    onExerciseSelect(exercise);
    setCurrentLevel('form');
  };

  /**
   * Retour au niveau précédent
   */
  const handleBack = () => {
    if (currentLevel === 'form') {
      setCurrentLevel('exercise');
    } else if (currentLevel === 'exercise') {
      setCurrentLevel('category');
      setSelectedGroupId(null);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="formSheet">
      <View style={styles.container}>
        {/* En-tête du modal */}
        <View style={styles.header}>
          <Text style={styles.title}>{WORKOUT_MESSAGES.LABELS.MODAL_TITLE}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Contenu selon le niveau de navigation */}
        {currentLevel === 'category' && (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <MuscleGroupBadges onSelectGroup={handleSelectGroup} />
          </ScrollView>
        )}

        {currentLevel === 'exercise' && selectedGroupId && (
          <ExerciseSelectionList
            groupId={selectedGroupId}
            onSelectExercise={handleSelectExercise}
            onBack={handleBack}
          />
        )}

        {currentLevel === 'form' && selectedExercise && (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.formContainer}>
              {/* Bouton retour */}
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backIcon}>←</Text>
                <Text style={styles.backText}>Retour</Text>
              </TouchableOpacity>

              {/* Exercice sélectionné */}
              <Text style={styles.selectedExercise}>
                {WORKOUT_MESSAGES.LABELS.EXERCISE_SELECTED} {selectedExercise.name}
              </Text>

              {/* Champs séries et répétitions */}
              <View style={styles.formRow}>
                <Input
                  label={WORKOUT_MESSAGES.FORM.SETS}
                  value={sets}
                  onChangeText={onSetsChange}
                  placeholder={WORKOUT_MESSAGES.FORM.PLACEHOLDER_SETS}
                  keyboardType="numeric"
                  style={styles.formInput}
                />

                <Input
                  label={WORKOUT_MESSAGES.FORM.REPS}
                  value={reps}
                  onChangeText={onRepsChange}
                  placeholder={WORKOUT_MESSAGES.FORM.PLACEHOLDER_REPS}
                  keyboardType="numeric"
                  style={styles.formInput}
                />
              </View>

              {/* Switch pour activer/désactiver le poids */}
              <View style={styles.weightToggle}>
                <Text style={styles.weightToggleLabel}>
                  {WORKOUT_MESSAGES.LABELS.WITH_WEIGHT}
                </Text>
                <Switch
                  value={useWeight}
                  onValueChange={onUseWeightChange}
                  trackColor={{ false: COLORS.border, true: COLORS.primary }}
                  thumbColor={useWeight ? '#fff' : '#f4f3f4'}
                />
              </View>

              {/* Champ poids (conditionnel) */}
              {useWeight && (
                <Input
                  label={WORKOUT_MESSAGES.FORM.WEIGHT}
                  value={weight}
                  onChangeText={onWeightChange}
                  placeholder={WORKOUT_MESSAGES.FORM.PLACEHOLDER_WEIGHT}
                  keyboardType="numeric"
                />
              )}

              {/* Bouton de soumission */}
              <Button
                title={WORKOUT_MESSAGES.LABELS.SUBMIT}
                onPress={onSubmit}
                style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
                disabled={!isFormValid}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  closeIcon: {
    fontSize: 24,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: SPACING.md,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.primary,
    marginRight: SPACING.xs,
  },
  backText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  selectedExercise: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
  },
  formRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  formInput: {
    flex: 1,
  },
  weightToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  weightToggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  submitButton: {
    marginTop: SPACING.lg,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
});

import React, { useState } from 'react';
import { View, Text, Modal, ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Button from '../Button';
import Input from '../Input';
import { Exercise } from '../../data/exercisesDatabase';
import { SPACING } from '../../utils/theme';
import { useTheme } from '../../contexts/ThemeContext';
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
  const { colors } = useTheme();
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
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* En-tête du modal */}
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>{WORKOUT_MESSAGES.LABELS.MODAL_TITLE}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={[styles.closeIcon, { color: colors.textSecondary }]}>✕</Text>
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
                <Text style={[styles.backIcon, { color: colors.primary }]}>←</Text>
                <Text style={[styles.backText, { color: colors.primary }]}>Retour</Text>
              </TouchableOpacity>

              {/* Exercice sélectionné */}
              <Text style={[styles.selectedExercise, { color: colors.primary, backgroundColor: colors.surface }]}>
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
              <View style={[styles.weightToggle, { backgroundColor: colors.surface }]}>
                <Text style={[styles.weightToggleLabel, { color: colors.text }]}>
                  {WORKOUT_MESSAGES.LABELS.WITH_WEIGHT}
                </Text>
                <Switch
                  value={useWeight}
                  onValueChange={onUseWeightChange}
                  trackColor={{ false: colors.border, true: colors.primary }}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: SPACING.xs,
  },
  closeIcon: {
    fontSize: 24,
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
    marginRight: SPACING.xs,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedExercise: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.lg,
    textAlign: 'center',
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
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  weightToggleLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    marginTop: SPACING.lg,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
});

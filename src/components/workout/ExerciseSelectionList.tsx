import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {
  Exercise,
  getExercisesByGroup,
  getMuscleGroupById,
} from '../../data/exercisesDatabase';
import { COLORS, SPACING } from '../../utils/theme';

interface ExerciseSelectionListProps {
  groupId: string;
  onSelectExercise: (exercise: Exercise) => void;
  onBack: () => void;
}

/**
 * Composant affichant la liste des exercices d'un groupe musculaire
 *
 * Niveau 2 de la navigation : affiche tous les exercices du groupe sélectionné
 */
export const ExerciseSelectionList: React.FC<ExerciseSelectionListProps> = ({
  groupId,
  onSelectExercise,
  onBack,
}) => {
  const exercises = getExercisesByGroup(groupId);
  const group = getMuscleGroupById(groupId);

  if (!group) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header avec bouton retour */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerIcon}>{group.icon}</Text>
          <Text style={styles.headerTitle}>{group.name.toUpperCase()}</Text>
          <Text style={styles.headerSubtitle}>Choisir un exercice</Text>
        </View>
      </View>

      {/* Liste des exercices */}
      <ScrollView style={styles.exercisesList} showsVerticalScrollIndicator={false}>
        {exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={styles.exerciseButton}
            onPress={() => onSelectExercise(exercise)}
            activeOpacity={0.7}
          >
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            {exercise.equipment && (
              <Text style={styles.exerciseEquipment}>
                {getEquipmentLabel(exercise.equipment)}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

/**
 * Convertit le code d'équipement en label lisible
 */
const getEquipmentLabel = (equipment: string): string => {
  const labels: Record<string, string> = {
    barre: 'Barre',
    halteres: 'Haltères',
    poulie: 'Poulie',
    machine: 'Machine',
    poids_corps: 'Poids de corps',
    materiel: 'Matériel',
  };
  return labels[equipment] || equipment;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
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
  headerContent: {
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  exercisesList: {
    flex: 1,
    padding: SPACING.md,
  },
  exerciseButton: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  exerciseEquipment: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
});

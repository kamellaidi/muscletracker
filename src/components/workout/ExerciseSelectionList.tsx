import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {
  Exercise,
  getExercisesByGroup,
  getMuscleGroupById,
} from '../../data/exercisesDatabase';
import { SPACING } from '../../utils/theme';
import { useTheme } from '../../contexts/ThemeContext';

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
  const { colors } = useTheme();
  const exercises = getExercisesByGroup(groupId);
  const group = getMuscleGroupById(groupId);

  if (!group) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header avec bouton retour */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={[styles.backIcon, { color: colors.primary }]}>←</Text>
          <Text style={[styles.backText, { color: colors.primary }]}>Retour</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerIcon}>{group.icon}</Text>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{group.name.toUpperCase()}</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Choisir un exercice</Text>
        </View>
      </View>

      {/* Liste des exercices */}
      <ScrollView style={styles.exercisesList} showsVerticalScrollIndicator={false}>
        {exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={[styles.exerciseButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => onSelectExercise(exercise)}
            activeOpacity={0.7}
          >
            <Text style={[styles.exerciseName, { color: colors.text }]}>{exercise.name}</Text>
            {exercise.equipment && (
              <Text style={[styles.exerciseEquipment, { color: colors.textSecondary }]}>
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
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  backIcon: {
    fontSize: 24,
    marginRight: SPACING.xs,
  },
  backText: {
    fontSize: 16,
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
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: SPACING.xs,
  },
  exercisesList: {
    flex: 1,
    padding: SPACING.md,
  },
  exerciseButton: {
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  exerciseEquipment: {
    fontSize: 13,
    fontStyle: 'italic',
  },
});

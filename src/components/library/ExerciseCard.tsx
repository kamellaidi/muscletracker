import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Exercise, getMuscleGroupById } from '../../data/exercisesDatabase';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../utils/theme';

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
}

/**
 * Carte d'exercice moderne pour la bibliothèque
 *
 * Design épuré avec :
 * - Badge coloré du groupe musculaire
 * - Nom de l'exercice en gras
 * - Type d'équipement en sous-titre
 * - Ombre subtile pour la profondeur
 */
export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onPress }) => {
  const group = getMuscleGroupById(getGroupId(exercise.group));
  const equipmentLabel = getEquipmentLabel(exercise.equipment);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Badge du groupe musculaire */}
        {group && (
          <View style={[styles.groupBadge, { backgroundColor: group.color }]}>
            <Text style={styles.groupIcon}>{group.icon}</Text>
            <Text style={styles.groupName}>{group.name}</Text>
          </View>
        )}

        {/* Nom de l'exercice */}
        <Text style={styles.exerciseName}>{exercise.name}</Text>

        {/* Équipement */}
        {equipmentLabel && (
          <View style={styles.equipmentContainer}>
            <Text style={styles.equipmentIcon}>🏋️</Text>
            <Text style={styles.equipmentText}>{equipmentLabel}</Text>
          </View>
        )}
      </View>

      {/* Flèche pour indiquer qu'on peut cliquer */}
      <View style={styles.arrow}>
        <Text style={styles.arrowText}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Convertit le nom du groupe en ID
 */
const getGroupId = (groupName: string): string => {
  const mapping: Record<string, string> = {
    'Épaules': 'epaules',
    'Pectoraux': 'pectoraux',
    'Dos': 'dos',
    'Biceps': 'biceps',
    'Triceps': 'triceps',
    'Abdominaux': 'abdominaux',
    'Quadriceps': 'quadriceps',
    'Ischio-jambiers': 'ischios',
    'Fessiers': 'fessiers',
    'Mollets': 'mollets',
  };
  return mapping[groupName] || 'epaules';
};

/**
 * Convertit le code d'équipement en label français
 */
const getEquipmentLabel = (equipment?: string): string | null => {
  if (!equipment) return null;

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
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  content: {
    flex: 1,
  },
  groupBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.sm,
  },
  groupIcon: {
    fontSize: 14,
    marginRight: SPACING.xxs,
  },
  groupName: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textInverse,
  },
  exerciseName: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.sizes.lg * TYPOGRAPHY.lineHeights.tight,
  },
  equipmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipmentIcon: {
    fontSize: 14,
    marginRight: SPACING.xs,
  },
  equipmentText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
  },
  arrow: {
    justifyContent: 'center',
    marginLeft: SPACING.sm,
  },
  arrowText: {
    fontSize: 28,
    color: COLORS.textTertiary,
    fontWeight: TYPOGRAPHY.weights.regular,
  },
});

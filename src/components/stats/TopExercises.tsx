import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../utils/theme';

interface ExerciseStat {
  name: string;
  count: number;
  percentage: number;
}

interface TopExercisesProps {
  exercises: ExerciseStat[];
}

/**
 * Composant affichant le top 5 des exercices les plus pratiqués
 */
export const TopExercises: React.FC<TopExercisesProps> = ({ exercises }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Top Exercices</Text>
      <View style={styles.card}>
        {exercises.slice(0, 5).map((exercise, index) => (
          <View key={exercise.name} style={styles.exerciseRow}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{index + 1}</Text>
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <View style={styles.progressBarContainer}>
                <View
                  style={[styles.progressBar, { width: `${exercise.percentage}%` }]}
                />
              </View>
            </View>
            <Text style={styles.exerciseCount}>{exercise.count}×</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  rankText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textInverse,
  },
  exerciseInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  exerciseName: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xxs,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: COLORS.divider,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
  },
  exerciseCount: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
});

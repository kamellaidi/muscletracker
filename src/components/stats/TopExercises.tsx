import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../utils/theme';

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
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Top Exercices</Text>
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        {exercises.slice(0, 5).map((exercise, index) => (
          <View key={exercise.name} style={styles.exerciseRow}>
            <View style={[styles.rankBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.rankText, { color: colors.textInverse }]}>{index + 1}</Text>
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={[styles.exerciseName, { color: colors.text }]}>{exercise.name}</Text>
              <View style={[styles.progressBarContainer, { backgroundColor: colors.divider }]}>
                <View
                  style={[styles.progressBar, { width: `${exercise.percentage}%`, backgroundColor: colors.primary }]}
                />
              </View>
            </View>
            <Text style={[styles.exerciseCount, { color: colors.textSecondary }]}>{exercise.count}×</Text>
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
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  rankText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  exerciseInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  exerciseName: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginBottom: SPACING.xxs,
  },
  progressBarContainer: {
    height: 6,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: RADIUS.full,
  },
  exerciseCount: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
});

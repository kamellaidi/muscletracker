import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WorkoutEntry } from '../../types';
import { SPACING } from '../../utils/theme';
import { useTheme } from '../../contexts/ThemeContext';
import { WORKOUT_MESSAGES } from '../../constants/messages';

interface WorkoutListProps {
  workouts: WorkoutEntry[];
}

/**
 * Composant affichant la liste des exercices d'une séance
 *
 * Affiche chaque exercice avec ses détails (séries, reps, poids, volume)
 * ou un état vide si aucun exercice
 */
export const WorkoutList: React.FC<WorkoutListProps> = ({ workouts }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        {WORKOUT_MESSAGES.LABELS.EXERCISES_COUNT} ({workouts.length})
      </Text>

      {workouts.length === 0 ? (
        <View style={[styles.emptyState, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={styles.emptyIcon}>💪</Text>
          <Text style={[styles.emptyText, { color: colors.text }]}>{WORKOUT_MESSAGES.LABELS.NO_EXERCISES}</Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            {WORKOUT_MESSAGES.LABELS.NO_EXERCISES_SUBTITLE}
          </Text>
        </View>
      ) : (
        workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))
      )}
    </View>
  );
};

/**
 * Composant représentant une carte d'exercice individuelle
 */
const WorkoutCard: React.FC<{ workout: WorkoutEntry }> = ({ workout }) => {
  const { colors } = useTheme();
  // Calcul du volume total (séries × reps × poids)
  const totalVolume =
    workout.weight > 0 ? (workout.sets * workout.reps * workout.weight).toFixed(0) : null;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.exerciseName, { color: colors.text }]}>{workout.exerciseName}</Text>
      <Text style={[styles.details, { color: colors.textSecondary }]}>
        {workout.sets} série{workout.sets > 1 ? 's' : ''} × {workout.reps} rép
        {workout.weight > 0 ? ` × ${workout.weight}kg` : ' (poids de corps)'}
      </Text>
      {totalVolume && (
        <Text style={[styles.volume, { color: colors.primary }]}>Volume: {totalVolume}kg</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xl * 2,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
  },
  card: {
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  details: {
    fontSize: 14,
    marginBottom: SPACING.xs,
  },
  volume: {
    fontSize: 12,
    fontWeight: '500',
  },
});

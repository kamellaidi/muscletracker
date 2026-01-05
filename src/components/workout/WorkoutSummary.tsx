import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WorkoutEntry } from '../../types';
import { COLORS, SPACING } from '../../utils/theme';
import { WORKOUT_MESSAGES } from '../../constants/messages';

interface WorkoutSummaryProps {
  workouts: WorkoutEntry[];
}

/**
 * Composant affichant un résumé statistique de la séance
 *
 * Calcule et affiche le nombre total d'exercices, de séries et de répétitions
 */
export const WorkoutSummary: React.FC<WorkoutSummaryProps> = ({ workouts }) => {
  /**
   * Calcule les statistiques de la séance de manière mémorisée
   * pour éviter les recalculs inutiles
   */
  const stats = useMemo(() => {
    const totalSets = workouts.reduce((total, w) => total + w.sets, 0);
    const totalReps = workouts.reduce((total, w) => total + w.sets * w.reps, 0);

    return {
      exerciseCount: workouts.length,
      totalSets,
      totalReps,
    };
  }, [workouts]);

  // Ne pas afficher le composant si aucun exercice
  if (workouts.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{WORKOUT_MESSAGES.LABELS.SUMMARY_TITLE}</Text>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.number}>{stats.exerciseCount}</Text>
          <Text style={styles.label}>{WORKOUT_MESSAGES.SUMMARY.EXERCISES}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.number}>{stats.totalSets}</Text>
          <Text style={styles.label}>{WORKOUT_MESSAGES.SUMMARY.SETS}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.number}>{stats.totalReps}</Text>
          <Text style={styles.label}>{WORKOUT_MESSAGES.SUMMARY.REPS}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    alignItems: 'center',
  },
  number: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
});

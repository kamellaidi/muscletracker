import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../utils/theme';
import { useTheme } from '../../contexts/ThemeContext';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

/**
 * Carte de statistique rapide
 */
const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.statCard, { borderLeftColor: color, borderLeftWidth: 4, backgroundColor: colors.surface }]}>
      <Text style={styles.statIcon}>{icon}</Text>
      <View style={styles.statContent}>
        <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
      </View>
    </View>
  );
};

interface QuickStatsProps {
  workoutsThisWeek: number;
  totalExercises: number;
  currentStreak: number;
}

/**
 * Section de statistiques rapides pour le dashboard
 */
export const QuickStats: React.FC<QuickStatsProps> = ({
  workoutsThisWeek,
  totalExercises,
  currentStreak,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Cette semaine</Text>
      <View style={styles.statsGrid}>
        <StatCard
          icon="💪"
          value={workoutsThisWeek}
          label="Séances"
          color={colors.primary}
        />
        <StatCard
          icon="🏋️"
          value={totalExercises}
          label="Exercices"
          color={colors.secondary}
        />
        <StatCard
          icon="🔥"
          value={`${currentStreak}j`}
          label="Série"
          color={colors.warning}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    ...SHADOWS.sm,
  },
  statIcon: {
    fontSize: 28,
    marginRight: SPACING.sm,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    lineHeight: TYPOGRAPHY.sizes.xxl * TYPOGRAPHY.lineHeights.tight,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

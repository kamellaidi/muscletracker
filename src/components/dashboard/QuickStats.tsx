import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../utils/theme';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

/**
 * Carte de statistique rapide
 */
const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => (
  <View style={[styles.statCard, { borderLeftColor: color, borderLeftWidth: 4 }]}>
    <Text style={styles.statIcon}>{icon}</Text>
    <View style={styles.statContent}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

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
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Cette semaine</Text>
      <View style={styles.statsGrid}>
        <StatCard
          icon="💪"
          value={workoutsThisWeek}
          label="Séances"
          color={COLORS.primary}
        />
        <StatCard
          icon="🏋️"
          value={totalExercises}
          label="Exercices"
          color={COLORS.secondary}
        />
        <StatCard
          icon="🔥"
          value={`${currentStreak}j`}
          label="Série"
          color={COLORS.warning}
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
    color: COLORS.textSecondary,
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
    backgroundColor: COLORS.surface,
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
    color: COLORS.text,
    lineHeight: TYPOGRAPHY.sizes.xxl * TYPOGRAPHY.lineHeights.tight,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

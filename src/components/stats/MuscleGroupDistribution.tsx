import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../utils/theme';
import { getMuscleGroupById } from '../../data/exercisesDatabase';

interface MuscleGroupStat {
  groupId: string;
  count: number;
  percentage: number;
}

interface MuscleGroupDistributionProps {
  distribution: MuscleGroupStat[];
}

/**
 * Composant affichant la répartition par groupe musculaire
 */
export const MuscleGroupDistribution: React.FC<MuscleGroupDistributionProps> = ({
  distribution,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Répartition par Groupe</Text>
      <View style={styles.card}>
        {distribution.map((stat) => {
          const group = getMuscleGroupById(stat.groupId);
          if (!group) return null;

          return (
            <View key={stat.groupId} style={styles.groupRow}>
              <View style={[styles.colorDot, { backgroundColor: group.color }]} />
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>
                  {group.icon} {group.name}
                </Text>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: `${stat.percentage}%`, backgroundColor: group.color },
                    ]}
                  />
                </View>
              </View>
              <Text style={styles.percentage}>{stat.percentage.toFixed(0)}%</Text>
            </View>
          );
        })}
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
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
  },
  groupInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  groupName: {
    fontSize: TYPOGRAPHY.sizes.sm,
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
    borderRadius: RADIUS.full,
  },
  percentage: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
    minWidth: 40,
    textAlign: 'right',
  },
});

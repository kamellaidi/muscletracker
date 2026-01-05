import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../utils/theme';
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
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Répartition par Groupe</Text>
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        {distribution.map((stat) => {
          const group = getMuscleGroupById(stat.groupId);
          if (!group) return null;

          return (
            <View key={stat.groupId} style={styles.groupRow}>
              <View style={[styles.colorDot, { backgroundColor: group.color }]} />
              <View style={styles.groupInfo}>
                <Text style={[styles.groupName, { color: colors.text }]}>
                  {group.icon} {group.name}
                </Text>
                <View style={[styles.progressBarContainer, { backgroundColor: colors.divider }]}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: `${stat.percentage}%`, backgroundColor: group.color },
                    ]}
                  />
                </View>
              </View>
              <Text style={[styles.percentage, { color: colors.textSecondary }]}>{stat.percentage.toFixed(0)}%</Text>
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
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
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
  percentage: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    minWidth: 40,
    textAlign: 'right',
  },
});

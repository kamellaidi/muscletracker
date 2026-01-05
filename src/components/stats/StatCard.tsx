import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../utils/theme';
import { useTheme } from '../../contexts/ThemeContext';

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  color?: string;
}

/**
 * Carte de statistique avec design moderne
 *
 * Affiche une stat avec :
 * - Icône
 * - Valeur grande
 * - Label
 * - Tendance optionnelle (↗ ou ↘)
 */
export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  trend,
  color,
}) => {
  const { colors } = useTheme();
  const iconColor = color || colors.primary;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
        {trend && (
          <View style={styles.trendContainer}>
            <Text style={[styles.trendIcon, { color: trend.positive ? colors.success : colors.error }]}>
              {trend.positive ? '↗' : '↘'}
            </Text>
            <Text style={[styles.trendText, { color: trend.positive ? colors.success : colors.error }]}>
              {trend.value}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  value: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.extrabold,
    lineHeight: TYPOGRAPHY.sizes.xxl * TYPOGRAPHY.lineHeights.tight,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.sm,
    marginTop: SPACING.xxs,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  trendIcon: {
    fontSize: 16,
    marginRight: SPACING.xxs,
  },
  trendText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
});

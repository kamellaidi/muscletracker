import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../utils/theme';

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
  color = COLORS.primary,
}) => {
  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
        {trend && (
          <View style={styles.trendContainer}>
            <Text style={[styles.trendIcon, trend.positive ? styles.trendUp : styles.trendDown]}>
              {trend.positive ? '↗' : '↘'}
            </Text>
            <Text style={[styles.trendText, trend.positive ? styles.trendUp : styles.trendDown]}>
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
    backgroundColor: COLORS.surface,
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
    color: COLORS.text,
    lineHeight: TYPOGRAPHY.sizes.xxl * TYPOGRAPHY.lineHeights.tight,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
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
  trendUp: {
    color: COLORS.success,
  },
  trendDown: {
    color: COLORS.error,
  },
});

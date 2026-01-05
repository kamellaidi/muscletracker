import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../utils/theme';

interface DashboardCardProps {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  onPress: () => void;
}

/**
 * Carte interactive pour le dashboard
 *
 * Design moderne avec :
 * - Dégradé de couleur
 * - Icône grande taille
 * - Ombre prononcée
 * - Coins très arrondis
 * - Animation au toucher
 */
export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  icon,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderRadius: RADIUS.xxl,
    marginBottom: SPACING.md,
    ...SHADOWS.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 48,
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textInverse,
    marginBottom: SPACING.xxs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textInverse,
    opacity: 0.9,
  },
  arrowContainer: {
    marginLeft: SPACING.sm,
  },
  arrow: {
    fontSize: 36,
    color: COLORS.textInverse,
    fontWeight: TYPOGRAPHY.weights.regular,
  },
});

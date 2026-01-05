import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../utils/theme';
import { useTheme } from '../../contexts/ThemeContext';

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
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.textInverse }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: colors.textInverse }]}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={[styles.arrow, { color: colors.textInverse }]}>›</Text>
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
    marginBottom: SPACING.xxs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    opacity: 0.9,
  },
  arrowContainer: {
    marginLeft: SPACING.sm,
  },
  arrow: {
    fontSize: 36,
    fontWeight: TYPOGRAPHY.weights.regular,
  },
});

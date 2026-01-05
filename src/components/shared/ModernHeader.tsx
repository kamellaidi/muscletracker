import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from '../../utils/theme';

interface ModernHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  gradient?: boolean;
}

/**
 * En-tête moderne sans trait noir
 *
 * Design tendance 2026 :
 * - Pas de bordure/trait noir
 * - Fond dégradé optionnel
 * - Icône optionnelle à gauche
 * - Subtitle optionnel
 * - Padding généreux
 * - Coins arrondis en bas
 */
export const ModernHeader: React.FC<ModernHeaderProps> = ({
  title,
  subtitle,
  icon,
  gradient = false,
}) => {
  return (
    <View style={[styles.container, gradient && styles.gradientBg]}>
      <View style={styles.content}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: RADIUS.xxl,
    borderBottomRightRadius: RADIUS.xxl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  gradientBg: {
    backgroundColor: COLORS.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: COLORS.text,
    lineHeight: TYPOGRAPHY.sizes.xxl * TYPOGRAPHY.lineHeights.tight,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xxs,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

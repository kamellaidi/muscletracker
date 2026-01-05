import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from '../../utils/theme';

/**
 * Composant de toggle pour basculer entre mode clair et sombre
 *
 * Design moderne avec :
 * - Animation fluide
 * - Icônes soleil/lune
 * - Indication visuelle claire du mode actuel
 */
export const ThemeToggle: React.FC = () => {
  const { colorScheme, toggleTheme, colors } = useTheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{isDark ? '🌙' : '☀️'}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>Mode sombre</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {isDark ? 'Activé' : 'Désactivé'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.switch,
          { backgroundColor: isDark ? colors.primary : colors.border },
        ]}
        onPress={toggleTheme}
        activeOpacity={0.7}
      >
        <Animated.View
          style={[
            styles.switchThumb,
            {
              backgroundColor: colors.surface,
              transform: [{ translateX: isDark ? 24 : 2 }],
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginBottom: SPACING.xxs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  switch: {
    width: 52,
    height: 28,
    borderRadius: RADIUS.full,
    padding: 2,
    justifyContent: 'center',
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.full,
    ...SHADOWS.sm,
  },
});

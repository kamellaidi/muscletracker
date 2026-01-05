import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MUSCLE_GROUPS, ExerciseCategory } from '../../data/exercisesDatabase';
import { SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../utils/theme';
import { useTheme } from '../../contexts/ThemeContext';

interface MuscleGroupBadgesProps {
  onSelectGroup: (groupId: string) => void;
}

/**
 * Composant affichant les badges de sélection de groupes musculaires
 *
 * Niveau 1 de la navigation : affiche une grille de badges colorés
 * pour chaque groupe musculaire
 *
 * Design moderne 2026 :
 * - Badges très arrondis (borderRadius 20)
 * - Ombres prononcées pour effet "incrusté"
 * - Icônes grandes et centrées
 * - Animation au toucher
 */
export const MuscleGroupBadges: React.FC<MuscleGroupBadgesProps> = ({ onSelectGroup }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textSecondary }]}>Choisir un groupe musculaire</Text>
      <View style={styles.grid}>
        {MUSCLE_GROUPS.map((group) => (
          <MuscleGroupBadge
            key={group.id}
            group={group}
            onPress={() => onSelectGroup(group.id)}
          />
        ))}
      </View>
    </View>
  );
};

/**
 * Badge individuel pour un groupe musculaire
 */
const MuscleGroupBadge: React.FC<{
  group: ExerciseCategory;
  onPress: () => void;
}> = ({ group, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.badge, { backgroundColor: group.color }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.badgeIcon}>{group.icon}</Text>
      <Text style={styles.badgeName}>{group.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginBottom: SPACING.lg,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'space-between',
  },
  badge: {
    width: '48%',
    aspectRatio: 1.5,
    borderRadius: RADIUS.xxl, // Très arrondi (24px)
    padding: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.lg, // Ombre prononcée
  },
  badgeIcon: {
    fontSize: 48, // Icône plus grande
    marginBottom: SPACING.sm,
  },
  badgeName: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: '#FFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});

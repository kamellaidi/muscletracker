import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MUSCLE_GROUPS, ExerciseCategory } from '../../data/exercisesDatabase';
import { SPACING } from '../../utils/theme';

interface MuscleGroupBadgesProps {
  onSelectGroup: (groupId: string) => void;
}

/**
 * Composant affichant les badges de sélection de groupes musculaires
 *
 * Niveau 1 de la navigation : affiche une grille de badges colorés
 * pour chaque groupe musculaire
 */
export const MuscleGroupBadges: React.FC<MuscleGroupBadgesProps> = ({ onSelectGroup }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisir un groupe musculaire</Text>
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
      activeOpacity={0.8}
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
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: SPACING.lg,
    textAlign: 'center',
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
    borderRadius: 12,
    padding: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeIcon: {
    fontSize: 40,
    marginBottom: SPACING.xs,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

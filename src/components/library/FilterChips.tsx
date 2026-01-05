import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MUSCLE_GROUPS } from '../../data/exercisesDatabase';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, SHADOWS } from '../../utils/theme';

interface FilterChipsProps {
  selectedGroupId: string | null;
  onSelectGroup: (groupId: string | null) => void;
}

/**
 * Chips de filtrage par groupe musculaire
 *
 * Design horizontal scrollable avec :
 * - Chip "Tous" pour réinitialiser le filtre
 * - Un chip par groupe musculaire avec emoji et couleur
 * - État actif/inactif visuellement distinct
 */
export const FilterChips: React.FC<FilterChipsProps> = ({
  selectedGroupId,
  onSelectGroup,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* Chip "Tous" */}
      <FilterChip
        id={null}
        label="Tous"
        icon="📚"
        color={COLORS.textSecondary}
        selected={selectedGroupId === null}
        onPress={() => onSelectGroup(null)}
      />

      {/* Chips des groupes */}
      {MUSCLE_GROUPS.map((group) => (
        <FilterChip
          key={group.id}
          id={group.id}
          label={group.name}
          icon={group.icon}
          color={group.color}
          selected={selectedGroupId === group.id}
          onPress={() => onSelectGroup(group.id)}
        />
      ))}
    </ScrollView>
  );
};

/**
 * Chip individuel de filtre
 */
const FilterChip: React.FC<{
  id: string | null;
  label: string;
  icon: string;
  color: string;
  selected: boolean;
  onPress: () => void;
}> = ({ label, icon, color, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected && styles.chipSelected,
        selected && { backgroundColor: color },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.chipIcon}>{icon}</Text>
      <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
    ...SHADOWS.sm,
  },
  chipSelected: {
    borderColor: 'transparent',
    ...SHADOWS.md,
  },
  chipIcon: {
    fontSize: 16,
    marginRight: SPACING.xs,
  },
  chipLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
  },
  chipLabelSelected: {
    color: COLORS.textInverse,
  },
});

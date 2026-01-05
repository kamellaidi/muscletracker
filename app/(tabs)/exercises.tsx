import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS, RADIUS } from '../../src/utils/theme';
import { EXERCISES_DATABASE, Exercise, getExercisesByGroup } from '../../src/data/exercisesDatabase';
import { ExerciseCard } from '../../src/components/library/ExerciseCard';
import { ExerciseDetailModal } from '../../src/components/library/ExerciseDetailModal';
import { SearchBar } from '../../src/components/library/SearchBar';
import { FilterChips } from '../../src/components/library/FilterChips';

/**
 * Page Bibliothèque d'exercices
 *
 * Fonctionnalités :
 * - Accès à tous les 140+ exercices de la base de données
 * - Recherche textuelle
 * - Filtrage par groupe musculaire
 * - Affichage des détails complets de chaque exercice
 * - Design moderne et épuré
 */
export default function ExercisesPage() {
  // État de recherche et filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  // État du modal de détails
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  /**
   * Liste filtrée des exercices
   * Combine recherche textuelle et filtre par groupe
   */
  const filteredExercises = useMemo(() => {
    let exercises = EXERCISES_DATABASE;

    // Filtre par groupe
    if (selectedGroupId) {
      exercises = getExercisesByGroup(selectedGroupId);
    }

    // Recherche textuelle
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      exercises = exercises.filter(
        (ex) =>
          ex.name.toLowerCase().includes(query) ||
          ex.group.toLowerCase().includes(query) ||
          ex.equipment?.toLowerCase().includes(query)
      );
    }

    return exercises;
  }, [searchQuery, selectedGroupId]);

  /**
   * Ouvre le modal de détails d'un exercice
   */
  const handleExercisePress = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowDetailModal(true);
  };

  /**
   * Ferme le modal de détails
   */
  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedExercise(null);
  };

  /**
   * Rendu d'une carte d'exercice
   */
  const renderExercise = ({ item }: { item: Exercise }) => (
    <ExerciseCard exercise={item} onPress={() => handleExercisePress(item)} />
  );

  /**
   * Rendu du header (sticky)
   */
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Titre et compteur */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bibliothèque</Text>
        <Text style={styles.subtitle}>
          {filteredExercises.length} exercice{filteredExercises.length > 1 ? 's' : ''}
          {selectedGroupId || searchQuery ? ' trouvé' + (filteredExercises.length > 1 ? 's' : '') : ''}
        </Text>
      </View>

      {/* Barre de recherche */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Rechercher par nom, groupe, équipement..."
      />

      {/* Filtres par groupe */}
      <FilterChips
        selectedGroupId={selectedGroupId}
        onSelectGroup={setSelectedGroupId}
      />
    </View>
  );

  /**
   * Rendu de l'état vide
   */
  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🔍</Text>
      <Text style={styles.emptyTitle}>Aucun exercice trouvé</Text>
      <Text style={styles.emptySubtitle}>
        Essayez de modifier votre recherche ou vos filtres
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal de détails */}
      <ExerciseDetailModal
        visible={showDetailModal}
        exercise={selectedExercise}
        onClose={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  headerContainer: {
    marginBottom: SPACING.lg,
  },
  titleContainer: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xxxl,
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.sizes.xxxl * TYPOGRAPHY.lineHeights.tight,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.sizes.base * TYPOGRAPHY.lineHeights.relaxed,
  },
});

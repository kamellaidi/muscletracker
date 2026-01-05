import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DashboardCard } from '../../src/components/dashboard/DashboardCard';
import { QuickStats } from '../../src/components/dashboard/QuickStats';
import { ModernHeader } from '../../src/components/shared/ModernHeader';
import { useTheme } from '../../src/contexts/ThemeContext';
import StorageService from '../../src/services/StorageService';
import { SPACING, TYPOGRAPHY } from '../../src/utils/theme';

/**
 * Page d'accueil - Dashboard principal
 *
 * Design moderne et interactif avec :
 * - Statistiques rapides de la semaine
 * - Cartes de navigation vers les sections principales
 * - Couleurs vives et énergiques
 * - Badges très arrondis avec ombres prononcées
 * - Police San Francisco / Roboto
 */
export default function HomePage() {
  const router = useRouter();
  const { colors } = useTheme();

  // États pour les statistiques
  const [workoutsThisWeek, setWorkoutsThisWeek] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  /**
   * Calcule les statistiques de la semaine
   */
  const loadStats = useCallback(async () => {
    try {
      // Date d'aujourd'hui
      const today = new Date();

      // Début de la semaine (lundi)
      const startOfWeek = new Date(today);
      const day = today.getDay();
      const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Ajuster au lundi
      startOfWeek.setDate(diff);
      startOfWeek.setHours(0, 0, 0, 0);

      // Récupérer tous les workouts de la semaine
      let workoutsCount = 0;
      let exercisesCount = 0;

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + i);
        const dateISO = currentDate.toISOString().split('T')[0];

        const workouts = await StorageService.getWorkoutsByDate(dateISO);
        if (workouts.length > 0) {
          workoutsCount++;
          exercisesCount += workouts.length;
        }
      }

      // Calculer la série (streak) - jours consécutifs avec au moins 1 workout
      let streak = 0;
      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dateISO = checkDate.toISOString().split('T')[0];

        const workouts = await StorageService.getWorkoutsByDate(dateISO);
        if (workouts.length > 0) {
          streak++;
        } else {
          break; // Arrêter au premier jour sans workout
        }
      }

      setWorkoutsThisWeek(workoutsCount);
      setTotalExercises(exercisesCount);
      setCurrentStreak(streak);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }, []);

  /**
   * Charge les statistiques au montage
   */
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ModernHeader title="Muscle Tracker" subtitle="Suivez vos performances 💪" icon="🏋️" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

        {/* Statistiques rapides */}
        <QuickStats
          workoutsThisWeek={workoutsThisWeek}
          totalExercises={totalExercises}
          currentStreak={currentStreak}
        />

        {/* Section Actions rapides */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Actions rapides</Text>

          <DashboardCard
            icon="🏋️"
            title="Nouvelle séance"
            subtitle="Enregistrer un entraînement"
            color={colors.primary}
            onPress={() => router.push('/workout')}
          />

          <DashboardCard
            icon="📚"
            title="Bibliothèque"
            subtitle="Explorer 140+ exercices"
            color={colors.secondary}
            onPress={() => router.push('/exercises')}
          />

          <DashboardCard
            icon="📊"
            title="Mon Espace"
            subtitle="Voir vos statistiques"
            color={colors.success}
            onPress={() => router.push('/history')}
          />
        </View>

        {/* Section Motivation */}
        <View style={[styles.motivationCard, { backgroundColor: colors.surface, borderLeftColor: colors.success }]}>
          <Text style={styles.motivationIcon}>💪</Text>
          <View style={styles.motivationContent}>
            <Text style={[styles.motivationText, { color: colors.text }]}>
              {currentStreak > 0
                ? `Incroyable ! ${currentStreak} jour${currentStreak > 1 ? 's' : ''} de série !`
                : 'Commencez votre série dès aujourd\'hui !'}
            </Text>
            <Text style={[styles.motivationSubtext, { color: colors.textSecondary }]}>
              {currentStreak > 0
                ? 'Continuez comme ça 🔥'
                : 'Chaque journey commence par un premier pas'}
            </Text>
          </View>
        </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  motivationCard: {
    flexDirection: 'row',
    padding: SPACING.lg,
    borderRadius: 24,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  motivationIcon: {
    fontSize: 40,
    marginRight: SPACING.md,
  },
  motivationContent: {
    flex: 1,
  },
  motivationText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.sizes.lg * TYPOGRAPHY.lineHeights.normal,
  },
  motivationSubtext: {
    fontSize: TYPOGRAPHY.sizes.sm,
    lineHeight: TYPOGRAPHY.sizes.sm * TYPOGRAPHY.lineHeights.relaxed,
  },
});

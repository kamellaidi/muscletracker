import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SPACING, TYPOGRAPHY } from '../../src/utils/theme';
import { ModernHeader } from '../../src/components/shared/ModernHeader';
import { StatCard } from '../../src/components/stats/StatCard';
import { TopExercises } from '../../src/components/stats/TopExercises';
import { MuscleGroupDistribution } from '../../src/components/stats/MuscleGroupDistribution';
import { WorkoutEntry } from '../../src/types';
import { getExerciseById } from '../../src/data/exercisesDatabase';

interface ExerciseStat {
  name: string;
  count: number;
  percentage: number;
}

interface MuscleGroupStat {
  groupId: string;
  count: number;
  percentage: number;
}

export default function MonEspacePage() {
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalVolume: 0,
    totalExercises: 0,
    currentStreak: 0,
    bestStreak: 0,
    avgWorkoutsPerWeek: 0,
  });
  const [topExercises, setTopExercises] = useState<ExerciseStat[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroupStat[]>([]);

  /**
   * Charge toutes les données d'entraînement et calcule les statistiques
   */
  const loadStatistics = useCallback(async () => {
    try {
      // Récupérer toutes les clés de workout_
      const allKeys = await AsyncStorage.getAllKeys();
      const workoutKeys = allKeys.filter((key) => key.startsWith('workout_'));

      if (workoutKeys.length === 0) {
        setStats({
          totalWorkouts: 0,
          totalVolume: 0,
          totalExercises: 0,
          currentStreak: 0,
          bestStreak: 0,
          avgWorkoutsPerWeek: 0,
        });
        setTopExercises([]);
        setMuscleGroups([]);
        return;
      }

      // Charger tous les workouts
      const workoutsData = await AsyncStorage.multiGet(workoutKeys);
      const allEntries: WorkoutEntry[] = [];
      const workoutDates = new Set<string>();

      workoutsData.forEach(([_, value]) => {
        if (value) {
          const entries: WorkoutEntry[] = JSON.parse(value);
          allEntries.push(...entries);
          // Extraire la date de chaque entrée pour compter les jours uniques
          entries.forEach((entry) => workoutDates.add(entry.date.split('T')[0]));
        }
      });

      // 1. Total workouts = nombre de jours d'entraînement uniques
      const totalWorkouts = workoutDates.size;

      // 2. Total volume = somme de (sets × reps × weight)
      const totalVolume = allEntries.reduce(
        (sum, entry) => sum + entry.sets * entry.reps * entry.weight,
        0
      );

      // 3. Total exercices uniques
      const uniqueExercises = new Set(allEntries.map((e) => e.exerciseId));
      const totalExercises = uniqueExercises.size;

      // 4. Calculer les streaks (séquences de jours consécutifs)
      const sortedDates = Array.from(workoutDates).sort();
      let currentStreak = 0;
      let bestStreak = 0;
      let tempStreak = 1;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString().split('T')[0];

      // Current streak (depuis aujourd'hui en arrière)
      let checkDate = new Date(today);
      let foundGap = false;
      for (let i = 0; i < 365; i++) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (workoutDates.has(dateStr)) {
          if (!foundGap) currentStreak++;
        } else if (dateStr !== todayStr) {
          foundGap = true;
        }
        checkDate.setDate(checkDate.getDate() - 1);
      }

      // Best streak (meilleure séquence historique)
      for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = new Date(sortedDates[i - 1]);
        const currDate = new Date(sortedDates[i]);
        const diffDays = Math.floor(
          (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
          tempStreak++;
        } else {
          bestStreak = Math.max(bestStreak, tempStreak);
          tempStreak = 1;
        }
      }
      bestStreak = Math.max(bestStreak, tempStreak);

      // 5. Moyenne de workouts par semaine (sur les 12 dernières semaines)
      const twelveWeeksAgo = new Date(today);
      twelveWeeksAgo.setDate(today.getDate() - 84); // 12 semaines = 84 jours
      const recentWorkouts = Array.from(workoutDates).filter(
        (dateStr) => new Date(dateStr) >= twelveWeeksAgo
      );
      const avgWorkoutsPerWeek = recentWorkouts.length > 0
        ? Math.round((recentWorkouts.length / 12) * 10) / 10
        : 0;

      setStats({
        totalWorkouts,
        totalVolume,
        totalExercises,
        currentStreak,
        bestStreak,
        avgWorkoutsPerWeek,
      });

      // 6. Top 5 exercices
      const exerciseCounts = new Map<string, { name: string; count: number }>();
      allEntries.forEach((entry) => {
        const existing = exerciseCounts.get(entry.exerciseId);
        if (existing) {
          existing.count++;
        } else {
          exerciseCounts.set(entry.exerciseId, {
            name: entry.exerciseName,
            count: 1,
          });
        }
      });

      const sortedExercises = Array.from(exerciseCounts.values()).sort(
        (a, b) => b.count - a.count
      );
      const maxCount = sortedExercises[0]?.count || 1;
      const topExercisesData = sortedExercises.slice(0, 5).map((ex) => ({
        name: ex.name,
        count: ex.count,
        percentage: (ex.count / maxCount) * 100,
      }));

      setTopExercises(topExercisesData);

      // 7. Distribution par groupe musculaire
      const groupCounts = new Map<string, number>();
      allEntries.forEach((entry) => {
        const exercise = getExerciseById(entry.exerciseId);
        if (exercise) {
          const current = groupCounts.get(exercise.group) || 0;
          groupCounts.set(exercise.group, current + 1);
        }
      });

      const totalGroupEntries = Array.from(groupCounts.values()).reduce(
        (sum, count) => sum + count,
        0
      );
      const muscleGroupsData = Array.from(groupCounts.entries())
        .map(([groupId, count]) => ({
          groupId,
          count,
          percentage: (count / totalGroupEntries) * 100,
        }))
        .sort((a, b) => b.percentage - a.percentage);

      setMuscleGroups(muscleGroupsData);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  }, []);

  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadStatistics();
    setRefreshing(false);
  }, [loadStatistics]);

  // Calculer la tendance pour certaines stats (exemple simple)
  const getWorkoutTrend = () => {
    if (stats.avgWorkoutsPerWeek >= 3) {
      return { value: '+' + stats.avgWorkoutsPerWeek + '/sem', positive: true };
    }
    return undefined;
  };

  return (
    <View style={styles.container}>
      <ModernHeader title="Mon Espace" subtitle="Vos statistiques d'entraînement" icon="📊" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {stats.totalWorkouts === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💪</Text>
            <Text style={styles.emptyTitle}>Commencez votre parcours !</Text>
            <Text style={styles.emptyText}>
              Vos statistiques apparaîtront ici après votre première séance
            </Text>
          </View>
        ) : (
          <>
            {/* Section: Statistiques générales */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Vue d'ensemble</Text>
              <StatCard
                icon="🏋️"
                value={stats.totalWorkouts}
                label="Séances réalisées"
                trend={getWorkoutTrend()}
                color={COLORS.primary}
              />
              <StatCard
                icon="💪"
                value={stats.totalExercises}
                label="Exercices différents"
                color={COLORS.secondary}
              />
              <StatCard
                icon="⚡"
                value={`${Math.round(stats.totalVolume)}kg`}
                label="Volume total soulevé"
                color={COLORS.success}
              />
              <StatCard
                icon="🔥"
                value={stats.currentStreak}
                label="Série actuelle (jours)"
                color={COLORS.warning}
              />
              {stats.bestStreak > 0 && (
                <StatCard
                  icon="🏆"
                  value={stats.bestStreak}
                  label="Meilleure série (jours)"
                  color={COLORS.info}
                />
              )}
            </View>

            {/* Section: Top exercices */}
            {topExercises.length > 0 && (
              <TopExercises exercises={topExercises} />
            )}

            {/* Section: Distribution par groupe musculaire */}
            {muscleGroups.length > 0 && (
              <MuscleGroupDistribution distribution={muscleGroups} />
            )}

            {/* Section: Insights */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Insights</Text>
              <View style={styles.insightCard}>
                <Text style={styles.insightIcon}>📈</Text>
                <View style={styles.insightContent}>
                  <Text style={styles.insightTitle}>Fréquence d'entraînement</Text>
                  <Text style={styles.insightText}>
                    Vous vous entraînez en moyenne{' '}
                    <Text style={styles.insightBold}>
                      {stats.avgWorkoutsPerWeek} fois par semaine
                    </Text>{' '}
                    ces 3 derniers mois.
                  </Text>
                </View>
              </View>
              {stats.currentStreak >= 7 && (
                <View style={styles.insightCard}>
                  <Text style={styles.insightIcon}>🔥</Text>
                  <View style={styles.insightContent}>
                    <Text style={styles.insightTitle}>Excellente régularité !</Text>
                    <Text style={styles.insightText}>
                      Vous maintenez une série de{' '}
                      <Text style={styles.insightBold}>{stats.currentStreak} jours</Text>.
                      Continuez comme ça !
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  insightIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xxs,
  },
  insightText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.sizes.sm * TYPOGRAPHY.lineHeights.relaxed,
  },
  insightBold: {
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
});

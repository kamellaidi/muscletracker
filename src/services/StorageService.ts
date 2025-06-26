import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise, WorkoutEntry } from '../types';

const STORAGE_KEYS = {
  EXERCISES: '@muscuapp_exercises',
  WORKOUTS: '@muscuapp_workouts',
};

// Exercices par défaut
const DEFAULT_EXERCISES: Exercise[] = [
  { id: '1', name: 'Squat', group: 'Jambes', category: 'strength' },
  { id: '2', name: 'Développé couché', group: 'Pectoraux', category: 'strength' },
  { id: '3', name: 'Traction', group: 'Dos', category: 'strength' },
  { id: '4', name: 'Curl biceps', group: 'Biceps', category: 'strength' },
  { id: '5', name: 'Extensions triceps', group: 'Triceps', category: 'strength' },
  { id: '6', name: 'Tapis de course', group: 'Cardio', category: 'cardio' },
];

class StorageService {
  // ===== EXERCISES =====
  async getExercises(): Promise<Exercise[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.EXERCISES);
      if (data) {
        return JSON.parse(data);
      }
      
      // Premier lancement : initialiser avec exercices par défaut
      await this.saveExercises(DEFAULT_EXERCISES);
      return DEFAULT_EXERCISES;
    } catch (error) {
      console.error('Error getting exercises:', error);
      return DEFAULT_EXERCISES;
    }
  }

  async saveExercises(exercises: Exercise[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.EXERCISES, JSON.stringify(exercises));
    } catch (error) {
      console.error('Error saving exercises:', error);
    }
  }

  async addExercise(exercise: Omit<Exercise, 'id'>): Promise<Exercise> {
    try {
      const exercises = await this.getExercises();
      const newExercise: Exercise = {
        id: Date.now().toString(),
        ...exercise,
      };
      
      exercises.push(newExercise);
      await this.saveExercises(exercises);
      return newExercise;
    } catch (error) {
      console.error('Error adding exercise:', error);
      throw error;
    }
  }

  // ===== WORKOUTS =====
  async getWorkouts(): Promise<WorkoutEntry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.WORKOUTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting workouts:', error);
      return [];
    }
  }

  async saveWorkouts(workouts: WorkoutEntry[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(workouts));
    } catch (error) {
      console.error('Error saving workouts:', error);
    }
  }

  async addWorkout(workout: Omit<WorkoutEntry, 'id'>): Promise<WorkoutEntry> {
    try {
      const workouts = await this.getWorkouts();
      const newWorkout: WorkoutEntry = {
        id: Date.now().toString(),
        ...workout,
      };
      
      workouts.push(newWorkout);
      await this.saveWorkouts(workouts);
      return newWorkout;
    } catch (error) {
      console.error('Error adding workout:', error);
      throw error;
    }
  }

  async getWorkoutsByDate(date: string): Promise<WorkoutEntry[]> {
    try {
      const allWorkouts = await this.getWorkouts();
      return allWorkouts.filter(workout => workout.date === date);
    } catch (error) {
      console.error('Error getting workouts by date:', error);
      return [];
    }
  }
}

export default new StorageService();
export interface Exercise {
  id: string;
  name: string;
  group: string;
  category: 'strength' | 'cardio';
}

export interface WorkoutEntry {
  id: string;
  date: string;
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}
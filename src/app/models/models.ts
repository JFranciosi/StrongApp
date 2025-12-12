export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  weightKg?: number;
  reps: number;
  sets: number;
}

export interface WorkoutExercise {
  exerciseId: number;
  sets: number;
  reps: number;
  restSeconds: number; // Rest time in seconds
  notes?: string;
}

export interface Workout {
  id: number;
  name: string;
  exercises: WorkoutExercise[];
  createdAt: Date;
  notes?: string;
}
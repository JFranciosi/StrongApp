export interface Exercise {
  id: number;
  name: string;
  weightKg?: number;
  reps: number;
  sets: number;
}

export interface WorkoutExercise {
  exerciseId: number;
  sets: number;
  reps: number;
  restSeconds: number;
}

export interface Workout {
  id: number;
  name: string;
  exercises: WorkoutExercise[];
  createdAt: Date;
  date?: string;
}
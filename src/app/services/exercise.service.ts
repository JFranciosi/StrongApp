import { Injectable, signal } from '@angular/core';
import { Exercise } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    private exercisesSignal = signal<Exercise[]>([
        { id: 1, name: 'Panca piana', muscleGroup: 'Parta Alta', sets: 3, reps: 8, weightKg: 50 },
        { id: 2, name: 'Lat machine', muscleGroup: 'Parta Alta', sets: 3, reps: 10, weightKg: 40 },
        { id: 3, name: 'Squat', muscleGroup: 'Gambe', sets: 4, reps: 8, weightKg: 60 }
    ]);

    readonly exercises = this.exercisesSignal.asReadonly();

    getExercise(id: number): Exercise | undefined {
        return this.exercisesSignal().find(e => e.id === id);
    }

    addExercise(exercise: Exercise) {
        this.exercisesSignal.update(list => [...list, exercise]);
    }

    updateExercise(updatedExercise: Exercise) {
        this.exercisesSignal.update(list =>
            list.map(ex => ex.id === updatedExercise.id ? updatedExercise : ex)
        );
    }

    deleteExercise(id: number) {
        this.exercisesSignal.update(list => list.filter(e => e.id !== id));
    }
}

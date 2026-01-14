import { Injectable, signal } from '@angular/core';
import { Exercise } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    private exercisesSignal = signal<Exercise[]>(this.loadExercises());

    readonly exercises = this.exercisesSignal.asReadonly();

    private loadExercises(): Exercise[] {
        const saved = localStorage.getItem('exercises');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Panca piana', sets: 3, reps: 8, weightKg: 50 },
            { id: 2, name: 'Lat machine', sets: 3, reps: 10, weightKg: 40 },
            { id: 3, name: 'Squat', sets: 4, reps: 8, weightKg: 60 }
        ];
    }

    private save() {
        localStorage.setItem('exercises', JSON.stringify(this.exercisesSignal()));
    }

    getExercise(id: number): Exercise | undefined {
        return this.exercisesSignal().find(e => e.id === id);
    }

    addExercise(exercise: Exercise) {
        this.exercisesSignal.update(list => [...list, exercise]);
        this.save();
    }

    updateExercise(updatedExercise: Exercise) {
        this.exercisesSignal.update(list =>
            list.map(ex => ex.id === updatedExercise.id ? updatedExercise : ex)
        );
        this.save();
    }

    deleteExercise(id: number) {
        this.exercisesSignal.update(list => list.filter(e => e.id !== id));
        this.save();
    }
}

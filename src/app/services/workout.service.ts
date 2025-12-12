import { Injectable, signal, computed } from '@angular/core';
import { Workout } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class WorkoutService {
    private workoutsSignal = signal<Workout[]>(this.loadWorkouts());

    workouts = computed(() => this.workoutsSignal());

    constructor() { }

    private loadWorkouts(): Workout[] {
        const saved = localStorage.getItem('workouts');
        return saved ? JSON.parse(saved) : [];
    }

    private saveWorkouts(workouts: Workout[]) {
        localStorage.setItem('workouts', JSON.stringify(workouts));
        this.workoutsSignal.set(workouts);
    }

    getWorkout(id: number): Workout | undefined {
        return this.workoutsSignal().find(w => w.id === id);
    }

    addWorkout(workout: Omit<Workout, 'id' | 'createdAt'>) {
        const newWorkout: Workout = {
            ...workout,
            id: Date.now(),
            createdAt: new Date()
        };
        const current = this.workoutsSignal();
        this.saveWorkouts([...current, newWorkout]);
    }

    deleteWorkout(id: number) {
        const current = this.workoutsSignal();
        this.saveWorkouts(current.filter(w => w.id !== id));
    }

    updateWorkout(updated: Workout) {
        const current = this.workoutsSignal();
        const index = current.findIndex(w => w.id === updated.id);
        if (index !== -1) {
            const newWorkouts = [...current];
            newWorkouts[index] = updated;
            this.saveWorkouts(newWorkouts);
        }
    }
}

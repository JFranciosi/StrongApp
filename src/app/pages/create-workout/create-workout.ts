import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { WorkoutService } from '../../services/workout.service';
import { ExerciseService } from '../../services/exercise.service';
import { DivGlass } from '../../components/div-glass/div-glass';
import { WorkoutExercise } from '../../models/models';
import { Modal } from '../../components/modal/modal';

interface UiWorkoutExercise extends WorkoutExercise {
    uiUnit: 's' | 'm';
    uiDisplayValue: number;
}

@Component({
    selector: 'app-create-workout',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule, DivGlass, Modal],
    templateUrl: './create-workout.html',
    styleUrl: './create-workout.css'
})
export class CreateWorkout {

    private workoutService = inject(WorkoutService);
    private exerciseService = inject(ExerciseService);
    private router = inject(Router);

    workoutName = signal('');
    addedExercises = signal<UiWorkoutExercise[]>([]);
    availableExercises = this.exerciseService.exercises;
    isAlertOpen = false;
    alertTitle = '';
    alertMessage = '';
    isSelectorOpen = false;

    constructor() { }

    toggleSelector() {
        this.isSelectorOpen = !this.isSelectorOpen;
    }

    addExercise(exerciseId: number) {
        const newEx: UiWorkoutExercise = {
            exerciseId: exerciseId,
            sets: 3,
            reps: 10,
            restSeconds: 90,
            uiUnit: 's',
            uiDisplayValue: 90
        };
        this.addedExercises.update(list => [...list, newEx]);
        this.isSelectorOpen = false;
    }

    removeExercise(index: number) {
        this.addedExercises.update(list => list.filter((_, i) => i !== index));
    }

    updateRestValue(index: number, value: number) {
        this.addedExercises.update(list => {
            const newList = [...list];
            const item = { ...newList[index] };
            item.uiDisplayValue = value;

            if (item.uiUnit === 'm') {
                item.restSeconds = Math.round(value * 60);
            } else {
                item.restSeconds = value;
            }

            newList[index] = item;
            return newList;
        });
    }

    toggleRestUnit(index: number) {
        this.addedExercises.update(list => {
            const newList = [...list];
            const item = { ...newList[index] };

            if (item.uiUnit === 's') {
                item.uiUnit = 'm';
                item.uiDisplayValue = parseFloat((item.restSeconds / 60).toFixed(1));
            } else {
                item.uiUnit = 's';
                item.uiDisplayValue = item.restSeconds;
            }

            newList[index] = item;
            return newList;
        });
    }

    getExerciseName(id: number): string {
        return this.exerciseService.exercises().find(e => e.id === id)?.name || 'Unknown';
    }

    saveRelay() {
        if (!this.workoutName()) {
            this.showAlert('Missing Name', 'Please enter a name for your workout.');
            return;
        }
        if (this.addedExercises().length === 0) {
            this.showAlert('Empty Workout', 'Please add at least one exercise.');
            return;
        }

        const cleanExercises: WorkoutExercise[] = this.addedExercises().map(ex => ({
            exerciseId: ex.exerciseId,
            sets: ex.sets,
            reps: ex.reps,
            restSeconds: ex.restSeconds,
            notes: ex.notes
        }));

        this.workoutService.addWorkout({
            name: this.workoutName(),
            exercises: cleanExercises
        });

        this.router.navigate(['/workouts']);
    }

    showAlert(title: string, message: string) {
        this.alertTitle = title;
        this.alertMessage = message;
        this.isAlertOpen = true;
    }

    closeAlert() {
        this.isAlertOpen = false;
    }

    goBack() {
        this.router.navigate(['/workouts']);
    }
}

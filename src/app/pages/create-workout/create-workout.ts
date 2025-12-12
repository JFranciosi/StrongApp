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
    addedExercises = signal<WorkoutExercise[]>([]);
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
        const newEx: WorkoutExercise = {
            exerciseId: exerciseId,
            sets: 3,
            reps: 10,
            restSeconds: 90
        };
        this.addedExercises.update(list => [...list, newEx]);
        this.isSelectorOpen = false;
    }

    removeExercise(index: number) {
        this.addedExercises.update(list => list.filter((_, i) => i !== index));
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

        this.workoutService.addWorkout({
            name: this.workoutName(),
            exercises: this.addedExercises()
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

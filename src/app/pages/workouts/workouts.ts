import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { WorkoutService } from '../../services/workout.service';
import { DivGlass } from '../../components/div-glass/div-glass';
import { Modal } from '../../components/modal/modal';

@Component({
    selector: 'app-workouts',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, DivGlass, Modal],
    templateUrl: './workouts.html',
    styleUrl: './workouts.css'
})
export class Workouts {

    private workoutService = inject(WorkoutService);
    private router = inject(Router);

    workouts = this.workoutService.workouts;
    isModalOpen = false;
    modalTitle = '';
    modalMessage = '';
    workoutToDeleteId: number | null = null;

    constructor() { }

    goToCreate() {
        this.router.navigate(['/workouts/create']);
    }

    runWorkout(id: number) {
        this.router.navigate(['/workouts/run', id]);
    }

    deleteWorkout(id: number) {
        this.workoutToDeleteId = id;
        this.modalTitle = 'Delete Workout';
        this.modalMessage = 'Are you sure you want to delete this workout?';
        this.isModalOpen = true;
    }

    onConfirmDelete() {
        if (this.workoutToDeleteId) {
            this.workoutService.deleteWorkout(this.workoutToDeleteId);
            this.closeModal();
        }
    }

    closeModal() {
        this.isModalOpen = false;
        this.workoutToDeleteId = null;
    }

    goBack() {
        this.router.navigate(['/']);
    }
}

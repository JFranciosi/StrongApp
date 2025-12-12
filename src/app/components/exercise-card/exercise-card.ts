import { Component, computed } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/models';
import { DivGlass } from "../div-glass/div-glass";

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DivGlass],
  templateUrl: './exercise-card.html',
  styleUrl: './exercise-card.css'
})
export class ExerciseCard {

  exercises: () => Exercise[];

  constructor(private exerciseService: ExerciseService, private router: Router) {
    this.exercises = this.exerciseService.exercises;
  }

  totalVolume = computed(() => {
    return this.exercises().reduce((acc, ex) => acc + (ex.weightKg || 0) * ex.reps * ex.sets, 0);
  });

  goToAdd() {
    this.router.navigate(['/add']);
  }

  goToEdit(id: number) {
    this.router.navigate(['/edit', id]);
  }

  goToWorkouts() {
    alert('Workout Module - Coming Soon in Liquid v3.0');
  }

  deleteItem(id: number) {
    if (confirm('Dissolve this item?')) {
      this.exerciseService.deleteExercise(id);
    }
  }
}

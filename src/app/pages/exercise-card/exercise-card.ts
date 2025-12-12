import { Component, computed, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/models';
import { DivGlass } from "../../components/div-glass/div-glass";
import { SearchBar, SearchFilters } from '../../components/search-bar/search-bar';

import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DivGlass, SearchBar, Modal],
  templateUrl: './exercise-card.html',
  styleUrl: './exercise-card.css'
})
export class ExerciseCard {

  filters = signal<SearchFilters>({ name: '', weight: null, reps: null, sets: null });
  isDeleteModalOpen = false;
  itemToDeleteId: number | null = null;

  exercises = computed(() => {
    const all = this.exerciseService.exercises();
    const f = this.filters();
    return all.filter(ex => {
      const matchName = !f.name || ex.name.toLowerCase().includes(f.name.toLowerCase());
      const matchWeight = !f.weight || ex.weightKg === f.weight;
      const matchReps = !f.reps || ex.reps === f.reps;
      const matchSets = !f.sets || ex.sets === f.sets;
      return matchName && matchWeight && matchReps && matchSets;
    });
  });

  constructor(private exerciseService: ExerciseService, private router: Router) {
  }

  totalVolume = computed(() => {
    return this.exerciseService.exercises().reduce((acc, ex) => acc + (ex.weightKg || 0) * ex.reps * ex.sets, 0);
  });

  goToAdd() {
    this.router.navigate(['/add']);
  }

  goToEdit(id: number) {
    this.router.navigate(['/edit', id]);
  }

  goToWorkouts() {
    this.router.navigate(['/workouts']);
  }

  // Open modal instead of confirm()
  deleteItem(id: number) {
    this.itemToDeleteId = id;
    this.isDeleteModalOpen = true;
  }

  confirmDelete() {
    if (this.itemToDeleteId) {
      this.exerciseService.deleteExercise(this.itemToDeleteId);
      this.closeModal();
    }
  }

  closeModal() {
    this.isDeleteModalOpen = false;
    this.itemToDeleteId = null;
  }
}

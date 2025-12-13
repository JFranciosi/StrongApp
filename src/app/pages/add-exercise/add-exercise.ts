import { Component, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { DivGlass } from "../../components/div-glass/div-glass";
import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-add-exercise',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, DivGlass, Modal],
  templateUrl: './add-exercise.html',
  styleUrl: './add-exercise.css'
})
export class AddExercise {
  name = signal('');
  weight = signal(0);
  reps = signal(0);
  sets = signal(3);

  isAlertOpen = false;
  alertMessage = '';

  constructor(private exerciseService: ExerciseService, private router: Router) { }

  save() {
    if (!this.name() || this.name().trim() === '') {
      this.showAlert('Please enter an exercise name.');
      return;
    }
    if (this.weight() <= 0) {
      this.showAlert('Please enter a valid weight.');
      return;
    }
    if (this.reps() <= 0) {
      this.showAlert('Please enter valid reps.');
      return;
    }

    this.exerciseService.addExercise({
      id: Date.now(),
      name: this.name(),
      muscleGroup: 'New',
      weightKg: this.weight(),
      reps: this.reps(),
      sets: this.sets()
    });
    this.back();
  }

  showAlert(message: string) {
    this.alertMessage = message;
    this.isAlertOpen = true;
  }

  closeAlert() {
    this.isAlertOpen = false;
  }

  back() {
    this.router.navigate(['/']);
  }
}

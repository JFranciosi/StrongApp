import { Component, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { DivGlass } from "../../components/div-glass/div-glass";

@Component({
  selector: 'app-add-exercise',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, DivGlass],
  templateUrl: './add-exercise.html',
  styleUrl: './add-exercise.css'
})
export class AddExercise {
  name = signal('');
  weight = signal(0);
  reps = signal(0);
  sets = signal(3);

  constructor(private exerciseService: ExerciseService, private router: Router) { }

  save() {
    if (this.name()) {
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
  }

  back() {
    this.router.navigate(['/']);
  }
}

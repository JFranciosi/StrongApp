import { Component, signal, effect } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/models';

@Component({
  selector: 'app-edit-exercise',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-exercise.html',
  styleUrl: './edit-exercise.css'
})
export class EditExercise {
  exerciseId: number | null = null;
  name = signal('');
  weight = signal(0);
  reps = signal(0);
  sets = signal(3);

  constructor(
    private exerciseService: ExerciseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.exerciseId = +params['id'];
      const ex = this.exerciseService.getExercise(this.exerciseId);
      if (ex) {
        this.name.set(ex.name);
        this.weight.set(ex.weightKg || 0);
        this.reps.set(ex.reps);
        this.sets.set(ex.sets);
      } else {
        this.back();
      }
    });
  }

  save() {
    if (this.exerciseId) {
      this.exerciseService.updateExercise({
        id: this.exerciseId,
        name: this.name(),
        muscleGroup: 'Updated',
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

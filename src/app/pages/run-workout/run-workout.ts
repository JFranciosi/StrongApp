import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { WorkoutService } from '../../services/workout.service';
import { ExerciseService } from '../../services/exercise.service';
import { DivGlass } from '../../components/div-glass/div-glass';
import { RestTimer } from '../../components/rest-timer/rest-timer';

@Component({
    selector: 'app-run-workout',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, DivGlass, RestTimer],
    templateUrl: './run-workout.html',
    styleUrls: ['./run-workout.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RunWorkout implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private workoutService = inject(WorkoutService);
    private exerciseService = inject(ExerciseService);

    workoutId = signal<number | null>(null);
    workout = computed(() => {
        const id = this.workoutId();
        return id ? this.workoutService.getWorkout(id) : undefined;
    });

    completedSets = signal<Set<string>>(new Set());
    collapsedExercises = signal<Set<number>>(new Set());
    activeRestExerciseIndex: number | null = null;
    activeRestTimer = false;
    activeRestDuration = 60;

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.workoutId.set(+params['id']);
            }
        });
    }

    toggleCollapse(index: number) {
        const current = new Set(this.collapsedExercises());
        if (current.has(index)) {
            current.delete(index);
        } else {
            current.add(index);
        }
        this.collapsedExercises.set(current);
    }

    isCollapsed(index: number): boolean {
        return this.collapsedExercises().has(index);
    }

    getExerciseName(id: number): string {
        return this.exerciseService.exercises().find(e => e.id === id)?.name || 'Unknown Exercise';
    }

    getSetsArray(count: number): any[] {
        return new Array(count);
    }

    isSetCompleted(exIndex: number, setIndex: number): boolean {
        return this.completedSets().has(`${exIndex}-${setIndex}`);
    }

    toggleSet(exIndex: number, setIndex: number, restSeconds: number) {
        if (this.activeRestTimer) return;

        const key = `${exIndex}-${setIndex}`;
        const current = new Set(this.completedSets());

        if (current.has(key)) {
            current.delete(key);
            this.activeRestTimer = false;
            this.activeRestExerciseIndex = null;
        } else {
            current.add(key);
            if (!this.activeRestTimer) {
                this.activeRestDuration = restSeconds;
                this.activeRestTimer = true;
                this.activeRestExerciseIndex = exIndex;
            }
        }

        this.completedSets.set(current);
    }

    onRestComplete() {
        this.activeRestTimer = false;
        this.activeRestExerciseIndex = null;
    }

    onRestClosed() {
        this.activeRestTimer = false;
        this.activeRestExerciseIndex = null;
    }

    finishWorkout() {
        this.router.navigate(['/workouts']);
    }

    goBack() {
        this.router.navigate(['/workouts']);
    }
}

import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            min-height: 100vh;
            padding: 2rem 1rem;
            padding-bottom: 6rem;
        }

        .header-card, .exercise-list {
            width: 100%;
            max-width: 500px;
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
        }

        .title-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .title-section h1 {
            font-size: 1.5rem;
            font-weight: 800;
            margin: 0;
            color: white;
        }

        .subtitle {
            color: rgba(255, 255, 255, 0.5);
            font-size: 0.8rem;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .icon-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s;
        }

        .icon-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .header-spacer {
            width: 40px;
        }

        .exercise-list {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .exercise-header {
            margin-bottom: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .exercise-name {
            font-size: 1.2rem;
            font-weight: 700;
            color: white;
            margin: 0;
        }

        .collapse-btn {
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px;
            cursor: pointer;
            transition: all 0.2s;
            border-radius: 50%;
        }

        .collapse-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }

        .sets-grid {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }

        .set-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.8rem 1rem;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .set-row.completed {
            background: rgba(var(--primary-rgb), 0.1);
            border-color: rgba(var(--primary-rgb), 0.3);
        }

        .set-info {
            font-family: monospace;
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.8);
        }

        .set-check {
            width: 24px;
            height: 24px;
            border-radius: 6px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            background: transparent;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .set-check.checked {
            background: var(--primary);
            border-color: var(--primary);
        }

        .finish-bar {
            width: 100%;
            display: flex;
            justify-content: center;
            max-width: 500px; /* Constrain width to match cards */
        }

        .finish-btn {
            width: 100%;
            padding: 1rem;
            border: none;
            border-radius: 12px;
            background: white;
            color: black;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            margin-top: 1rem; /* Space from last card */
        }
    `]
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

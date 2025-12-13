import { Routes } from '@angular/router';
import { ExerciseCard } from './pages/exercise-card/exercise-card';
import { AddExercise } from './pages/add-exercise/add-exercise';
import { EditExercise } from './pages/edit-exercise/edit-exercise';
import { Workouts } from './pages/workouts/workouts';
import { CreateWorkout } from './pages/create-workout/create-workout';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {
        path: "",
        component: ExerciseCard
    },
    {
        path: "add",
        component: AddExercise
    },
    {
        path: "edit/:id",
        component: EditExercise
    },
    {
        path: 'workouts',
        component: Workouts
    },
    {
        path: 'workouts/create',
        component: CreateWorkout
    },
    {
        path: '**',
        component: NotFound
    }
];

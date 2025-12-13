import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./pages/exercise-card/exercise-card').then(m => m.ExerciseCard)
    },
    {
        path: "add",
        loadComponent: () => import('./pages/add-exercise/add-exercise').then(m => m.AddExercise)
    },
    {
        path: "edit/:id",
        loadComponent: () => import('./pages/edit-exercise/edit-exercise').then(m => m.EditExercise)
    },
    {
        path: 'workouts',
        loadComponent: () => import('./pages/workouts/workouts').then(m => m.Workouts)
    },
    {
        path: 'workouts/create',
        loadComponent: () => import('./pages/create-workout/create-workout').then(m => m.CreateWorkout)
    },
    {
        path: 'workouts/run/:id',
        loadComponent: () => import('./pages/run-workout/run-workout').then(m => m.RunWorkout)
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound)
    }
];

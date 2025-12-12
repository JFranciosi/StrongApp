import { Routes } from '@angular/router';
import { ExerciseCard } from './pages/exercise-card/exercise-card';
import { AddExercise } from './pages/add-exercise/add-exercise';
import { EditExercise } from './pages/edit-exercise/edit-exercise';

export const routes: Routes = [
    {
        path: "",
        component: ExerciseCard,
        title: "Home"
    },
    {
        path: "add",
        component: AddExercise,
        title: "Add Exercise"
    },
    {
        path: "edit/:id",
        component: EditExercise,
        title: "Edit Exercise"
    }
];

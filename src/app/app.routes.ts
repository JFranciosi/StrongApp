import { Routes } from '@angular/router';
import { ExerciseCard } from './components/exercise-card/exercise-card';
import { AddExercise } from './components/add-exercise/add-exercise';
import { EditExercise } from './components/edit-exercise/edit-exercise';

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

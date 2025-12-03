import { Routes } from '@angular/router';
import { ExerciseCard } from './components/exercise-card/exercise-card';

export const routes: Routes = [
    {
        path:"",
        component:ExerciseCard,
        title: "home"
    }
];

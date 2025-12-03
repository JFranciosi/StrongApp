import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Exercise } from './models/exercise';
import { ExerciseCard } from "./components/exercise-card/exercise-card";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ExerciseCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}

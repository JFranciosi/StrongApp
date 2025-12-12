import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer],
  template: `
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrl: './app.css'
})
export class App {

}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { SideMenu } from './components/side-menu/side-menu';
import { Navbar } from './components/navbar/navbar';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer, SideMenu, LucideAngularModule, Navbar],
  template: `
    <app-navbar (menuClick)="isMenuOpen = true"></app-navbar>

    <app-side-menu [isOpen]="isMenuOpen" (closeMenu)="isMenuOpen = false"></app-side-menu>

    <div class="app-content">
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './app.css'
})
export class App {
  isMenuOpen = false;
}

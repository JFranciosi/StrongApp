import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { DivGlass } from '../../components/div-glass/div-glass';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, DivGlass],
    templateUrl: './not-found.html',
    styleUrl: './not-found.css'
})
export class NotFound {
    private router = inject(Router);

    goHome() {
        this.router.navigate(['/']);
    }
}

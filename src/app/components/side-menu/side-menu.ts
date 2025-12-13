import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-side-menu',
    standalone: true,
    imports: [CommonModule, RouterModule, LucideAngularModule],
    templateUrl: './side-menu.html',
    styleUrl: './side-menu.css'
})
export class SideMenu {
    @Input() isOpen = false;
    @Output() closeMenu = new EventEmitter<void>();

    constructor(private router: Router) { }

    navigate(path: string) {
        this.router.navigate([path]);
        this.close();
    }

    close() {
        this.closeMenu.emit();
    }
}

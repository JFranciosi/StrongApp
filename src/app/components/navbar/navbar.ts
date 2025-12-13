import { Component, EventEmitter, Output, HostBinding, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, RouterModule],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css'
})
export class Navbar {
    @Output() menuClick = new EventEmitter<void>();
    @HostBinding('class.hidden') isHidden = false;

    private lastScrollTop = 0;

    @HostListener('window:scroll')
    onScroll() {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;

        if (currentScroll > this.lastScrollTop && currentScroll > 64) {
            this.isHidden = true;
        } else {
            this.isHidden = false;
        }

        this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }

    toggleMenu() {
        this.menuClick.emit();
    }
}

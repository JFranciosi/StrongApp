import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'div-glass, app-div-glass',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './div-glass.html',
    styleUrl: './div-glass.css'
})
export class DivGlass {
    @Input() variant: 'hero' | 'surface' = 'surface';
    @Input() hasHover: boolean = false;
    @Input() className: string = '';

    get classes(): string {
        const variantClass = this.variant === 'hero' ? 'hero-glass' : 'glass-surface';
        const hoverClass = this.hasHover ? 'hover-effect' : '';
        return `${variantClass} ${hoverClass} ${this.className}`.trim();
    }
}

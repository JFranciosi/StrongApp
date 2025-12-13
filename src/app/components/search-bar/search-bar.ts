import { Component, output, signal, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DivGlass } from '../div-glass/div-glass';
import { LucideAngularModule } from 'lucide-angular';

export interface SearchFilters {
    name: string;
    weight: number | null;
    reps: number | null;
    sets: number | null;
}

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [FormsModule, DivGlass, LucideAngularModule],
    templateUrl: './search-bar.html',
    styleUrl: './search-bar.css'
})
export class SearchBar implements OnInit {
    private cdr = inject(ChangeDetectorRef);
    filtersChange = output<SearchFilters>();

    name = signal('');
    weight = signal<number | null>(null);
    reps = signal<number | null>(null);
    sets = signal<number | null>(null);

    ngOnInit() {
        setTimeout(() => {
            this.cdr.detectChanges();
        }, 0);
    }

    updateFilters() {
        this.filtersChange.emit({
            name: this.name(),
            weight: this.weight(),
            reps: this.reps(),
            sets: this.sets()
        });
    }

    onInputChange(field: 'weight' | 'reps' | 'sets', value: any) {
        const val = (value === '' || value === null || value === undefined) ? null : Number(value);
        if (field === 'weight') this.weight.set(val);
        if (field === 'reps') this.reps.set(val);
        if (field === 'sets') this.sets.set(val);
        this.updateFilters();
    }
}

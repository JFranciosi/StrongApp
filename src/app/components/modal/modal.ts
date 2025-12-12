import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivGlass } from '../div-glass/div-glass';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule, DivGlass],
    templateUrl: './modal.html',
    styleUrl: './modal.css'
})
export class Modal {
    @Input() title: string = '';
    @Input() message: string = '';
    @Input() isOpen: boolean = false;

    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    @HostBinding('style.display') get display() {
        return this.isOpen ? 'flex' : 'none';
    }

    onConfirm() {
        this.confirm.emit();
    }

    onCancel() {
        this.cancel.emit();
    }
}

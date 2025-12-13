import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivGlass } from '../div-glass/div-glass';

@Component({
    selector: 'app-rest-timer',
    standalone: true,
    imports: [CommonModule, DivGlass],
    templateUrl: './rest-timer.html',
    styleUrl: './rest-timer.css'
})
export class RestTimer implements OnInit, OnDestroy {
    @Input() duration: number = 60;
    @Output() timerComplete = new EventEmitter<void>();
    @Output() timerClosed = new EventEmitter<void>();

    secondsLeft: number = 60;
    isRunning = false;
    private intervalId: any;
    private endTime: number = 0;

    constructor(private cdr: ChangeDetectorRef) { }

    get progressPercentage(): number {
        return Math.min(100, (this.secondsLeft / this.duration) * 100);
    }

    ngOnInit() {
        this.secondsLeft = this.duration;
    }

    ngOnDestroy() {
        this.stopTimer();
    }

    startTimer() {
        this.isRunning = true;
        this.stopTimer();
        this.endTime = Date.now() + (this.secondsLeft * 1000);

        this.intervalId = setInterval(() => {
            const now = Date.now();
            const diff = this.endTime - now;

            this.secondsLeft = Math.max(0, diff / 1000);

            if (diff <= 0) {
                this.secondsLeft = 0;
                this.complete();
            }
            this.cdr.markForCheck();
        }, 50);
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.isRunning = false;
    }

    addTime() {
        this.endTime += 30000;
        const now = Date.now();
        const diff = this.endTime - now;
        this.secondsLeft = Math.max(0, diff / 1000);

        if (this.secondsLeft > 0 && !this.isRunning) {
            this.startTimer();
        }
    }

    close() {
        this.stopTimer();
        this.timerClosed.emit();
    }

    complete() {
        this.stopTimer();
        this.timerComplete.emit();
    }

    formatTime(seconds: number): string {
        const s = Math.ceil(seconds);
        const m = Math.floor(s / 60);
        const rem = s % 60;
        return `${m}:${rem.toString().padStart(2, '0')}`;
    }
}

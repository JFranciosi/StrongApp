import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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

        this.intervalId = setInterval(() => {
            this.secondsLeft--;
            if (this.secondsLeft <= 0) {
                this.complete();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.isRunning = false;
    }

    addTime() {
        this.secondsLeft += 30;
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
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    }
}

import { Module } from './Module';
import { Period } from './Period';

export class Class {
    module: Module;
    code: string;
    capacity: number;
    period: Period;

    constructor(module: Module, code: string, capacity: number, period: { startDate: string; endDate: string }) {
        this.module = module;
        this.code = code;
        this.capacity = capacity;
        this.period = new Period(period);
    }

    isAlreadyFinished(currentDate: Date): boolean {
        return this.period.endDate.getTime() < currentDate.getTime();
    }

    getProgressPercentage(currentDate: Date): number {
        const classAlreadyStarted = this.period.startDate.getTime() < currentDate.getTime();

        if (classAlreadyStarted) {
            const timeHasPassed = this.period.startDate.getTime() - currentDate.getTime();
            return (timeHasPassed * 100) / this.period.getClassDurationTime();
        }
        return 0;
    }
}

import { Module } from './Module';

interface Period {
    startDate: string;
    endDate: string;
}

export class Class {
    module: Module;
    code: string;
    capacity: number;
    period: {
        startDate: Date;
        endDate: Date;
    };

    constructor(module: Module, code: string, capacity: number, period: Period) {
        this.module = module;
        this.code = code;
        this.capacity = capacity;
        this.period = {
            startDate: new Date(period.startDate),
            endDate: new Date(period.endDate),
        };
    }
}

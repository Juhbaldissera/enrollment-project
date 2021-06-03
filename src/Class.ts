import { Module } from './Module';

export class Class {
    module: Module;
    code: string;
    capacity: number;

    constructor(module: Module, code: string, capacity: number) {
        this.module = module;
        this.code = code;
        this.capacity = capacity;
    }
}

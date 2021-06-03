import { Level } from './Level';

export class Module {
    level: Level;
    code: string;
    description: string;
    minimumAge: number;
    price: number;

    constructor(level: Level, code: string, description: string, minimumAge: number, price: number) {
        this.level = level;
        this.code = code;
        this.description = description;
        this.minimumAge = minimumAge;
        this.price = price;
    }
}

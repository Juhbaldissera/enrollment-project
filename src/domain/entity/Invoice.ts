import { InvoiceEvent } from './InvoiceEvent';

export class Invoice {
    code: string;
    month: number;
    year: number;
    amount: number;
    events: InvoiceEvent[];
    dueDate: Date;

    constructor(code: string, month: number, year: number, amount: number) {
        this.code = code;
        this.month = month;
        this.year = year;
        this.amount = amount;
        this.events = [];
        this.dueDate = new Date(year, month - 1, 5, 4);
    }

    addEvent(invoiceEvent: InvoiceEvent): void {
        this.events.push(invoiceEvent);
    }

    getBalance(): number {
        return this.events.reduce((total, event) => {
            if (event.type === 'payment') total -= event.amount;
            if (event.type === 'penalty') total += event.amount;
            if (event.type === 'interests') total += event.amount;
            return total;
        }, this.amount);
    }

    getStatus(currentDate: Date): string {
        if (this.getBalance() === 0) return 'paid';
        if (currentDate.getTime() > this.dueDate.getTime()) return 'overdue';
        return 'open';
    }

    getPenalty(currentDate: Date): number {
        if (this.getStatus(currentDate) != 'overdue') return 0;
        const balance = this.getBalance();
        return Math.round(balance * 0.1 * 100) / 100;
    }

    getInterests(currentDate: Date): number {
        if (this.getStatus(currentDate) != 'overdue') return 0;
        const balance = this.getBalance();
        const dueDays = Math.floor((currentDate.getTime() - this.dueDate.getTime()) / (1000 * 60 * 60 * 24));
        return Math.round(balance * 0.01 * dueDays * 100) / 100;
    }

    clone(): Invoice {
        return JSON.parse(JSON.stringify(this));
    }
}

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
        this.dueDate = new Date(year, month - 1, 5);
    }

    addEvent(invoiceEvent: InvoiceEvent): void {
        this.events.push(invoiceEvent);
    }

    getBalance(): number {
        return this.events.reduce((total, event) => {
            total -= event.amount;
            return total;
        }, this.amount);
    }

    getStatus(currentDate: Date): string {
        if (this.getBalance() === 0) return 'paid';
        if (currentDate.getTime() > this.dueDate.getTime()) return 'overdue';
        return 'open';
    }

    clone(): Invoice {
        return JSON.parse(JSON.stringify(this));
    }
}

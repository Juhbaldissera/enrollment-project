import { InvoiceEvent } from './InvoiceEvent';

export class Invoice {
    code: string;
    month: number;
    year: number;
    amount: number;
    events: InvoiceEvent[];

    constructor(code: string, month: number, year: number, amount: number) {
        this.code = code;
        this.month = month;
        this.year = year;
        this.amount = amount;
        this.events = [];
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

    clone(): Invoice {
        return JSON.parse(JSON.stringify(this));
    }
}

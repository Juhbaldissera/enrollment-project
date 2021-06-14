export enum InvoiceStatus {
    pending = 'pending',
    paid = 'paid',
}

export class Invoice {
    code: string;
    month: number;
    year: number;
    amount: number;
    status: InvoiceStatus;

    constructor(code: string, month: number, year: number, amount: number) {
        this.code = code;
        this.month = month;
        this.year = year;
        this.amount = amount;
        this.status = InvoiceStatus.pending;
    }
}

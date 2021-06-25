export class PayInvoiceInputData {
    code: string;
    month: number;
    year: number;
    amount: number;

    constructor({ code, month, year, amount }: { code: string; month: number; year: number; amount: number }) {
        this.code = code;
        this.month = month;
        this.year = year;
        this.amount = amount;
    }
}

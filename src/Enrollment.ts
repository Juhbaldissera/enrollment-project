import { Class } from './Class';
import { Code } from './Code';
import { Invoice } from './Invoice';
import { InvoiceEvent } from './InvoiceEvent';
import Student from './Student';

function round(num: number): number {
    return Math.trunc(num * 100) / 100;
}

export class Enrollment {
    issueDate: Date;
    code: Code;
    student: Student;
    class: Class;
    installments: number;
    invoices: Invoice[];

    constructor(issueDate: Date, student: Student, sequence: number, clazz: Class, installments: number) {
        if (student.getAge() < clazz.module.minimumAge) {
            throw new Error('Student below minimum age');
        }
        if (clazz.isAlreadyFinished(issueDate)) {
            throw new Error('Class is already finished');
        }
        if (clazz.getProgressPercentage(issueDate) > 25) {
            throw new Error('Class is already started');
        }
        this.issueDate = issueDate;
        this.student = student;
        this.code = new Code(issueDate, clazz.module.level.code, clazz.module.code, clazz.code, sequence);
        this.class = clazz;
        this.installments = installments;
        this.invoices = [];
        this.generateInvoices();
    }

    generateInvoices(): void {
        const installmentValue = round(this.class.module.price / this.installments);
        for (let i = 1; i <= this.installments; i++) {
            this.invoices.push(new Invoice(this.code.value, i, this.issueDate.getFullYear(), installmentValue));
        }
        const total = this.invoices.reduce((total, invoice) => {
            total = total + invoice.amount;
            return total;
        }, 0);
        const rest = round(this.class.module.price - total);
        this.invoices[this.invoices.length - 1].amount = installmentValue + rest;
    }

    getInvoice(month: number, year: number): Invoice | undefined {
        const invoice = this.invoices.find((invoice) => invoice.month === month && invoice.year === year);
        return invoice;
    }

    getInvoiceBalance(): number {
        return this.invoices.reduce((total, invoice) => {
            total += invoice.getBalance();
            return total;
        }, 0);
    }

    payInvoice(month: number, year: number, amount: number): void {
        const invoice = this.getInvoice(month, year);
        if (!invoice) throw new Error('Invalid invoice');
        invoice.addEvent(new InvoiceEvent('payment', amount));
    }
}

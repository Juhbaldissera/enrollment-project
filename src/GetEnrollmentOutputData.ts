export class GetEnrollmentOutputData {
    code: string;
    balance: number;
    status: string;

    constructor({ code, balance, status }: { code: string; balance: number; status: 'active' | 'cancelled' }) {
        this.code = code;
        this.balance = balance;
        this.status = status;
    }
}

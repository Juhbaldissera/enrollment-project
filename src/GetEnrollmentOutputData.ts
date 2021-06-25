export class GetEnrollmentOutputData {
    code: string;
    balance: number;

    constructor({ code, balance }: { code: string; balance: number }) {
        this.code = code;
        this.balance = balance;
    }
}

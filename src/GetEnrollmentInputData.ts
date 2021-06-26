export class GetEnrollmentInputData {
    code: string;
    currentDate: Date;

    constructor({ code, currentDate }: { code: string; currentDate: Date }) {
        this.code = code;
        this.currentDate = currentDate;
    }
}

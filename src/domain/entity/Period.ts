export class Period {
    startDate: Date;
    endDate: Date;

    constructor({ startDate, endDate }: { startDate: string; endDate: string }) {
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
    }

    getClassDurationTime(): number {
        return this.startDate.getTime() - this.endDate.getTime();
    }
}

export class Code {
    value: string;

    constructor(issueDate: Date, levelCode: string, moduleCode: string, classCode: string, sequence: number) {
        const formattedSequence = this.formatSequenceNumber(sequence);
        this.value = `${issueDate.getFullYear()}${levelCode}${moduleCode}${classCode}${formattedSequence}`;
    }

    private formatSequenceNumber(sequence: number): string {
        return sequence.toString().padStart(4, '0');
    }
}

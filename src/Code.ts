export class Code {
    value: string;

    constructor(levelCode: string, moduleCode: string, classCode: string, sequence: number) {
        const formattedSequence = this.formatSequenceNumber(sequence);
        this.value = `${new Date().getFullYear()}${levelCode}${moduleCode}${classCode}${formattedSequence}`;
    }

    private formatSequenceNumber(sequence: number): string {
        return sequence.toString().padStart(4, '0');
    }
}

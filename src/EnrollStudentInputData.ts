export class EnrollStudentInputData {
    studentName: string;
    studentCpf: string;
    studentBirthDate: string;
    level: string;
    module: string;
    classroom: string;
    installments: number;
    currentDate: Date;

    constructor({
        studentName,
        studentCpf,
        studentBirthDate,
        level,
        module,
        classroom,
        installments,
        currentDate,
    }: {
        studentName: string;
        studentCpf: string;
        studentBirthDate: string;
        level: string;
        module: string;
        classroom: string;
        installments: number;
        currentDate: Date;
    }) {
        this.studentName = studentName;
        this.studentCpf = studentCpf;
        this.studentBirthDate = studentBirthDate;
        this.level = level;
        this.module = module;
        this.classroom = classroom;
        this.installments = installments;
        this.currentDate = new Date(currentDate);
    }
}

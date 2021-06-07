import { Class } from './Class';
import { Code } from './Code';
import Student from './Student';

export class Enrollment {
    code: Code;
    student: Student;
    class: Class;
    installments: number[];

    constructor(issueDate: Date, student: Student, sequence: number, clazz: Class, installments: number[]) {
        if (student.getAge() < clazz.module.minimumAge) {
            throw new Error('Student below minimum age');
        }
        if (clazz.isAlreadyFinished(issueDate)) {
            throw new Error('Class is already finished');
        }
        if (clazz.getProgressPercentage(issueDate) > 25) {
            throw new Error('Class is already started');
        }
        this.student = student;
        this.code = new Code(issueDate, clazz.module.level.code, clazz.module.code, clazz.code, sequence);
        this.class = clazz;
        this.installments = installments;
    }
}

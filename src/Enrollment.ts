import { Class } from './Class';
import { Code } from './Code';
import Student from './Student';

export class Enrollment {
    code: Code;
    student: Student;
    class: Class;
    installments: number[];

    constructor(student: Student, code: Code, clazz: Class, installments: number[]) {
        this.student = student;
        this.code = code;
        this.class = clazz;
        this.installments = installments;
    }
}

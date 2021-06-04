import { Class } from './Class';
import { Code } from './Code';
import Student from './Student';

export class Enrollment {
    code: Code;
    student: Student;
    class: Class;

    constructor(student: Student, code: Code, clazz: Class) {
        this.student = student;
        this.code = code;
        this.class = clazz;
    }
}

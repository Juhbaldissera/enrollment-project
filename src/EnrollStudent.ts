import { Code } from './Code';
import Student from './Student';

export interface EnrollmentRequest {
    student: {
        name: string;
        cpf: string;
    };
    level: string;
    module: string;
    class: string;
}

interface Enrollment {
    code: Code;
    student: Student;
}

export class EnrollStudent {
    public enrollments: Enrollment[];

    constructor() {
        this.enrollments = [];
    }

    public execute(enrollmentRequest: EnrollmentRequest): void {
        const student = new Student(enrollmentRequest.student.name, enrollmentRequest.student.cpf);
        const existingEnrollment = this.enrollments.find(
            (enrollment) => enrollment.student.cpf.value === enrollmentRequest.student.cpf,
        );
        if (existingEnrollment) {
            throw new Error('Enrollment with duplicated student is not allowed');
        }
        const { level, module, class: clazz } = enrollmentRequest;
        const code = new Code(level, module, clazz, this.enrollments.length + 1);
        this.enrollments.push({ student, code });
    }
}

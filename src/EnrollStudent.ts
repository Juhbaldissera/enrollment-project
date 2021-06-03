import { Classes } from './Classes';
import { Code } from './Code';
import Student from './Student';

export interface EnrollmentRequest {
    student: {
        name: string;
        cpf: string;
        birthDate: string;
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

    constructor(public classes: Classes = new Classes()) {
        this.enrollments = [];
    }

    public execute(enrollmentRequest: EnrollmentRequest): void {
        const {
            student: { name, cpf, birthDate },
            level,
            module,
            class: clazz,
        } = enrollmentRequest;

        const student = new Student(name, cpf, birthDate);
        const existingEnrollment = this.enrollments.find(
            (enrollment) => enrollment.student.cpf.value === enrollmentRequest.student.cpf,
        );
        if (existingEnrollment) {
            throw new Error('Enrollment with duplicated student is not allowed');
        }
        const existingClass = this.classes.find(level, module, clazz);
        if (student.getAge() < existingClass.module.minimumAge) {
            throw new Error('Student below minimum age');
        }
        const code = new Code(level, module, clazz, this.enrollments.length + 1);
        this.enrollments.push({ student, code });
    }
}

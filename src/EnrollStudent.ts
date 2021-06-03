import { Class } from './Class';
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
    class: Class;
}

export class EnrollStudent {
    enrollments: Enrollment[];

    constructor(private classes: Classes = new Classes()) {
        this.enrollments = [];
    }

    private getEnrollmentsOfAClass(classCode: string): number {
        const classStudents = this.enrollments.filter(() =>
            this.enrollments.filter((enrollment) => enrollment.class.code === classCode),
        );
        return classStudents.length;
    }

    public execute(enrollmentRequest: EnrollmentRequest): Enrollment {
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
        if (existingClass.capacity === this.getEnrollmentsOfAClass(clazz)) {
            throw new Error('Class is over capacity');
        }
        const code = new Code(level, module, clazz, this.enrollments.length + 1);
        const enrollment = { student, code, class: existingClass };
        this.enrollments.push(enrollment);
        return enrollment;
    }
}

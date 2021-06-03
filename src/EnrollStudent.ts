import Student from './Student';

export interface EnrollmentRequest {
    student: {
        name: string;
        cpf: string;
    };
}

interface Enrollment {
    student: Student;
}

export class EnrollStudent {
    private enrollments: Enrollment[] = [];

    private saveStudent(student: Student): void {
        const existingEnrollment = this.enrollments.find(
            (enrollment) => enrollment.student.cpf.value === student.cpf.value,
        );
        if (existingEnrollment) {
            throw new Error('Enrollment with duplicated student is not allowed');
        }
        this.enrollments.push({ student });
    }

    public execute(enrollmentRequest: EnrollmentRequest): void {
        const student = new Student(enrollmentRequest.student.name, enrollmentRequest.student.cpf);
        this.saveStudent(student);
    }
}

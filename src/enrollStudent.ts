import { extractDigits, validateCpf } from './validateCpf';

interface Student {
    name: string;
    cpf: string;
}

export interface EnrollmentRequest {
    student: Student;
}

const REGEX_VALID_NAME = /^([A-Za-z]+ )+([A-Za-z])+$/;

export class EnrollStudent {
    private students: Map<string, Student> = new Map<string, Student>();

    private validateName(name: string): boolean {
        return REGEX_VALID_NAME.test(name);
    }

    private saveStudent(student: Student): void {
        const cpf = extractDigits(student.cpf);
        if (this.students.has(cpf)) {
            throw new Error('Enrollment with duplicated student is not allowed');
        }
        this.students.set(cpf, student);
    }

    public execute(enrollmentRequest: EnrollmentRequest): void {
        if (!this.validateName(enrollmentRequest.student.name)) {
            throw new Error('Invalid student name');
        }
        if (!validateCpf(enrollmentRequest.student.cpf)) {
            throw new Error('Invalid student cpf');
        }
        this.saveStudent(enrollmentRequest.student);
    }
}

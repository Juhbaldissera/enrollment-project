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
    private validateName(name: string): boolean {
        return REGEX_VALID_NAME.test(name);
    }

    public execute(enrollmentRequest: EnrollmentRequest): void {
        if (!this.validateName(enrollmentRequest.student.name)) {
            throw new Error('Invalid student name');
        }
    }
}

import { Class } from './Class';
import { Code } from './Code';
import Student from './Student';

export interface Enrollment {
    code: Code;
    student: Student;
    class: Class;
}

export interface EnrollmentRepository {
    saveEnrollment(enrollment: Enrollment): void;
    findAllByClass(level: string, module: string, clazz: string): Enrollment[];
    findByCpf(cpf: string): Enrollment | undefined;
    count(): number;
}

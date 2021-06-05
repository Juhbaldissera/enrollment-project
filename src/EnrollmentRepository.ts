import { Enrollment } from './Enrollment';

export interface EnrollmentRepository {
    saveEnrollment(enrollment: Enrollment): void;
    findAllByClass(level: string, module: string, clazz: string): Enrollment[];
    findByCpf(cpf: string): Enrollment | undefined;
    count(): number;
}
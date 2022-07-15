import { Enrollment } from '../entity/Enrollment';

export interface EnrollmentRepository {
    saveEnrollment(enrollment: Enrollment): void;
    findAllByClass(level: string, module: string, clazz: string): Enrollment[];
    findByCpf(cpf: string): Enrollment | undefined;
    findByCode(code: string): Enrollment | undefined;
    count(): number;
}

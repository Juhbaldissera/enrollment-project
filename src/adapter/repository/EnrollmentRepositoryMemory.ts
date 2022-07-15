import { Enrollment } from '../../domain/entity/Enrollment';
import { EnrollmentRepository } from '../../domain/repository/EnrollmentRepository';

export class EnrollmentRepositoryMemory implements EnrollmentRepository {
    private enrollments: Enrollment[];

    constructor() {
        this.enrollments = [];
    }
    public saveEnrollment(enrollment: Enrollment): void {
        this.enrollments.push(enrollment);
    }
    public findAllByClass(level: string, module: string, clazz: string): Enrollment[] {
        return this.enrollments.filter(() =>
            this.enrollments.filter(
                (enrollment) =>
                    enrollment.class.code === clazz &&
                    enrollment.class.module.code === module &&
                    enrollment.class.module.level.code === level,
            ),
        );
    }
    public findByCpf(cpf: string): Enrollment | undefined {
        return this.enrollments.find((enrollment) => enrollment.student.cpf.value === cpf);
    }
    public findByCode(code: string): Enrollment | undefined {
        return this.enrollments.find((enrollment) => enrollment.code.value === code);
    }
    public count(): number {
        return this.enrollments.length;
    }
}

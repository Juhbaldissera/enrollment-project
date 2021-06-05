import { Enrollment } from './Enrollment';
import { EnrollmentRepository } from './EnrollmentRepository';

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
    public count(): number {
        return this.enrollments.length;
    }
}
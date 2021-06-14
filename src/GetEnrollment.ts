import { Enrollment } from './Enrollment';
import { EnrollmentRepository } from './EnrollmentRepository';

export interface GetEnrollmentRequest {
    code: string;
}

export class GetEnrollment {
    constructor(private enrollmentRepository: EnrollmentRepository) {}
    public execute(request: GetEnrollmentRequest): Enrollment {
        const enrollment = this.enrollmentRepository.findByCode(request.code);
        if (!enrollment) throw new Error('Inexistent enrollment');
        return enrollment;
    }
}

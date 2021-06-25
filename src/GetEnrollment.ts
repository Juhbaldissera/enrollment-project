import { Enrollment } from './Enrollment';
import { EnrollmentRepository } from './EnrollmentRepository';
import { RepositoryAbstractFactory } from './RepositoryAbstractFactory';

export interface GetEnrollmentRequest {
    code: string;
}

export class GetEnrollment {
    private enrollmentRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
    }

    public execute(request: GetEnrollmentRequest): Enrollment {
        const enrollment = this.enrollmentRepository.findByCode(request.code);
        if (!enrollment) throw new Error('Inexistent enrollment');
        return enrollment;
    }
}

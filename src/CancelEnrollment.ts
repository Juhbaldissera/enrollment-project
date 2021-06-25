import { CancelEnrollmentInputData } from './CancelEnrollmentInputData';
import { EnrollmentRepository } from './EnrollmentRepository';
import { RepositoryAbstractFactory } from './RepositoryAbstractFactory';

export class CancelEnrollment {
    private enrollmentRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
    }

    public execute(request: CancelEnrollmentInputData): void {
        const enrollment = this.enrollmentRepository.findByCode(request.code);
        if (!enrollment) throw new Error('Inexistent enrollment');
        enrollment.cancel();
    }
}

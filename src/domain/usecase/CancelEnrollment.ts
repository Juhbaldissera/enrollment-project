import { CancelEnrollmentInputData } from './input-output-data/CancelEnrollmentInputData';
import { EnrollmentRepository } from '../repository/EnrollmentRepository';
import { RepositoryAbstractFactory } from '../factory/RepositoryAbstractFactory';

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

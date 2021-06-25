import { EnrollmentRepository } from './EnrollmentRepository';
import { GetEnrollmentInputData } from './GetEnrollmentInputData';
import { GetEnrollmentOutputData } from './GetEnrollmentOutputData';
import { RepositoryAbstractFactory } from './RepositoryAbstractFactory';

export class GetEnrollment {
    private enrollmentRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
    }

    public execute(request: GetEnrollmentInputData): GetEnrollmentOutputData {
        const enrollment = this.enrollmentRepository.findByCode(request.code);
        if (!enrollment) throw new Error('Inexistent enrollment');
        return new GetEnrollmentOutputData({
            code: enrollment.code.value,
            balance: enrollment.getInvoiceBalance(),
        });
    }
}

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
        const getEnrollmentOutputData = new GetEnrollmentOutputData({
            code: enrollment.code.value,
            balance: enrollment.getInvoiceBalance(),
            status: enrollment.status,
        });
        for (const invoice of enrollment.invoices) {
            getEnrollmentOutputData.invoices.push({
                amount: invoice.amount,
                status: invoice.getStatus(request.currentDate),
                dueDate: invoice.dueDate,
                penalty: invoice.getPenalty(request.currentDate),
                interests: invoice.getInterests(request.currentDate),
                balance: invoice.getBalance(),
            });
        }
        return getEnrollmentOutputData;
    }
}

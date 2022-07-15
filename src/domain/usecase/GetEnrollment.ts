import { EnrollmentRepository } from '../repository/EnrollmentRepository';
import { GetEnrollmentInputData } from './input-output-data/GetEnrollmentInputData';
import { GetEnrollmentOutputData } from './input-output-data/GetEnrollmentOutputData';
import { RepositoryAbstractFactory } from '../factory/RepositoryAbstractFactory';

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

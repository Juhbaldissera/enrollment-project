import { EnrollmentRepository } from './EnrollmentRepository';
import { PayInvoiceInputData } from './PayInvoiceInputData';
import { RepositoryAbstractFactory } from './RepositoryAbstractFactory';

export class PayInvoice {
    private enrollmentRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
    }

    public execute(request: PayInvoiceInputData): void {
        const enrollment = this.enrollmentRepository.findByCode(request.code);
        if (!enrollment) throw new Error('Inexistent enrollment');
        const { month, year, amount, paymentDate } = request;
        enrollment.payInvoice(month, year, amount, paymentDate);
    }
}

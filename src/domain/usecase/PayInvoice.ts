import { EnrollmentRepository } from '../repository/EnrollmentRepository';
import { PayInvoiceInputData } from './input-output-data/PayInvoiceInputData';
import { RepositoryAbstractFactory } from '../factory/RepositoryAbstractFactory';

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

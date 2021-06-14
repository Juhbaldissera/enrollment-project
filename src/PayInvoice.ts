import { Enrollment } from './Enrollment';
import { EnrollmentRepository } from './EnrollmentRepository';

export interface PayInvoiceRequest {
    code: string;
    month: number;
    year: number;
    amount: number;
}

export class PayInvoice {
    constructor(private enrollmentRepository: EnrollmentRepository) {}
    public execute(request: PayInvoiceRequest): Enrollment {
        const enrollment = this.enrollmentRepository.findByCode(request.code);
        if (!enrollment) throw new Error('Inexistent enrollment');
        const { code, month, year, amount } = request;
        enrollment.payInvoice(code, month, year, amount);
        return enrollment;
    }
}

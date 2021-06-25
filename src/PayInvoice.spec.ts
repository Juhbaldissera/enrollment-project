import { EnrollmentRequest, EnrollStudent } from './EnrollStudent';
import { PayInvoice, PayInvoiceRequest } from './PayInvoice';
import { RepositoryMemoryFactory } from './RepositoryMemoryFactory';

describe('Pay invoice', () => {
    let enrollStudent: EnrollStudent;
    let payInvoice: PayInvoice;
    const currentYear = new Date().getFullYear();
    const minimumAgeSample = 15;
    const enrollmentRequestSample: EnrollmentRequest = {
        student: {
            name: 'Ana Silva',
            cpf: '832.081.519-34',
            birthDate: `${currentYear - minimumAgeSample}-01-01`,
        },
        level: 'EM',
        module: '1',
        class: 'J',
        installments: 12,
    };
    const payInvoiceRequest: PayInvoiceRequest = {
        code: '2021EM1J0001',
        month: 1,
        year: 2021,
        amount: 1416.66,
    };
    beforeEach(() => {
        const repositoryMemoryFactory = new RepositoryMemoryFactory();
        enrollStudent = new EnrollStudent(repositoryMemoryFactory);
        payInvoice = new PayInvoice(repositoryMemoryFactory);
    });

    it('Should pay enrollment invoice', () => {
        enrollStudent.execute(enrollmentRequestSample);

        const enrollment = payInvoice.execute(payInvoiceRequest);
        expect(enrollment.invoiceBalance).toEqual(-15583.34);
    });

    it('Should throw an error on inexistent invoice', () => {
        enrollStudent.execute(enrollmentRequestSample);

        expect(() => payInvoice.execute({ ...payInvoiceRequest, year: 2010 })).toThrow(new Error('Invalid invoice'));
    });

    it('Should throw an error on inexistent enrollment', () => {
        expect(() => payInvoice.execute(payInvoiceRequest)).toThrow(new Error('Inexistent enrollment'));
    });
});

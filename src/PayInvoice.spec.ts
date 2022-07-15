import { EnrollStudent } from './EnrollStudent';
import { EnrollStudentInputData } from './EnrollStudentInputData';
import { GetEnrollment } from './GetEnrollment';
import { PayInvoice } from './PayInvoice';
import { PayInvoiceInputData } from './PayInvoiceInputData';
import { RepositoryMemoryFactory } from './RepositoryMemoryFactory';

describe('Pay invoice', () => {
    let enrollStudent: EnrollStudent;
    let getEnrollment: GetEnrollment;
    let payInvoice: PayInvoice;
    const issueDate = new Date('2021-06-26');
    const issueYear = issueDate.getFullYear();
    const minimumAgeSample = 15;
    const enrollmentRequestSample: EnrollStudentInputData = {
        studentName: 'Ana Silva',
        studentCpf: '832.081.519-34',
        studentBirthDate: `${issueYear - minimumAgeSample}-01-01`,
        level: 'EM',
        module: '1',
        classroom: 'J',
        installments: 12,
        currentDate: issueDate,
    };
    const payInvoiceRequest: PayInvoiceInputData = {
        code: '2021EM1J0001',
        month: 1,
        year: 2021,
        amount: 1416.66,
        paymentDate: new Date('2021-01-01'),
    };
    beforeEach(() => {
        const repositoryMemoryFactory = new RepositoryMemoryFactory();
        enrollStudent = new EnrollStudent(repositoryMemoryFactory);
        payInvoice = new PayInvoice(repositoryMemoryFactory);
        getEnrollment = new GetEnrollment(repositoryMemoryFactory);
    });

    it('Should pay enrollment invoice', () => {
        enrollStudent.execute(enrollmentRequestSample);

        payInvoice.execute(payInvoiceRequest);
        const enrollment = getEnrollment.execute({ code: '2021EM1J0001', currentDate: new Date('2021-01-01') });
        expect(enrollment.code).toEqual('2021EM1J0001');
        expect(enrollment.balance).toEqual(15583.33);
    });

    it('Should throw an error on inexistent invoice', () => {
        enrollStudent.execute(enrollmentRequestSample);

        expect(() => payInvoice.execute({ ...payInvoiceRequest, year: 2010 })).toThrow(new Error('Invalid invoice'));
    });

    it('Should throw an error on inexistent enrollment', () => {
        expect(() => payInvoice.execute(payInvoiceRequest)).toThrow(new Error('Inexistent enrollment'));
    });

    it('Should pay overdue invoice', () => {
        enrollStudent.execute(enrollmentRequestSample);
        payInvoice.execute({
            ...payInvoiceRequest,
            paymentDate: new Date('2021-06-20'),
            amount: 4129.57,
        });
        const enrollmentAfter = getEnrollment.execute({ code: '2021EM1J0001', currentDate: new Date('2021-06-20') });
        expect(enrollmentAfter.code).toEqual('2021EM1J0001');
        expect(enrollmentAfter.invoices[0].balance).toEqual(0);
    });
});

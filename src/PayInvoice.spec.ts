import { ClassesRepository } from './ClassesRepository';
import { EnrollmentRepository } from './EnrollmentRepository';
import { ClassesRepositoryMemory } from './ClassesRepositoryMemory';
import { EnrollmentRepositoryMemory } from './EnrollmentRepositoryMemory';
import { EnrollmentRequest, EnrollStudent } from './EnrollStudent';
import { PayInvoice, PayInvoiceRequest } from './PayInvoice';

describe('Pay invoice', () => {
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
    let enrollmentRepository: EnrollmentRepository;
    let classesRepository: ClassesRepository;
    beforeEach(() => {
        enrollmentRepository = new EnrollmentRepositoryMemory();
        classesRepository = new ClassesRepositoryMemory();
    });

    it('Should pay enrollment invoice', () => {
        const enrollStudent = new EnrollStudent(enrollmentRepository, classesRepository);
        enrollStudent.execute(enrollmentRequestSample);

        const payInvoice = new PayInvoice(enrollmentRepository);
        const enrollment = payInvoice.execute(payInvoiceRequest);
        expect(enrollment.invoiceBalance).toEqual(-15583.34);
    });

    it('Should throw an error on inexistent invoice', () => {
        const enrollStudent = new EnrollStudent(enrollmentRepository, classesRepository);
        enrollStudent.execute(enrollmentRequestSample);

        const payInvoice = new PayInvoice(enrollmentRepository);
        expect(() => payInvoice.execute({ ...payInvoiceRequest, year: 2010 })).toThrow(new Error('Invalid invoice'));
    });

    it('Should throw an error on inexistent enrollment', () => {
        const payInvoice = new PayInvoice(enrollmentRepository);
        expect(() => payInvoice.execute(payInvoiceRequest)).toThrow(new Error('Inexistent enrollment'));
    });
});

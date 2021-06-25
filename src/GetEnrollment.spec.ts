import { EnrollmentRequest, EnrollStudent } from './EnrollStudent';
import { GetEnrollment } from './GetEnrollment';
import { RepositoryMemoryFactory } from './RepositoryMemoryFactory';

describe('Get Enrollment', () => {
    let enrollStudent: EnrollStudent;
    let getEnrollment: GetEnrollment;
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
    beforeEach(() => {
        const repositoryMemoryFactory = new RepositoryMemoryFactory();
        enrollStudent = new EnrollStudent(repositoryMemoryFactory);
        getEnrollment = new GetEnrollment(repositoryMemoryFactory);
    });

    it('Should get enrollment by code with invoice balance', () => {
        enrollStudent.execute(enrollmentRequestSample);

        const enrollment = getEnrollment.execute({ code: '2021EM1J0001' });
        expect(enrollment.code.value).toEqual('2021EM1J0001');
        expect(enrollment.invoiceBalance).toEqual(-17000);
    });

    it('Should throw an error on inexistent enrollment', () => {
        expect(() => getEnrollment.execute({ code: '2021EM1J0001' })).toThrow(new Error('Inexistent enrollment'));
    });
});

import { ClassesRepository } from './ClassesRepository';
import { EnrollmentRepository } from './EnrollmentRepository';
import { ClassesRepositoryMemory } from './ClassesRepositoryMemory';
import { EnrollmentRepositoryMemory } from './EnrollmentRepositoryMemory';
import { EnrollmentRequest, EnrollStudent } from './EnrollStudent';
import { GetEnrollment } from './GetEnrollment';

describe('Get Enrollment', () => {
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
    let enrollmentRepository: EnrollmentRepository;
    let classesRepository: ClassesRepository;
    beforeEach(() => {
        enrollmentRepository = new EnrollmentRepositoryMemory();
        classesRepository = new ClassesRepositoryMemory();
    });

    it('Should get enrollment by code with invoice balance', () => {
        const enrollStudent = new EnrollStudent(enrollmentRepository, classesRepository);
        enrollStudent.execute(enrollmentRequestSample);

        const getEnrollment = new GetEnrollment(enrollmentRepository);
        const enrollment = getEnrollment.execute({ code: '2021EM1J0001' });
        expect(enrollment.code.value).toEqual('2021EM1J0001');
        expect(enrollment.invoiceBalance).toEqual(-17000);
    });

    it('Should throw an error on inexistent enrollment', () => {
        const getEnrollment = new GetEnrollment(enrollmentRepository);
        expect(() => getEnrollment.execute({ code: '2021EM1J0001' })).toThrow(new Error('Inexistent enrollment'));
    });
});

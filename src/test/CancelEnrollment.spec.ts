import { EnrollStudent } from '../domain/usecase/EnrollStudent';
import { EnrollStudentInputData } from '../domain/usecase/input-output-data/EnrollStudentInputData';
import { GetEnrollment } from '../domain/usecase/GetEnrollment';
import { RepositoryMemoryFactory } from '../adapter/factory/RepositoryMemoryFactory';
import { CancelEnrollment } from '../domain/usecase/CancelEnrollment';

describe('Cancel Enrollment', () => {
    let enrollStudent: EnrollStudent;
    let getEnrollment: GetEnrollment;
    let cancelEnrollment: CancelEnrollment;
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
    beforeEach(() => {
        const repositoryMemoryFactory = new RepositoryMemoryFactory();
        enrollStudent = new EnrollStudent(repositoryMemoryFactory);
        cancelEnrollment = new CancelEnrollment(repositoryMemoryFactory);
        getEnrollment = new GetEnrollment(repositoryMemoryFactory);
    });

    it('Should get enrollment by code with invoice balance', () => {
        enrollStudent.execute(enrollmentRequestSample);

        cancelEnrollment.execute({ code: '2021EM1J0001' });
        const enrollment = getEnrollment.execute({ code: '2021EM1J0001', currentDate: new Date('2021-01-01') });
        expect(enrollment.code).toEqual('2021EM1J0001');
        expect(enrollment.status).toEqual('cancelled');
    });

    it('Should throw an error on inexistent enrollment', () => {
        expect(() => getEnrollment.execute({ code: '2021EM1J0001', currentDate: new Date('2021-01-01') })).toThrow(
            new Error('Inexistent enrollment'),
        );
    });
});

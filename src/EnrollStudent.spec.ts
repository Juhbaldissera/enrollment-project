import { RepositoryMemoryFactory } from './RepositoryMemoryFactory';
import { EnrollmentRequest, EnrollStudent } from './EnrollStudent';

describe('Enroll student', () => {
    let enrollStudent: EnrollStudent;
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
        enrollStudent = new EnrollStudent(new RepositoryMemoryFactory());
    });

    it('Should not enroll without valid student name', () => {
        expect(() =>
            enrollStudent.execute({
                ...enrollmentRequestSample,
                student: {
                    ...enrollmentRequestSample.student,
                    name: 'Ana',
                },
            }),
        ).toThrow(new Error('Invalid name'));
    });

    it('Should not enroll without valid student cpf', () => {
        expect(() =>
            enrollStudent.execute({
                ...enrollmentRequestSample,
                student: {
                    ...enrollmentRequestSample.student,
                    cpf: '123.456.789-99',
                },
            }),
        ).toThrow(new Error('Invalid cpf'));
    });

    it('Should not enroll duplicated student', () => {
        enrollStudent.execute(enrollmentRequestSample);
        expect(() => enrollStudent.execute(enrollmentRequestSample)).toThrow(
            new Error('Enrollment with duplicated student is not allowed'),
        );
    });

    it('Should generate enrollment code', () => {
        const lastEnrollment = enrollStudent.execute(enrollmentRequestSample);
        expect(lastEnrollment.code.value).toEqual('2021EM1J0001');
    });

    it('Should throw an error on inexistent class', () => {
        expect(() =>
            enrollStudent.execute({
                ...enrollmentRequestSample,
                class: 'X',
            }),
        ).toThrow(new Error('Inexistent class'));
    });

    it('Should not enroll student below minimum age', () => {
        const OverBirthYear = currentYear - minimumAgeSample + 1;
        expect(() =>
            enrollStudent.execute({
                ...enrollmentRequestSample,
                student: {
                    ...enrollmentRequestSample.student,
                    birthDate: `${OverBirthYear}-01-01`,
                },
            }),
        ).toThrow(new Error('Student below minimum age'));
    });

    it('Should not enroll student over class capacity', () => {
        const fakeCPFs = [
            '655.468.214-77',
            '094.418.663-77',
            '317.160.847-25',
            '785.874.446-11',
            '116.091.627-65',
            '901.655.875-63',
            '126.715.755-05',
            '229.226.637-79',
            '411.973.098-02',
            '470.868.677-30',
        ];
        fakeCPFs.forEach((fakeCPF) =>
            enrollStudent.execute({
                ...enrollmentRequestSample,
                student: {
                    ...enrollmentRequestSample.student,
                    cpf: fakeCPF,
                },
            }),
        );
        expect(() => enrollStudent.execute(enrollmentRequestSample)).toThrow(new Error('Class is over capacity'));
    });

    it('Should not enroll after que end of the class', () => {
        expect(() =>
            enrollStudent.execute({
                ...enrollmentRequestSample,
                level: 'EF1',
                module: '2',
                class: 'B',
            }),
        ).toThrow(new Error('Class is already finished'));
    });

    it('Should not enroll after 25% of the start of the class', () => {
        expect(() =>
            enrollStudent.execute({
                ...enrollmentRequestSample,
                level: 'EF1',
                module: '3',
                class: 'C',
            }),
        ).toThrow(new Error('Class is already started'));
    });

    it('Should generate the invoices based on the number of installments, rounding each amount and applying the rest in the last invoice', () => {
        const lastEnrollment = enrollStudent.execute(enrollmentRequestSample);
        expect(lastEnrollment.invoices[0].amount).toEqual(1416.66);
        expect(lastEnrollment.invoices[1].amount).toEqual(1416.66);
        expect(lastEnrollment.invoices[2].amount).toEqual(1416.66);
        expect(lastEnrollment.invoices[3].amount).toEqual(1416.66);
        expect(lastEnrollment.invoices[4].amount).toEqual(1416.66);
        expect(lastEnrollment.invoices[5].amount).toEqual(1416.66);
        expect(lastEnrollment.invoices[6].amount).toEqual(1416.66);
        expect(lastEnrollment.invoices[7].amount).toEqual(1416.66);
        expect(lastEnrollment.invoices[8].amount).toEqual(1416.66);
        expect(lastEnrollment.invoices[9].amount).toEqual(1416.66);
        expect(lastEnrollment.invoices[10].amount).toEqual(1416.66);
        expect(lastEnrollment.invoices[11].amount).toEqual(1416.73);
    });
});

import { EnrollmentRequest, EnrollStudent } from './EnrollStudent';

describe('Enroll student', () => {
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
    };

    it('Should not enroll without valid student name', () => {
        const enrollStudent = new EnrollStudent();
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
        const enrollStudent = new EnrollStudent();
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
        const enrollStudent = new EnrollStudent();
        enrollStudent.execute(enrollmentRequestSample);
        expect(() => enrollStudent.execute(enrollmentRequestSample)).toThrow(
            new Error('Enrollment with duplicated student is not allowed'),
        );
    });

    it('Should generate enrollment code', () => {
        const enrollStudent = new EnrollStudent();
        enrollStudent.execute(enrollmentRequestSample);
        const lastEnrollment = enrollStudent.enrollments[0];
        expect(lastEnrollment.code.value).toEqual('2021EM1J0001');
    });

    it('Should throw an error on inexistent class', () => {
        const enrollStudent = new EnrollStudent();
        expect(() =>
            enrollStudent.execute({
                ...enrollmentRequestSample,
                class: 'X',
            }),
        ).toThrow(new Error('Inexistent class'));
    });

    it('Should not enroll student below minimum age', () => {
        const enrollStudent = new EnrollStudent();
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
});

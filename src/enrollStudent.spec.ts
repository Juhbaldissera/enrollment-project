import { EnrollmentRequest, EnrollStudent } from './enrollStudent';

describe('Enroll student', () => {
    const enrollmentRequestSample: EnrollmentRequest = {
        student: {
            name: 'Ana Silva',
            cpf: '832.081.519-34',
        },
    };

    it('Should not enroll without valid student name', () => {
        const enrollStudent = new EnrollStudent();
        expect(() =>
            enrollStudent.execute({
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
});

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
        ).toThrow(new Error('Invalid student name'));
    });
});

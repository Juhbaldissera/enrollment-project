import { ClassesRepository } from './ClassesRepository';
import { EnrollmentRepository } from './EnrollmentRepository';
import { ClassesRepositoryMemory } from './ClassesRepositoryMemory';
import { EnrollmentRepositoryMemory } from './EnrollmentRepositoryMemory';
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
    let enrollmentRepository: EnrollmentRepository;
    let classesRepository: ClassesRepository;
    beforeEach(() => {
        enrollmentRepository = new EnrollmentRepositoryMemory();
        classesRepository = new ClassesRepositoryMemory();
    });

    it('Should not enroll without valid student name', () => {
        const enrollStudent = new EnrollStudent(enrollmentRepository, classesRepository);
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
        const enrollStudent = new EnrollStudent(enrollmentRepository, classesRepository);
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
        const enrollStudent = new EnrollStudent(enrollmentRepository, classesRepository);
        enrollStudent.execute(enrollmentRequestSample);
        expect(() => enrollStudent.execute(enrollmentRequestSample)).toThrow(
            new Error('Enrollment with duplicated student is not allowed'),
        );
    });

    it('Should generate enrollment code', () => {
        const enrollStudent = new EnrollStudent(enrollmentRepository, classesRepository);
        const lastEnrollment = enrollStudent.execute(enrollmentRequestSample);
        expect(lastEnrollment.code.value).toEqual('2021EM1J0001');
    });

    it('Should throw an error on inexistent class', () => {
        const enrollStudent = new EnrollStudent(enrollmentRepository, classesRepository);
        expect(() =>
            enrollStudent.execute({
                ...enrollmentRequestSample,
                class: 'X',
            }),
        ).toThrow(new Error('Inexistent class'));
    });

    it('Should not enroll student below minimum age', () => {
        const enrollStudent = new EnrollStudent(enrollmentRepository, classesRepository);
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
        const enrollStudent = new EnrollStudent(enrollmentRepository, classesRepository);
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
        const enrollStudent = new EnrollStudent(enrollmentRepository, classesRepository);
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
        const enrollStudent = new EnrollStudent(enrollmentRepository, classesRepository);
        expect(() =>
            enrollStudent.execute({
                ...enrollmentRequestSample,
                level: 'EF1',
                module: '3',
                class: 'C',
            }),
        ).toThrow(new Error('Class is already started'));
    });
});

import { ClassesRepository } from './ClassesRepository';
import { Enrollment } from './Enrollment';
import { EnrollmentRepository } from './EnrollmentRepository';
import { RepositoryAbstractFactory } from './RepositoryAbstractFactory';
import Student from './Student';

export interface EnrollmentRequest {
    student: {
        name: string;
        cpf: string;
        birthDate: string;
    };
    level: string;
    module: string;
    class: string;
    installments: number;
}

export class EnrollStudent {
    private classesRepository: ClassesRepository;
    private enrollmentRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.classesRepository = repositoryFactory.createClassesRepository();
        this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
    }

    public execute(enrollmentRequest: EnrollmentRequest): Enrollment {
        const {
            student: { name, cpf, birthDate },
            level,
            module,
            class: clazz,
            installments,
        } = enrollmentRequest;

        const student = new Student(name, cpf, birthDate);
        const existingEnrollment = this.enrollmentRepository.findByCpf(enrollmentRequest.student.cpf);
        if (existingEnrollment) {
            throw new Error('Enrollment with duplicated student is not allowed');
        }
        const existingClass = this.classesRepository.find(level, module, clazz);
        const studentsEnrolledInClass = this.enrollmentRepository.findAllByClass(level, module, clazz);
        if (existingClass.capacity === studentsEnrolledInClass.length) {
            throw new Error('Class is over capacity');
        }
        const sequence = this.enrollmentRepository.count() + 1;
        const issueDate = new Date();
        const enrollment = new Enrollment(issueDate, student, sequence, existingClass, installments);
        this.enrollmentRepository.saveEnrollment(enrollment);
        return enrollment;
    }
}

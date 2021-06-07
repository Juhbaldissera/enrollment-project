import { ClassesRepository } from './ClassesRepository';
import { Enrollment } from './Enrollment';
import { EnrollmentRepository } from './EnrollmentRepository';
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

function round(num: number): number {
    return Math.round(num * 100 + Number.EPSILON) / 100;
}

export class EnrollStudent {
    constructor(private enrollmentRepository: EnrollmentRepository, private classes: ClassesRepository) {}

    public execute(enrollmentRequest: EnrollmentRequest): Enrollment {
        const {
            student: { name, cpf, birthDate },
            level,
            module,
            class: clazz,
            installments: installmentsNumber,
        } = enrollmentRequest;

        const student = new Student(name, cpf, birthDate);
        const existingEnrollment = this.enrollmentRepository.findByCpf(enrollmentRequest.student.cpf);
        if (existingEnrollment) {
            throw new Error('Enrollment with duplicated student is not allowed');
        }
        const existingClass = this.classes.find(level, module, clazz);
        const studentsEnrolledInClass = this.enrollmentRepository.findAllByClass(level, module, clazz);
        if (existingClass.capacity === studentsEnrolledInClass.length) {
            throw new Error('Class is over capacity');
        }
        const installmentValue = round(existingClass.module.price / installmentsNumber);
        const installments = new Array(installmentsNumber).fill(installmentValue);
        installments[installments.length - 1] += round(
            existingClass.module.price - installmentValue * installmentsNumber,
        );
        const sequence = this.enrollmentRepository.count() + 1;
        const issueDate = new Date();
        const enrollment = new Enrollment(issueDate, student, sequence, existingClass, installments);
        this.enrollmentRepository.saveEnrollment(enrollment);
        return enrollment;
    }
}

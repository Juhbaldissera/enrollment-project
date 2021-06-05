import { ClassesRepository } from './ClassesRepository';
import { Code } from './Code';
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
}

export class EnrollStudent {
    constructor(private enrollmentRepository: EnrollmentRepository, private classes: ClassesRepository) {}

    public execute(enrollmentRequest: EnrollmentRequest): Enrollment {
        const {
            student: { name, cpf, birthDate },
            level,
            module,
            class: clazz,
        } = enrollmentRequest;

        const student = new Student(name, cpf, birthDate);
        const existingEnrollment = this.enrollmentRepository.findByCpf(enrollmentRequest.student.cpf);
        if (existingEnrollment) {
            throw new Error('Enrollment with duplicated student is not allowed');
        }
        const existingClass = this.classes.find(level, module, clazz);
        if (student.getAge() < existingClass.module.minimumAge) {
            throw new Error('Student below minimum age');
        }
        const studentsEnrolledInClass = this.enrollmentRepository.findAllByClass(level, module, clazz);
        if (existingClass.capacity === studentsEnrolledInClass.length) {
            throw new Error('Class is over capacity');
        }
        if (existingClass.period.endDate.getTime() < Date.now()) {
            throw new Error('Class is already finished');
        }
        const classAlreadyStarted = existingClass.period.startDate.getTime() < Date.now();

        if (classAlreadyStarted) {
            const timeHasPassed = existingClass.period.startDate.getTime() - Date.now();
            const percentageHasPassed = (timeHasPassed * 100) / existingClass.getClassDurationTime();
            if (percentageHasPassed > 25) {
                throw new Error('Class is already started');
            }
        }
        const code = new Code(level, module, clazz, this.enrollmentRepository.count() + 1);
        const enrollment = new Enrollment(student, code, existingClass);
        this.enrollmentRepository.saveEnrollment(enrollment);
        return enrollment;
    }
}

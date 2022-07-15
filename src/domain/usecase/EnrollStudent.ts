import { ClassesRepository } from '../repository/ClassesRepository';
import { Enrollment } from '../entity/Enrollment';
import { EnrollmentRepository } from '../repository/EnrollmentRepository';
import { EnrollStudentInputData } from './input-output-data/EnrollStudentInputData';
import { EnrollStudentOutputData } from './input-output-data/EnrollStudentOutputData';
import { RepositoryAbstractFactory } from '../factory/RepositoryAbstractFactory';
import Student from '../entity/Student';

export class EnrollStudent {
    private classesRepository: ClassesRepository;
    private enrollmentRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.classesRepository = repositoryFactory.createClassesRepository();
        this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
    }

    public execute(enrollStudentInputData: EnrollStudentInputData): EnrollStudentOutputData {
        const { studentName, studentBirthDate, studentCpf, level, module, classroom, installments, currentDate } =
            enrollStudentInputData;

        const student = new Student(studentName, studentCpf, studentBirthDate);
        const existingEnrollment = this.enrollmentRepository.findByCpf(studentCpf);
        if (existingEnrollment) {
            throw new Error('Enrollment with duplicated student is not allowed');
        }
        const existingClass = this.classesRepository.find(level, module, classroom);
        const studentsEnrolledInClass = this.enrollmentRepository.findAllByClass(level, module, classroom);
        if (existingClass.capacity === studentsEnrolledInClass.length) {
            throw new Error('Class is over capacity');
        }
        const sequence = this.enrollmentRepository.count() + 1;
        const enrollment = new Enrollment(currentDate, student, sequence, existingClass, installments);
        this.enrollmentRepository.saveEnrollment(enrollment);
        const enrollStudentOutputData = new EnrollStudentOutputData(enrollment.code.value);
        for (const invoice of enrollment.invoices) {
            enrollStudentOutputData.invoices.push(invoice.clone());
        }
        return enrollStudentOutputData;
    }
}

import { ClassesRepository } from './ClassesRepository';
import { EnrollmentRepository } from './EnrollmentRepository';

export interface RepositoryAbstractFactory {
    createClassesRepository(): ClassesRepository;
    createEnrollmentRepository(): EnrollmentRepository;
}

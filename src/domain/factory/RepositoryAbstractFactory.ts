import { ClassesRepository } from '../repository/ClassesRepository';
import { EnrollmentRepository } from '../repository/EnrollmentRepository';

export interface RepositoryAbstractFactory {
    createClassesRepository(): ClassesRepository;
    createEnrollmentRepository(): EnrollmentRepository;
}

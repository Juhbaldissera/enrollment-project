import { ClassesRepositoryMemory } from '../repository/ClassesRepositoryMemory';
import { EnrollmentRepository } from '../../domain/repository/EnrollmentRepository';
import { EnrollmentRepositoryMemorySingleton } from '../repository/EnrollmentRepositoryMemorySingleton';
import { RepositoryAbstractFactory } from '../../domain/factory/RepositoryAbstractFactory';

export class RepositoryMemoryFactory implements RepositoryAbstractFactory {
    constructor() {
        EnrollmentRepositoryMemorySingleton.destroy();
    }

    createClassesRepository(): ClassesRepositoryMemory {
        return new ClassesRepositoryMemory();
    }

    createEnrollmentRepository(): EnrollmentRepository {
        return EnrollmentRepositoryMemorySingleton.getInstance();
    }
}

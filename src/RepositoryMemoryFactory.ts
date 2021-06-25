import { ClassesRepositoryMemory } from './ClassesRepositoryMemory';
import { EnrollmentRepository } from './EnrollmentRepository';
import { EnrollmentRepositoryMemorySingleton } from './EnrollmentRepositoryMemorySingleton';
import { RepositoryAbstractFactory } from './RepositoryAbstractFactory';

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

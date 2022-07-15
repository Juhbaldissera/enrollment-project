import { EnrollmentRepository } from '../../domain/repository/EnrollmentRepository';
import { EnrollmentRepositoryMemory } from './EnrollmentRepositoryMemory';

export class EnrollmentRepositoryMemorySingleton {
    static instance: EnrollmentRepository | undefined;

    private constructor() {
        // empty
    }

    static getInstance(): EnrollmentRepository {
        if (!EnrollmentRepositoryMemorySingleton.instance) {
            EnrollmentRepositoryMemorySingleton.instance = new EnrollmentRepositoryMemory();
        }
        return EnrollmentRepositoryMemorySingleton.instance;
    }

    static destroy(): void {
        EnrollmentRepositoryMemorySingleton.instance = undefined;
    }
}

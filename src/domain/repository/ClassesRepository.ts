import { Class } from '../entity/Class';

export interface ClassesRepository {
    find(levelCode: string, moduleCode: string, classCode: string): Class;
}

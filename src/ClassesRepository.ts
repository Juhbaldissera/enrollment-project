import { Class } from './Class';

export interface ClassesRepository {
    find(levelCode: string, moduleCode: string, classCode: string): Class;
}

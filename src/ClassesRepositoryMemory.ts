import { Class } from './Class';
import { Level } from './Level';
import { Module } from './Module';

export class ClassesRepositoryMemory {
    classes: Class[];

    constructor() {
        const levelEM = new Level('EM', 'Ensino Médio');
        const levelEF1 = new Level('EF1', 'Ensino Fundamental I');
        const levelEF2 = new Level('EF2', 'Ensino Fundamental II');
        const module1 = new Module(levelEF1, '1', '1o Ano', 6, 15000);
        const module2 = new Module(levelEF1, '2', '2o Ano', 7, 15000);
        const module3 = new Module(levelEF1, '3', '3o Ano', 8, 15000);
        const module4 = new Module(levelEF1, '4', '4o Ano', 9, 15000);
        const module5 = new Module(levelEF1, '5', '5o Ano', 10, 15000);
        const module6 = new Module(levelEF2, '6', '6o Ano', 11, 14000);
        const module7 = new Module(levelEF2, '7', '7o Ano', 12, 14000);
        const module8 = new Module(levelEF2, '8', '8o Ano', 13, 14000);
        const module9 = new Module(levelEF2, '9', '9o Ano', 14, 14000);
        const moduleEM1 = new Module(levelEM, '1', '1o Ano', 15, 17000);
        const moduleEM2 = new Module(levelEM, '2', '2o Ano', 16, 17000);
        const moduleEM3 = new Module(levelEM, '3', '3o Ano', 17, 17000);
        this.classes = [
            new Class(module1, 'A', 10),
            new Class(module2, 'B', 10),
            new Class(module3, 'C', 10),
            new Class(module4, 'D', 10),
            new Class(module5, 'E', 10),
            new Class(module6, 'F', 10),
            new Class(module7, 'G', 10),
            new Class(module8, 'H', 10),
            new Class(module9, 'I', 10),
            new Class(moduleEM1, 'J', 10),
            new Class(moduleEM2, 'K', 10),
            new Class(moduleEM3, 'L', 10),
        ];
    }

    find(levelCode: string, moduleCode: string, classCode: string): Class {
        const existingClass = this.classes.find(
            (clazz) =>
                clazz.code === classCode && clazz.module.code === moduleCode && clazz.module.level.code === levelCode,
        );
        if (!existingClass) {
            throw new Error('Inexistent class');
        }
        return existingClass;
    }
}

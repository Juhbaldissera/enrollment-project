import { Cpf } from './Cpf';
import { Name } from './Name';

export default class Student {
    name: Name;
    cpf: Cpf;
    birthDate: Date;

    constructor(name: string, cpf: string, birthDate: string) {
        this.name = new Name(name);
        this.cpf = new Cpf(cpf);
        this.birthDate = new Date(birthDate);
    }

    getAge(): number {
        const today = new Date();
        let age = today.getFullYear() - this.birthDate.getFullYear();
        const month = today.getMonth() - this.birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < this.birthDate.getDate())) {
            age--;
        }
        return age;
    }
}

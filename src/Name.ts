export class Name {
    value: string;

    constructor(value: string) {
        const REGEX_VALID_NAME = /^([A-Za-z]+ )+([A-Za-z])+$/;
        if (!REGEX_VALID_NAME.test(value)) throw new Error('Invalid name');
        this.value = value;
    }
}

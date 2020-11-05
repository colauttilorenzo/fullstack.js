export class Error {

    public readonly code!: string;
    public readonly message: any;

    constructor(code: string, message: any) {
        this.code = code;
        this.message = message;
    }

}
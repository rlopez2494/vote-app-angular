export class User {
    constructor(
        public _id: string,
        public name: string,
        public lastName: string,
        public email: string,
        private _token: string
    ) {}

    get token() {
        return this._token;
    }
}
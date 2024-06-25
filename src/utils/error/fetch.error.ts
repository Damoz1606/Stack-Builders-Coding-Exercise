export class FetchError extends Error {
    constructor(
        public readonly response: Response,
        public readonly message: string,
        public data: any
    ) {
        super(message);
    }
}
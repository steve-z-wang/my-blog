export class BlogError extends Error {
    constructor(
        message: string,
        public status: number = 500
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends BlogError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
    }
}
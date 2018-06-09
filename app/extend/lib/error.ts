class TheError extends Error {
    name: string;
    statusCode: number;
    message: string;
    stack: string | undefined;

    constructor(error: string | Error) {
        super();
        
        if (error instanceof Error) {
            this.message = error.message;
            this.stack = error.stack;
        }

        if (typeof error === 'string') {
            this.message = error;
        }
    }
}

export class BizError extends TheError {
    statusCode: number;

    name = 'BusinessError';

    constructor(error: string | Error) {
        super(error);
        this.statusCode = 200;
    }
};

export class SysError extends TheError {
    statusCode: number;

    name = 'SystemError';

    constructor(error: string | Error) {
        super(error);
        this.statusCode = 404;
    }
};

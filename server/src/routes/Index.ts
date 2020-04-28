import { Request, Response, NextFunction } from 'express';

class IndexRouter {

    constructor() { }

    getIndex(request: Request, response: Response) {
        response.send(`<h1>ServiceNow Express Server Running on port ${process.env.PORT} </h1>`);
        console.log('Index Route Activated');
    }

}

export const indexRouter = new IndexRouter().getIndex;
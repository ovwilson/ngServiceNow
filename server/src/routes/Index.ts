import { Request, Response, NextFunction } from 'express';

class Router {

    constructor() { }

    get(request: Request, response: Response) {
        response.send(`<h1>ServiceNow Express Server Running on port ${process.env.PORT} </h1>`);
        console.log('Index Route Activated');
    }

}

export default new Router();
import { Request, Response, NextFunction } from 'express';
import { authOptions } from './../libs/auth';
import service from '../libs/snow';

class Router {

    constructor() { }

    get(request: Request, response: Response, next: NextFunction) {
        console.log(`NOW Route Activated:`,request.url);
        console.log(`NOW Route Parameters : ${JSON.stringify(request.params)}`);
        console.log(`NOW Route Query : ${JSON.stringify(request.query)}`);
        service.get(authOptions, request, response, next);
    }

}

export default new Router();


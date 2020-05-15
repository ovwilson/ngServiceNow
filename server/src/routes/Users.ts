import { FakerUser } from './../../../../snow/src/app/features/users/models/user';
import { Request, Response, NextFunction } from 'express';
import { db, users } from './../libs/db';
import { createDocs } from './../libs/utils';

class Router {

    constructor() { 
        this.createMany();
    }

    get(request: Request, response: Response) {
        response.send(users.find());
        console.log('Users Route Activated');
    }

    createMany() { users.insert(createDocs(20, FakerUser)); }

}

export default new Router();
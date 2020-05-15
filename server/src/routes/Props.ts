import { FakerProp } from '../../../../snow/src/app/features/props/models/prop';
import { Request, Response, NextFunction } from 'express';
import { props } from '../libs/db';
import { createDocs } from '../libs/utils';

class Router {

    constructor() { this.createMany()}

    get(request: Request, response: Response) {
        response.send(props.find());
        console.log('Props Route Activated');
    }

    createMany() { props.insert(createDocs(20, FakerProp)); }

}

export default new Router();
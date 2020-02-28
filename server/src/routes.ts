import * as express from 'express';
import { indexRouter } from './routes/Index';
import tableNowRouter from './routes/TableNow';

class Routes {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.setCommonRoutes();
    }

    public setCommonRoutes() {
        this.router.route('/').get(indexRouter);
        this.router.route('/table').get(tableNowRouter.get)
    }

}

export default new Routes().router;
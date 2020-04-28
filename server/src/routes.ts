import * as express from 'express';
import { indexRouter } from './routes/Index';
import NOWRouter from './routes/NOW';

class Routes {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.setCommonRoutes();
        this.setAttachmentAPIRoutes();
        this.setTableAPIRoutes();
    }

    public setCommonRoutes() {
        this.router.route('/').get(indexRouter);
    }

    public setAttachmentAPIRoutes() {
        this.router.route('/api/now/:name')
            .get(NOWRouter.get);
    }

    public setTableAPIRoutes() {
        this.router.route('/api/now/:name/:table')
            .get(NOWRouter.get);
    }

}

export default new Routes().router;
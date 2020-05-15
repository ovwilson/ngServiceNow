import * as express from 'express';
import IndexRouter from './routes/Index';
import NOWRouter from './routes/NOW';
import UsersRouter from './routes/Users';
import PropsRouter from './routes/Props';

class Routes {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.setCommonRoutes();
        this.setAttachmentAPIRoutes();
        this.setTableAPIRoutes();
        this.setScopedAPIRoutes();
    }

    public setCommonRoutes() {
        this.router.route('/').get(IndexRouter.get);
    }

    public setAttachmentAPIRoutes() {
        this.router.route('/api/now/:name')
            .get(NOWRouter.get);
    }

    public setTableAPIRoutes() {
        this.router.route('/api/now/:name/:table')
            .get(NOWRouter.get);

        this.router.route('/sys_user')
            .get(UsersRouter.get);

        this.router.route('/props')
            .get(PropsRouter.get);
    }

    public setScopedAPIRoutes() {
        this.router.route('/api/x_398178_award_fee/awards/roles')
            .get(NOWRouter.get);
    }

}

export default new Routes().router;
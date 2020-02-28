import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { default as routes } from './routes';

class Server {
    public app: express.Application;
    public PORT = process.env.PORT || 3000;

    constructor() {
        this.app = express();
        this.config();
        this.middleware();
    }

    public config() {
        console.log('Environment', [ 
            process.env.SN_HOST,
            process.env.SN_PATH,
            process.env.SN_USER,
            process.env.SN_PASS 
        ])
    }

    public middleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static(process.cwd() + '/server/src/public'));
        this.app.use(cors());
        this.app.use(routes);
        this.app.listen(this.PORT, () =>
            console.log(`Express Server Running on port ${this.PORT}`)
        );
    }

}

export default new Server().app;
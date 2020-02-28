import { Request, Response, NextFunction } from 'express';
import * as https from 'https';

class Router {

    constructor() { }

    get(request: Request, response: Response) {
        console.log('Table Now Route Activated');

        const options = {
            host: process.env.SN_HOST,
            path: process.env.SN_PATH,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${process.env.SN_USER}:${process.env.SN_PASS}`).toString('base64')
            }
        }

        https.get(options, (resp) => {
            let responseChunks: any[] = [];
            console.log(resp.statusCode, ':' + resp.statusMessage);
            resp.setEncoding('utf8');

            resp.on('data', (chunk) => {
                responseChunks.push(chunk);
            })

            resp.on('end', () => {
                let body = responseChunks.join('');
                try {
                    body = JSON.parse(body);
                    response.json(body);
                }
                catch (err) {
                    response.send('Error' + err)
                }

            })

        }).on('error', (err) => {
            response.send('Error: ' + err)
        });


    }

}

export default new Router();


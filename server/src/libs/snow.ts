import { Request, Response, NextFunction } from 'express';
import * as https from 'https';

export const get = (authOptions: any, request: Request, response: Response, next: NextFunction) => {
    
    authOptions = ({...authOptions, path : request.url })

    https.get(authOptions, (resp) => {
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
        response.send('Error: ' + err);
        // next(err);
    });

}

export default { get : get }
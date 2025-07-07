// Conceptual sketch for application.ts
import * as http from 'http';
import { Router }  from './router';
import { RequestHandler } from './router/types';
import { httzRequest } from './router/request';
import { httzResponse } from './router/response';

export class  httz {
    private server: http.Server;
    private router: Router;

    constructor() {
        this.router = new Router();

        this.server = http.createServer(async (rawReq: http.IncomingMessage, rawRes: http.ServerResponse) => {
            const req = new httzRequest(rawReq);
            const res = new httzResponse(rawRes);

            await req.init();
            this.router.handle(req, res);
        });
    }

    public get(path: string, handler: RequestHandler) {
        this.router.get(path, handler)
    }

    public post(path: string, handler: RequestHandler) {
        this.router.post(path, handler)
    }

    public listen(port: number, callback: () => void): void {
        this.server.listen(port, callback);
    }

}
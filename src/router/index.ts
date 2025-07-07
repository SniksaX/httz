//router/index.ts

import { Request, RequestHandler, Response, RouteDefinition } from './types';

export class Router {

    private routes: RouteDefinition[] = [];

    public get(path: string, handler: RequestHandler) {
        const obj : RouteDefinition = {
            path: path, handler: handler, method: 'GET'
        }
        this.routes.push(obj)   
    }

    public post(path: string, handler: RequestHandler) {
        const obj: RouteDefinition = {
            path: path, handler: handler, method: 'POST'
        }
        this.routes.push(obj)
    }



public handle(req: Request, res: Response): void {
    const requestedPath = req.url;
    const requestedMethod = req.method;

    for (const route of this.routes) {
        
        if (route.path === requestedPath && route.method === requestedMethod) {
            route.handler(req, res);
            return;
        }
    }
        res.status(404).send('problem found');
    }
}
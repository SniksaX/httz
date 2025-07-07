//router/index.ts

import { Request, RequestHandler, Response, RouteDefinition } from './types';

export class Router {

    private routes: RouteDefinition[] = [];

    public get(path: string, handler: RequestHandler) {
        const segments = path.split('/').filter(s => s.length > 0);

        const obj : RouteDefinition = {
            path: path,
            handler: handler,
            method: 'GET', 
            pathSegments: segments
        }
        this.routes.push(obj)   
    }

    public post(path: string, handler: RequestHandler) {
        const segments = path.split('/').filter(s => s.length > 0);

        const obj : RouteDefinition = {
            path: path,
            handler: handler,
            method: 'POST', 
            pathSegments: segments
        }
        this.routes.push(obj)   
    }

    public patch(path: string, handler: RequestHandler) {
        const segments = path.split('/').filter(s => s.length > 0);

        const obj : RouteDefinition = {
            path: path,
            handler: handler,
            method: 'PATCH', 
            pathSegments: segments
        }
        this.routes.push(obj)   
    }

    public put(path: string, handler: RequestHandler) {
        const segments = path.split('/').filter(s => s.length > 0);

        const obj : RouteDefinition = {
            path: path,
            handler: handler,
            method: 'PUT', 
            pathSegments: segments
        }
        this.routes.push(obj)   
    }

    public delete(path: string, handler: RequestHandler) {
        const segments = path.split('/').filter(s => s.length > 0);

        const obj : RouteDefinition = {
            path: path,
            handler: handler,
            method: 'DELETE', 
            pathSegments: segments
        }
        this.routes.push(obj)   
    }

    public handle(req: Request, res: Response): void {
        const incomingUrl = req.url; // '/users/123?foo=bar'
        const requestedMethod = req.method;

        if (!incomingUrl) {
            res.status(400).send('Bad Request: URL missing');
            return;
        }

        const pathOnly = incomingUrl.split('?')[0]; // '/users/123'
        const incomingSegments = pathOnly.split('/').filter(s => s.length > 0); // e.g., ['users', '123']

        for (const route of this.routes) {
            let isMatch = true;
            const params: { [key: string]: string } = {}; // store params for this potential match

            // check if method
            if (route.method !== requestedMethod) {
                continue; 
            }

            // check if segment lengths
            if (route.pathSegments.length !== incomingSegments.length) {
                continue;
            }

            // cmpr segments one by one
            for (let i = 0; i < route.pathSegments.length; i++) {
                const routeSegment = route.pathSegments[i];
                const incomingSegment = incomingSegments[i];

                if (routeSegment.startsWith(':')) {
                    const paramName = routeSegment.substring(1); // rm ':'
                    params[paramName] = incomingSegment;
                } else if (routeSegment !== incomingSegment) {
                    isMatch = false;
                    break; 
                }
            }

            if (isMatch) {
                req._setParams(params);
                route.handler(req, res);
                return;
            }
        }

        res.status(404).send('Not Found');
    }
}
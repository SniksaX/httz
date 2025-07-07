//router/types.ts

import { httzRequest } from './request';
import { httzResponse } from './response';

export type RequestHandler = (req: Request, res: Response) => void;
export type Request = httzRequest
export type Response = httzResponse
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
export type RouteDefinition = { path: string; method: HttpMethod; handler: RequestHandler, pathSegments: string[];  }
//router/request.ts

import * as http from "http"
import { formEncoderHelper } from "../utils/helpers";

export class httzRequest {
    
    private _rawReq: http.IncomingMessage
    private _parsedBody: any;
    private _queryParams: { [key: string]: string | string[]} = {};
    private _routeParams: {[key: string] : string} = {};

    constructor(rawReq: http.IncomingMessage){
        this._rawReq = rawReq
    }

    public async init(): Promise<void> {
        
        let rawBodyString: string;
        const url = this._rawReq.url;

        try {

            rawBodyString = await this._readBody();

        } catch (error) {
            console.error('Error reading request body:', error);
            this._parsedBody = null;
            return;
        }

        if (url) {
            const queryIndex = url.indexOf('?');
            if (queryIndex !== -1) {
                const queryString = url.substring(queryIndex + 1);
                if (queryString.length > 0) {
                    this._queryParams = Object.fromEntries(formEncoderHelper(queryString));
                }
            }
        }

        const contentType = this._rawReq.headers['content-type'];

        try {
            if (rawBodyString.length === 0) {
                this._parsedBody = {};
                return;
            }

            if (contentType?.includes('application/json')) {
                this._parsedBody = JSON.parse(rawBodyString);
            } else if (contentType?.includes('application/x-www-form-urlencoded')) {
                this._parsedBody = Object.fromEntries(formEncoderHelper(rawBodyString) );
            } else if (contentType?.includes('multipart/form-data')) {
                console.warn('Soon');
            } else {
                this._parsedBody = rawBodyString;
            }
        } catch (parseError) {
            console.error(`Error parsing body for Content-Type '${contentType}':`, parseError);
            this._parsedBody = rawBodyString;
        }
    }

    private _readBody(): Promise<string> {
        return new Promise((resolve, rejects) => {
            const bodyChunks : Buffer[] = []

            this._rawReq.on('data', (chunk: Buffer) => {
                bodyChunks.push(chunk)
            })

            this._rawReq.on('end', () => {
                const temp = Buffer.concat(bodyChunks)
                const test = temp.toString('utf-8');
                resolve(test)
            })

            this._rawReq.on('error', (err: Error) => {
                    rejects(err)
            })
        })
    }

    public _setParams(params: {[key: string]: string}): void {
        this._routeParams = params
    }

    public get body(): any {
        return this._parsedBody;
    }

    public get url(): string | undefined {
        return this._rawReq.url
    }

    public get method(): string | undefined {
        return this._rawReq.method
    }

    public get query(): { [key: string]: string | string[]} {
        return this._queryParams
    }

    public get params(): {[key : string]: string} {
        return this._routeParams
    }
}
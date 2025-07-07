//router/request.ts

import * as http from "http"

export class httzRequest {
    
    private _rawReq: http.IncomingMessage
    private _parsedBody: any;

    constructor(rawReq: http.IncomingMessage){
        this._rawReq = rawReq
    }

    public async init(): Promise<void> {
        let rawBodyString: string;
        try {
            rawBodyString = await this._readBody();
        } catch (error) {
            console.error('Error reading request body:', error);
            this._parsedBody = null;
            return;
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
                const pairs = rawBodyString.split('&');
                const result = new Map<string, string>();
                pairs.forEach(pair => {
                    const [encodedKey, encodedValue] = pair.split("=");
                    const key = decodeURIComponent(encodedKey);
                    const value = decodeURIComponent(encodedValue || '');

                    result.set(key, value);
                });
                this._parsedBody = Object.fromEntries(result);
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

    public get body(): any {
        return this._parsedBody;
    }

    public get url(): string | undefined {
        return this._rawReq.url
    }

    public get method(): string | undefined {
        return this._rawReq.method
    }
}
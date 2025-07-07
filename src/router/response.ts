//router/response.ts

import * as http from "http"

export class httzResponse {
    private _rawRes: http.ServerResponse;

    constructor(rawRes: http.ServerResponse){
        this._rawRes = rawRes
    }

    public status(code: number ): httzResponse{
        this._rawRes.statusCode = code;
        return this
    }

    public send(body: string | Buffer) : void {
        this._rawRes.appendHeader('Content-Type', 'text/plain' )
        this._rawRes.end(body)
    }

    public json(data: object) {
        this._rawRes.appendHeader('Content-Type', 'application/json')
        const dataJson = JSON.stringify(data)
        this._rawRes.end(dataJson)
    }

}
# `httz`

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg?logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM Version](https://img.shields.io/npm/v/httz.svg)](https://www.npmjs.com/package/httz)

**`httz` is a minimalist, unopinionated Node.js web framework for building performant HTTP APIs.**

Leveraging Node.js's native `http` module, `httz` provides essential routing and request/response abstraction layers with a focus on simplicity and efficiency.

## Features

*   **Core HTTP Handling:** Direct interaction with Node.js `http.IncomingMessage` and `http.ServerResponse` for maximum control.
*   **Request Routing:** Supports `GET` and `POST` methods for path-based request dispatching.
*   **Automatic Body Parsing:**
    *   Parses `application/json` payloads into `req.body`.
    *   Parses `application/x-www-form-urlencoded` data into `req.body`.
*   **Enhanced Request Object (`req`):** Provides convenient access to `url`, `method`, and the parsed `body`.
*   **Enhanced Response Object (`res`):** Streamlines response creation with chainable methods like `res.status()`, `res.send()`, and `res.json()`.
*   **TypeScript Native:** Built entirely in TypeScript, offering strong type safety throughout.

## Installation

```bash
SOON!
npm install httz
# or
yarn add httz
```

## Usage

Create your application entry point (e.g., `app.ts` or `index.ts`):

```typescript
import { httz } from 'httz';

const app = new httz();
const PORT = 3000;

// Define a GET route
app.get('/', (req, res) => {
    res.status(200).send('Hello from httz!');
});

// Define a POST route with body parsing
app.post('/api/data', (req, res) => {
    // req.body will contain the parsed JSON or URL-encoded data
    console.log('Received body:', req.body);
    res.status(200).json({
        message: 'Data processed successfully',
        receivedData: req.body
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`httz server running on http://localhost:${PORT}`);
});
```

## API Reference

### `new Aperture()`

Creates a new `httz` application instance.

### `app.get(path: string, handler: RequestHandler)`

Registers a `GET` route. `handler` is a function `(req: Request, res: Response) => void | Promise<void>`.

### `app.post(path: string, handler: RequestHandler)`

Registers a `POST` route. `handler` is a function `(req: Request, res: Response) => void | Promise<void>`.

### `app.listen(port: number, callback: () => void)`

Starts the HTTP server on the specified port.

### `Request` Object

The `req` object passed to handlers:
*   `req.url`: Original request URL.
*   `req.method`: HTTP request method (e.g., `'GET'`, `'POST'`).
*   `req.body`: Parsed request body (object for JSON/URL-encoded, string for text/plain, or `null`/`{}` if unhandled/empty).

### `Response` Object

The `res` object passed to handlers:
*   `res.status(code: number)`: Sets the HTTP status code. Returns `this` for chaining.
*   `res.send(body: string | Buffer)`: Sends a plain text or binary response.
*   `res.json(data: object)`: Sends a JSON response with `Content-Type: application/json`.

## Contributing / Roadmap

`httz` is an open-source project. Future enhancements are planned, including:
*   `req.query` and `req.params` parsing.
*   Robust `multipart/form-data` handling.
*   Middleware system.
*   Improved error handling and routing capabilities.

Contributions and feedback are welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

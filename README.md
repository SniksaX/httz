README.md Content for httz:
httz
![alt text](https://img.shields.io/badge/Node.js-18%2B-green.svg?logo=node.js)

![alt text](https://img.shields.io/badge/TypeScript-Strict-blue.svg?logo=typescript)

![alt text](https://img.shields.io/badge/License-MIT-yellow.svg)
httz: The no-nonsense HTTP foundation for robust Node.js applications.
What is httz?
httz (pronounced "hitt-z") is a lightweight, opinionated web framework for Node.js, meticulously crafted from the ground up in TypeScript. It provides the essential building blocks for web APIs – routing, request body parsing (JSON, URL-encoded), and elegant response handling – by directly leveraging Node.js's native http module.
The core philosophy behind httz is deep understanding through direct implementation. It avoids external runtime dependencies for its core functionality, aiming for absolute minimalism and transparency in how HTTP requests and responses are managed.
Why httz? (The "Tryharder" Philosophy)
In my journey as a developer, I've always been driven by the desire to understand the "how" and "why" beneath the abstractions. Rather than simply using existing frameworks, I chose to build httz to gain an unparalleled, low-level insight into:
How Node.js handles HTTP streams (IncomingMessage, ServerResponse).
The mechanics of request routing and dispatch.
The complexities of asynchronous request body parsing (JSON, x-www-form-urlencoded).
Designing an intuitive API (e.g., res.json(), req.body) that simplifies native Node.js operations.
httz is more than a framework; it's a testament to the power of perseverance and a deep dive into the foundational elements of web development. It's built on the principle of "making it by out-working and out-lasting everyone else," by truly understanding the underlying systems.
Features
Minimal Footprint: No external runtime dependencies for core features.
Core Routing: Define routes for GET and POST methods based on URL paths.
Request Body Parsing:
Automatic parsing for application/json payloads.
From-scratch parsing for application/x-www-form-urlencoded data.
Enhanced Request & Response Objects:
req.url, req.method for easy access to request details.
req.body provides the parsed request payload as an object or string.
res.status().send(), res.json() for streamlined response creation.
TypeScript Native: Written entirely in TypeScript for strong type safety and maintainability.
Getting Started
Installation
Generated bash
# If you plan to use it as a local project (not published to npm yet)
git clone https://github.com/SirajRahal/httz.git # Replace with your actual repo
cd httz
npm install # Installs dev dependencies (TypeScript, ts-node)
npm run build # Compiles to JavaScript in the 'dist' folder
Use code with caution.
Bash
Basic Usage (in index.ts or app.ts)
Generated typescript
import { Aperture } from 'httz'; // Once published to npm, or adjust path if local

const app = new Aperture();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello from httz!');
});

app.post('/submit', (req, res) => {
    console.log('Received body:', req.body); // req.body will contain parsed JSON or form data
    res.json({ message: 'Data processed!', received: req.body });
});

app.listen(PORT, () => {
    console.log(`httz server running on http://localhost:${PORT}`);
    console.log(`Try: curl http://localhost:${PORT}/`);
    console.log(`Try: curl -X POST -H "Content-Type: application/json" -d '{"name":"Siraj"}' http://localhost:${PORT}/submit`);
    console.log(`Try: curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d 'user=Siraj&action=submit' http://localhost:${PORT}/submit`);
});
Use code with caution.
TypeScript
Future Enhancements (Roadmap)
req.query and req.params parsing.
Support for multipart/form-data (likely through strategic integration of a minimalist, battle-tested streaming parser like busboy or formidable to maintain httz's core focus).
Middleware support.
Improved error handling.
License
This project is licensed under the MIT License - see the LICENSE file for details.

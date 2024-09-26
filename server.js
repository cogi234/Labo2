import { createServer } from 'http';
import HttpContext from './httpContext.js';
import * as router from './router.js';
import { handleCORSPreflight } from './cors.js';
import { handleStaticResourceRequest } from './staticResourcesServer.js'

const handlers = [
    handleCORSPreflight,
    handleStaticResourceRequest,
    router.apiEndpoint
];

const server = createServer(async (req, res) => {
    console.log('\n',req.method, req.url);

    let httpContext = await HttpContext.create(req, res);

    for (const handler of handlers) {
        if (await handler(httpContext))
            return;
    }

    httpContext.response.notFound('This endpoint does not exist...');
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
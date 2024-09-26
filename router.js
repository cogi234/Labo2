export async function apiEndpoint(httpContext) {
    if (!httpContext.path.isAPI)
        return false;

    let controllerName = httpContext.path.controllerName;
    if (controllerName != undefined) {
        try {
            //Try to dynamically import the controller
            const { default: Controller } = (await import('./controllers/' + controllerName + '.js'));

            let controller = new Controller(httpContext);
            switch (httpContext.req.method) {
                case 'GET':
                    controller.get(httpContext.path.id);
                    return true;
                case 'POST':
                    if (httpContext.payload)
                        controller.post(httpContext.payload);
                    else
                        httpContext.response.unsupported();
                    return true;
                case 'PUT':
                    if (httpContext.payload)
                        controller.put(httpContext.payload);
                    else
                        httpContext.response.unsupported();
                    return true;
                case 'DELETE':
                    controller.remove(httpContext.path.id);
                    return true;
                default:
                    httpContext.response.notImplemented();
                    return true;
            }
        } catch (error) {
            console.log('API endpoint Error message: \n', error.message);
            console.log('Stack: \n', error.stack);
            httpContext.response.notFound();
            return true;
        }
    }
    
    return false;
}
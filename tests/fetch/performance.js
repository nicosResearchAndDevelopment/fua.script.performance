const
    methods                   = require('./methods.js'),
    methodNames               = Object.keys(methods),
    {AsyncTest, AsyncRuntime} = require('../../src/model.js'),
    uuid                      = require('@fua/core.uuid'),
    dataGenerator             = () => ({
        url:         `http://localhost:${methods.port}/${uuid.v4()}/`,
        method:      'GET',
        mode:        'cors',
        credentials: 'omit',
        cache:       'no-store',
        redirect:    'follow'
    }),
    methodComparison          = new AsyncRuntime(dataGenerator);

for (let name of methodNames) {
    const test = new AsyncTest(name, methods[name]);
    methodComparison.register(test);
}
methods.start()
    .then(() => methodComparison.exec(1000, 5))
    .then(runtime => runtime.print())
    .catch(console.error)
    .finally(() => methods.stop());

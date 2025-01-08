const
    http                  = require('http'),
    node_fetch            = require('node-fetch'),
    {fetch: undici_fetch} = require('undici'),
    HTTP                  = require('@fua/client.http');

Object.defineProperties(exports, {
    port:  {
        enumerable: false,
        value:      3000
    },
    start: {
        enumerable: false,
        value:      async function () {
            this.server = http.createServer((request, response) => {
                response.write(request.url);
                response.end();
            });
            await new Promise(resolve => this.server.listen(this.port, resolve));
        }
    },
    stop:  {
        enumerable: false,
        value:      async function () {
            await new Promise(resolve => this.server.close(resolve));
        }
    }
});

exports['no-fetch'] = async function (param) {
    return param.url;
};

exports['native-fetch'] = async function (param) {
    const response = await fetch(param.url, param);
    return await response.text();
};

exports['node-fetch'] = async function (param) {
    const response = await node_fetch(param.url, param);
    return await response.text();
};

exports['undici-fetch'] = async function (param) {
    const response = await undici_fetch(param.url, param);
    return await response.text();
};

exports['client-fetch'] = async function (param) {
    return await HTTP.fetch(param.url, param).text();
};

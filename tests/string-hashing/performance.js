const
    methodNames      = require('./methods.js'),
    // methodNames    = Object.keys(methodNames),
    methodWhitelist  = ['murmur2', 'murmur3', 'md4', 'md5', 'sha1', 'sha256'],
    {Test, Runtime}  = require('../../src/model.js'),
    crypto           = require('crypto'),
    dataGenerator    = () => crypto.randomBytes(512),
    methodComparison = new Runtime(dataGenerator);

for (let name of methodWhitelist) {
    const test = new Test(name, methodNames[name]);
    methodComparison.register(test);
}

methodComparison.exec(100, 1000).print();

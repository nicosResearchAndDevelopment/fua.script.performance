const
    hashingMethods   = require('../code/hashing-methods.js'),
    // methodWhitelist    = Object.keys(hashingMethods),
    methodWhitelist  = ['murmur2', 'murmur3', 'md4', 'md5', 'sha1', 'sha256'],
    {Test, Runtime}  = require('../src/index.js'),
    crypto           = require('crypto'),
    dataGenerator    = () => crypto.randomBytes(512),
    methodComparison = new Runtime(dataGenerator);

for (let name of methodWhitelist) {
    const test = new Test(name, hashingMethods[name]);
    methodComparison.register(test);
}

methodComparison.exec(100, 1000).print();

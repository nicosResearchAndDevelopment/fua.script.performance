const
    murmurhash = require('murmurhash'),
    crypto     = require('crypto');

exports.murmur2 = (value) => murmurhash.v2(value);
exports.murmur3 = (value) => murmurhash.v3(value);

for (let algorithm of crypto.getHashes()) {
    exports[algorithm] = (value) => crypto.createHash(algorithm).update(value).digest();
}

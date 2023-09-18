const
    keyParts     = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqr', 'stu', 'vwx', 'yz0', '123', '456', '789'],
    keyVariants  = [],
    flatObject   = {},
    nestedObject = {};

for (let first of keyParts) {
    nestedObject[first] = {};
    for (let second of keyParts) {
        nestedObject[first][second] = {};
        for (let third of keyParts) {
            nestedObject[first][second][third] = {};
            for (let fourth of keyParts) {
                nestedObject[first][second][third][fourth] = {};
                for (let fifth of keyParts) {
                    const combined = first + second + third + fourth + fifth;
                    keyVariants.push([first, second, third, fourth, fifth]);
                    flatObject[combined]                              = combined;
                    nestedObject[first][second][third][fourth][fifth] = combined;
                }
            }
        }
    }
}

exports._nestingDepth = 5;
exports._keyParts     = keyParts.length;
exports._keyVariants  = keyVariants.length;

exports._randomKeyVariant = function () {
    const randomIndex = Math.floor(Math.random() * keyVariants.length);
    return keyVariants[randomIndex];
};

exports.accessFlatObject = function ([first, second, third, fourth, fifth]) {
    const combined = first + second + third + fourth + fifth;
    return flatObject[combined] === combined;
};

exports.accessNestedObject = function ([first, second, third, fourth, fifth]) {
    const combined = first + second + third + fourth + fifth;
    return nestedObject[first][second][third][fourth][fifth] === combined;
};

exports.noObjectAccess = function ([first, second, third, fourth, fifth]) {
    const combined = first + second + third + fourth + fifth;
    return combined === combined;
};

const methods = require('./methods.js');

for (let [name, method] of Object.entries(methods)) {
    const result = method();
    if (typeof result !== 'number') throw new Error('invalid value for ' + name);
}

console.log('all results are valid');

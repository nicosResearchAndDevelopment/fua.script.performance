const {Runtime, Test} = require('./model.js');

// create a runtime with a data generator
const generator = () => 1e6 * Math.random()
const runtime   = new Runtime(generator)

// register tests with a name and a test method
runtime.register(new Test('ident', (value) => value))
runtime.register(new Test('floor', (value) => Math.floor(value)))
runtime.register(new Test('trunc', (value) => Math.trunc(value)))

// execute the runtime with multiple repetitions and a length for the testing-data-array
runtime.exec(1e3, 1e4)

// print the results
runtime.print()

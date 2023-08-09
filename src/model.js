const model = exports;

model.Timer        = require('./model/Timer.js');
model.Test         = require('./model/Test.js');
model.Runtime      = require('./model/Runtime.js');
model.AsyncTest    = require('./model/AsyncTest.js');
model.AsyncRuntime = require('./model/AsyncRuntime.js');

Object.freeze(model);

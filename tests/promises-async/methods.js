exports.flat_sync = function (count = 0) {
    count++;
    count++;
    count++;
    return count;
};

function increment(count) {
    return new Promise(
        resolve => process.nextTick(resolve, count + 1)
        // resolve => setImmediate(resolve, count + 1)
        // resolve => setTimeout(resolve, 0, count + 1)
    );
} // increment

exports.nested_promise = function (count = 0) {
    return new Promise((resolve, reject) => {
        increment(count)
            .then((count) => {
                increment(count)
                    .then((count) => {
                        increment(count)
                            .then((count) => {
                                resolve(count);
                            })
                            .catch(reject);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
}; // nested_promise

exports.flat_promise = function (count = 0) {
    return new Promise((resolve, reject) => {
        increment(count)
            .then(increment)
            .then(increment)
            .then(resolve)
            .catch(reject);
    });
} // flat_promise

exports.flat_promise_minimal = function flat_promise_minimal(count = 0) {
    return increment(count)
        .then(increment)
        .then(increment);
} // flat_promise

exports.with_async = async function with_async(count = 0) {
    count = await increment(count);
    count = await increment(count);
    count = await increment(count);
    return count;
} // with_async

exports.with_async_minimal = async function with_async_minimal(count = 0) {
    return increment(await increment(await increment(count)));
} // with_async_minimal

function assert(value, message) {
    if (!value) throw new Error(message);
}

function isString(value) {
    return typeof value === 'string';
}

function isArray(value) {
    return Array.isArray(value);
}

function isObject(value) {
    return value && typeof value === 'object';
}

class RegularClass {

    #propA = null;

    get propA() {
        return this.#propA;
    }

    set propA(value) {
        assert(isString(value), 'invalid propA');
        assert(!this.#propA, 'propA already defined');
        this.#propA = value;
    }

    #propB = null;

    get propB() {
        return this.#propB;
    }

    set propB(value) {
        assert(isArray(value), 'invalid propB');
        assert(!this.#propB, 'propB already defined');
        this.#propB = value;
    }

    #propC = null;

    get propC() {
        return this.#propC;
    }

    set propC(value) {
        assert(isObject(value), 'invalid propC');
        assert(!this.#propC, 'propC already defined');
        this.#propC = value;
    }
}

exports.regularAccess = function ({key, value}) {
    const instance = new RegularClass();
    instance[key]  = value;
    assert(instance[key] === value, 'value does not match');
};

const _privateProperties = new WeakMap();

function defineClassProperty(classFn, propName, checkFn) {
    Object.defineProperty(classFn.prototype, propName, {
        get() {
            const _private = _privateProperties.get(this);
            return _private?.[propName] ?? null;
        },
        set(value) {
            assert(checkFn(value), 'invalid ' + propName);
            let _private = _privateProperties.get(this);
            if (!_private) _privateProperties.set(this, _private = {});
            assert(!(propName in _private), propName + ' already defined');
            _private[propName] = value;
        }
    });
}

class BuildClass {
}

defineClassProperty(BuildClass, 'propA', isString);
defineClassProperty(BuildClass, 'propB', isArray);
defineClassProperty(BuildClass, 'propC', isObject);

exports.buildAccess = function ({key, value}) {
    const instance = new BuildClass();
    instance[key]  = value;
    assert(instance[key] === value, 'value does not match');
};

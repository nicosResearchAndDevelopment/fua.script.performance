# @fua/script.performance

## Interface

```ts
interface Timer {
    sec: number
    msec: number
    nsec: number
    constructor(): this
    reset(): this
    start(): this
    stop(): this
    toString(locale?: string): string
}

/** @template T */
interface Test {
    time: number
    runs: number
    constructor(name: string, func: (value: T) => any): this
    reset(): this
    exec(dataArr: Array<T>): this
    result(locale?: string): { test: string, runs: string, time: string, average: string }
}

/** @template T */
interface Runtime {
    constructor(generator?: (value: undefined, index: number) => T): this
    reset(): this
    register(test: Test<T>): this
    exec(repetitions: number, length: number): this
    print(locale?: string): void
}

/** @template T */
interface AsyncTest extends Test {
    exec(dataArr: Array<T>): Promise<this>
}

/** @template T */
interface AsyncRuntime extends Runtime {
    register(test: AsyncTest<T>): this
    exec(repetitions: number, length: number): Promise<this>
}

```

## Usage

```js
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

// ┌─────────┬─────────┬──────────────┬─────────────┬──────────────┐
// │ (index) │  test   │     runs     │    time     │   average    │
// ├─────────┼─────────┼──────────────┼─────────────┼──────────────┤
// │    0    │ 'ident' │ '10,000,000' │ '~ 2.27 s'  │  '~ 227 ns'  │
// │    1    │ 'trunc' │ '10,000,000' │ '~ 2.337 s' │ '~ 233.7 ns' │
// │    2    │ 'floor' │ '10,000,000' │ '~ 2.375 s' │ '~ 237.5 ns' │
// └─────────┴─────────┴──────────────┴─────────────┴──────────────┘
```

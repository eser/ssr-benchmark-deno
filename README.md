# SSR Framework Benchmark (Deno Edition)

It's a Deno variant of [SSR Framework Benchmark](https://github.com/eknkc/ssr-benchmark) originally developed by [Ekin Koc](https://github.com/eknkc).

The original work is an experiment in response to https://twitter.com/thdxr/status/1777782835249553517 where it is stated that Next.JS is a lot slower on server side rendering compared to Vanilla React.

This is not a comprehensive or scientific test. Just wanted to compare each in a setup a little complex than just printing `hello world`.

## Results

| (idx) |    name    | ops/sec |    average (ms)     |  margin  | samples | relative to preact |
| ----- | ---------- | ------- | ------------------- | -------- | ------- | ------------------ |
| 0     | "preact"   | 2321    | 0.43075173565645114 | "±0.45%" | 23216   |                    |
| 1     | "solid-js" | 464     | 2.1547274624326884  | "±3.24%" | 4645    | "5.00 x slower"    |
| 2     | "react"    | 190     | 5.249411071916024   | "±0.44%" | 1905    | "12.22 x slower"   |

## Test Environment

- Only SSR. We do not even build the client bundles for most of the modules.
- Instead of going through the http server, the benchmark code creates mock http requests and responses. This ensures that we do not pay for tcp overhead.
- Tests ran on Deno `v1.42.1 aarch64-apple-darwin` on my Macbook Pro M1 Max
- Each framework renders a table of 1000 rows, each containing two uuid columns.
- The table data is emulated as asynchronously on respective frameworks.
- Streaming rendering used on react and solid-js.

## Running

```sh
$ deno task start
```

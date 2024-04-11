import * as react from "./pkg/react/mod.tsx";
// import * as fresh from "./pkg/fresh/mod.ts";
import { TinyBench } from "./deps.ts";

const main = async () => {
  const handlers = [
    {
      name: "react",
      handler: react.handler,
    },
    // {
    //   name: "fresh",
    //   handler: fresh.handler,
    // },
    {
      name: "preact",
      handler: await import("./pkg/preact/dist/entry-server.mjs").then((x) =>
        x.handler
      ),
    },
    {
      name: "solid-js",
      handler: await import("./pkg/solid-js/dist/entry-server.mjs").then((x) =>
        x.handler
      ),
    },
  ];

  const bench = new TinyBench.Bench({
    // iterations: 1,
    time: 10_000,
  });
  const req = new Request("http://localhost:8080");

  for (const handler of handlers) {
    bench.add(handler.name, async () => {
      await handler.handler(req);
    });
  }

  await bench.warmup();
  await bench.run();

  const table = bench.tasks.map((task) => {
    if (task.result === undefined || task.result.error !== undefined) {
      return {
        "name": task.name,
        "ops/sec": NaN,
        "average (ms)": NaN,
        "margin": NaN,
        "samples": NaN,
      };
    }

    return {
      "name": task.name,
      "ops/sec": parseInt(task.result?.hz.toString(), 10),
      "average (ms)": task.result.mean,
      "margin": `\xb1${task.result.rme.toFixed(2)}%`,
      "samples": task.result.samples.length,
    };
  });

  const results = table
    .map((x) => ({ ...x, "ops/sec": x["ops/sec"] }))
    .toSorted((a, b) => b["ops/sec"] - a["ops/sec"]);

  const maxOps = Math.max(...results.map((x) => x["ops/sec"]));

  console.table(
    results.map((x, i) => ({
      ...x,
      [`relative to ${results[0]["name"]}`]: i === 0
        ? ""
        : `${(maxOps / x["ops/sec"]).toFixed(2)} x slower`,
    })),
  );
  console.log();
};

main();

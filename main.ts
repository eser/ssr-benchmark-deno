import * as react from "./pkg/react/mod.tsx";
import * as preact from "./pkg/preact/mod.ts";
// import * as fresh from "./pkg/fresh/mod.ts";
import { TinyBench } from "./deps.ts";

const main = async () => {
  const handlers = [
    {
      name: "react",
      handler: react.handler,
    },
    {
      name: "preact",
      handler: preact.handler,
    },
    {
      name: "fresh",
      // temporarily disabled due to import maps
      handler: () => {}, // fresh.handler,
    },
    {
      name: "preact-vite",
      handler: await import("./pkg/preact-vite/dist/entry-server.mjs").then((
        x,
      ) => x.handler),
    },
    {
      name: "solid-js",
      handler: await import("./pkg/solid-js/dist/entry-server.mjs").then((x) =>
        x.handler
      ),
    },
  ];

  const bench = new TinyBench.Bench({
    iterations: 3,
    // time: 10_000,
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

  const maxOps = Math.max(
    ...table.filter((x) => !Number.isNaN(x["ops/sec"])).map((x) =>
      x["ops/sec"]
    ),
  );

  const results = table.toSorted((a, b) => {
    if (Number.isNaN(b["ops/sec"])) {
      return -1;
    }

    return b["ops/sec"] - a["ops/sec"];
  });
  const best = results[0];

  console.table(
    results
      .map((x, i) => ({
        ...x,
        [`relative to ${best["name"]}`]: i === 0 || Number.isNaN(x["ops/sec"])
          ? "-"
          : `${(maxOps / x["ops/sec"]).toFixed(2)} x slower`,
      })),
  );
  console.log();
};

main();

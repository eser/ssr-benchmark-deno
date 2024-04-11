import { createHandler } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";

export const handler = await createHandler(manifest, config);

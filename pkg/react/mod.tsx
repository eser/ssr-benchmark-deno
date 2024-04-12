import { React, ReactDOMServer } from "./deps.ts";
import { App } from "./app.tsx";

export const handler = async (_request: Request): Promise<Response> => {
  const stream = await ReactDOMServer.renderToReadableStream(<App />); // , { bootstrapScripts: ['/main.js'] }

  return new Response(stream, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
};

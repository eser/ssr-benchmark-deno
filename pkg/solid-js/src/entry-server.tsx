import { renderToStream } from "npm:solid-js/web";
import { App } from "./app.tsx";

export const handler = (_request: Request): Promise<Response> => {
  const stream = renderToStream(() => <App />);

  const { readable, writable } = new TransformStream();
  stream.pipeTo(writable);

  return Promise.resolve(
    new Response(readable, {
      headers: { "content-type": "text/html; charset=utf-8" },
    }),
  );
};

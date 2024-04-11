import * as preactRenderToString from "npm:preact-render-to-string@^6.4.2";
import { App } from "./app.tsx";

export const handler = async (_request: Request): Promise<Response> => {
  const html = await preactRenderToString.renderToStringAsync(await App());

  return new Response(html, {
    headers: { "content-type": "text/plain" },
  });
};

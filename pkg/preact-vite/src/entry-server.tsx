import { PreactRenderToString } from "./deps.ts";
import { App } from "./app.tsx";

export const handler = async (_request: Request): Promise<Response> => {
  const html = await PreactRenderToString.renderToStringAsync(await App());

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
};

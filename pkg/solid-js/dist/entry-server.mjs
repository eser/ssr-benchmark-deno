import { createComponent, ssr, ssrHydrationKey, escape, renderToStream } from 'npm:solid-js/web';
import { Suspense, createResource, For } from 'npm:solid-js';

const data = Array(1e3).fill(0).map((_, _i) => ({
  id: crypto.randomUUID(),
  name: crypto.randomUUID()
}));
const testData = () => {
  return Promise.resolve(data);
};

var _tmpl$ = ["<table", "><tbody>", "</tbody></table>"], _tmpl$2 = ["<tr", "><td>", "</td><td>", "</td></tr>"];
function Table() {
  const [tdata] = createResource(testData);
  return ssr(_tmpl$, ssrHydrationKey(), escape(createComponent(For, {
    get each() {
      return tdata();
    },
    children: (entry) => createComponent(Row, {
      entry
    })
  })));
}
function Row(props) {
  return ssr(_tmpl$2, ssrHydrationKey(), escape(props.entry.id), escape(props.entry.name));
}
function App() {
  return createComponent(Suspense, {
    get children() {
      return createComponent(Table, {});
    }
  });
}

const handler = (_request) => {
  const stream = renderToStream(() => createComponent(App, {}));
  const {
    readable,
    writable
  } = new TransformStream();
  stream.pipeTo(writable);
  return Promise.resolve(new Response(readable, {
    headers: {
      "content-type": "text/plain"
    }
  }));
};

export { handler };

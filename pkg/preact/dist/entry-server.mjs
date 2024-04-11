import * as preactRenderToString from 'npm:preact-render-to-string@^6.4.2';
import { jsx, jsxs } from 'npm:preact/jsx-runtime';

const data = Array(1e3).fill(0).map((_, _i) => ({
  id: crypto.randomUUID(),
  name: crypto.randomUUID()
}));
const testData = () => {
  return Promise.resolve(data);
};

function Table(props) {
  return jsx("table", {
    children: jsx("tbody", {
      children: props.data.map((entry) => jsx(Entry, {
        entry
      }, entry.id))
    })
  });
}
function Entry(props) {
  return jsxs("tr", {
    children: [jsx("td", {
      children: props.entry.id
    }), jsx("td", {
      children: props.entry.name
    })]
  });
}
async function App() {
  const tdata = await testData();
  return jsx(Table, {
    data: tdata
  });
}

const handler = async (_request) => {
  const html = await preactRenderToString.renderToStringAsync(await App());
  return new Response(html, {
    headers: {
      "content-type": "text/plain"
    }
  });
};

export { handler };

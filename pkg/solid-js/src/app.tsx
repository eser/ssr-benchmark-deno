import { createResource, For, Suspense } from "npm:solid-js";
import { type Entry, testData } from "../../testdata/mod.ts";

function Table() {
  const [tdata] = createResource(testData);

  return (
    <table>
      <tbody>
        <For each={tdata()}>{(entry: Entry) => <Row entry={entry} />}</For>
      </tbody>
    </table>
  );
}

function Row(props: { entry: Entry }) {
  return (
    <tr>
      <td>{props.entry.id}</td>
      <td>{props.entry.name}</td>
    </tr>
  );
}

export function App() {
  return (
    <Suspense>
      <Table />
    </Suspense>
  );
}

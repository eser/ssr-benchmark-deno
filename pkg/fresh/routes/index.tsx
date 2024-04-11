import { Suspense } from "npm:preact/compat";
import { type Entry, testData } from "../../testdata/mod.ts";

function Table(props: { data: Entry[] }) {
  return (
    <table>
      <tbody>
        {props.data.map((entry: Entry) => <Entry
          key={entry.id}
          entry={entry}
        />)}
      </tbody>
    </table>
  );
}

function Entry(props: { entry: Entry }) {
  return (
    <tr>
      <td>{props.entry.id}</td>
      <td>{props.entry.name}</td>
    </tr>
  );
}

export default async function Home() {
  const tdata = await testData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Table data={tdata} />
    </Suspense>
  );
}

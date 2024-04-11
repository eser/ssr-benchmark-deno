import { React } from "./deps.ts";
import { type Entry, testData } from "../testdata/mod.ts";

function Table(props: { data: Entry[] }) {
  const tdata = React.use(props.data);

  return (
    <table>
      <tbody>
        {tdata.map((entry: Entry) => <Entry key={entry.id} entry={entry} />)}
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

export function App() {
  const dataRef = React.useRef<Entry[]>();

  if (!dataRef.current) {
    dataRef.current = testData();
  }

  return (
    <React.Suspense>
      <Table data={dataRef.current} />
    </React.Suspense>
  );
}

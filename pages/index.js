import { useEffect, useState } from "react";
import Filter from "../components/filter/filter.component";
import Table from "../components/table/table.component";
import { objectTimeCheckpointsToDuration } from "../helperFunctions";

export default function Home() {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    fetch("api/get-userdata").then((res) => {
      res.json().then((parsedRes) => {
        const formattedObject = objectTimeCheckpointsToDuration(parsedRes);
        setData(formattedObject);
      });
    });
  }, []);
  return (
    <div>
      {data ? <Filter data={data} setFilteredData={setFilteredData} /> : null}
      {filteredData ? <Table data={filteredData} /> : null}
      <h4>*В ячейках указано время в минутах</h4>
    </div>
  );
}

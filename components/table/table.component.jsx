import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  apiRequestTemplate,
  handleDragToHorizontalScroll,
  sortHelper,
} from "../../helperFunctions";
import Pagination from "../pagination/pagination.component";
import SortBox from "../sortbox/sortbox.component";
import TableRow from "../table-row/table-row.component";
import WeatherModal from "../weatherModal/weatherModal.component";
import styles from "./table.module.css";

const Table = ({ data }) => {
  const itemsPerPage = 10;
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [isWeatherVisible, setIsWeatherVisible] = useState(false);
  const [weatherData, setWeatherData] = useState("");

  let isMouseDown = false;
  let startX;
  let scrollLeft;

  const tableContainer = useRef();

  useEffect(() => {
    handleDragToHorizontalScroll(
      tableContainer,
      isMouseDown,
      startX,
      scrollLeft
    );
  }, []);

  useEffect(() => setPageNumber(1), [data]);

  const showedArr = data.slice(
    pageNumber * itemsPerPage - itemsPerPage,
    pageNumber * itemsPerPage
  );

  const handleWeatherReq = async ({ target }) => {
    const day = target.getAttribute("day");

    const startDate = new Date(2021, 4, day, 5)
      .toISOString()
      .replace(".000Z", "");
    const endDate = new Date(2021, 4, parseInt(day) + 1, 0)
      .toISOString()
      .replace(".000Z", "");

    const options = apiRequestTemplate(startDate, endDate);

    const { data } = await axios.post("/api/get-weather", options);
    setWeatherData(data);
    setIsWeatherVisible(true);
  };

  return (
    <>
      <div ref={tableContainer} className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th className={styles.userName}>
                <div className={styles.cellContainer}>
                  <span>User</span>
                  <SortBox sortBy={sortBy} param="user" setSortBy={setSortBy} />
                </div>
              </th>
              {Array(31)
                .fill(null)
                .map((_a, idx) => (
                  <th key={`${idx}09a8sdf09sdgf9w0er`}>
                    <div className={styles.cellContainer}>
                      <span
                        className={styles.date}
                        day={idx + 1}
                        onClick={handleWeatherReq}
                      >
                        {idx + 1}
                      </span>
                      <SortBox
                        sortBy={sortBy}
                        param={`${idx + 1}`}
                        setSortBy={setSortBy}
                      />
                    </div>
                  </th>
                ))}
              <th className={styles.monthlyTotal}>
                <div className={styles.cellContainer}>
                  <span>Monthly total</span>
                  <SortBox
                    sortBy={sortBy}
                    param="monthly"
                    setSortBy={setSortBy}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className={styles.content}>
            {showedArr.sort(sortHelper(sortBy)).map((user) => (
              <TableRow user={user} key={user.id} />
            ))}
          </tbody>
        </table>
      </div>
      {isWeatherVisible ? (
        <WeatherModal
          weatherData={weatherData}
          setIsWeatherVisible={setIsWeatherVisible}
        />
      ) : null}
      <Pagination
        pageCount={Math.ceil(data.length / itemsPerPage)}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
      />
    </>
  );
};

export default Table;

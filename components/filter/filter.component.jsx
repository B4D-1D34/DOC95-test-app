import { useEffect, useState } from "react";
import styles from "./filter.module.css";

const Filter = ({ data, setFilteredData }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => setFilteredData(data), []);
  useEffect(() => handleFilter(), [userName]);

  const handleFilter = () => {
    let filteredResult = data;

    if (userName) {
      filteredResult = filteredResult.filter((el) =>
        el.Fullname.toLowerCase().trim().includes(userName.toLowerCase().trim())
      );
    }
    setFilteredData(filteredResult);
  };

  const handleUserSearch = (e) => {
    const { value } = e.target;
    setUserName(value);
  };

  return (
    <div className={styles.filter}>
      <h2 className={styles.title}>Search by username</h2>
      <input type="search" value={userName} onChange={handleUserSearch} />
    </div>
  );
};

export default Filter;

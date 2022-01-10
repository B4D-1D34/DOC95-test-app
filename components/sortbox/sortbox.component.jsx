import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./sortbox.module.css";

const SortBox = ({ sortBy, param, setSortBy }) => {
  const handleSort = ({ target }) => {
    const name = target.getAttribute("name");
    if (sortBy === `${param}_${name}`) {
      setSortBy("");
      return;
    }
    setSortBy(`${param}_${name}`);
  };
  return (
    <div className={styles.sortBox}>
      <div
        className={
          sortBy === `${param}_asc`
            ? `${styles.icon} ${styles.active}`
            : styles.icon
        }
        name="asc"
        onClick={handleSort}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </div>
      <div
        className={
          sortBy === `${param}_desc`
            ? `${styles.icon} ${styles.active}`
            : styles.icon
        }
        name="desc"
        onClick={handleSort}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </div>
    </div>
  );
};
export default SortBox;

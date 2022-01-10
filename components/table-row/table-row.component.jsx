import styles from "./table-row.module.css";

const TableRow = ({ user }) => {
  const { Fullname, id, Days } = user;

  const days = Array(31).fill(0);
  Days.forEach(
    ({ Date, Time }) => (days[parseInt(Date.split("-")[2]) - 1] = Time)
  );

  return (
    <tr className={styles.tableRow}>
      <td className={styles.userName}>
        <span>{Fullname}</span>
      </td>
      {days.map((time, idx) => (
        <td className={styles.dateCell} key={`${id}_${idx}`}>
          <span>{time}</span>
        </td>
      ))}
      <td className={styles.monthlyTotal}>
        <span>{days.reduce((acc, day) => acc + day, 0)}</span>
      </td>
    </tr>
  );
};

export default TableRow;

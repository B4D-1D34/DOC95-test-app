import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./weatherModal.module.css";

const WeatherModal = ({ weatherData, setIsWeatherVisible }) => {
  const { address, values } = weatherData?.locations["Yekaterinburg,RU"];
  const { conditions, humidity, wspd, maxt, mint, datetime } = values[0];

  const handleClose = () => setIsWeatherVisible(false);
  return (
    <div className={styles.modalBG}>
      <div className={styles.weatherModal}>
        <h3 className={styles.title}>Погода</h3>
        <div className={styles.closeBtn} onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <h4 className={styles.title}>{address}</h4>
        <div className={styles.dataRow}>
          <span className={styles.heading}>Дата:</span>{" "}
          {new Date(datetime).toDateString()}
        </div>
        <div className={styles.dataRow}>
          <span className={styles.heading}>Общее состояние:</span> {conditions}
        </div>
        <div className={styles.dataRow}>
          <span className={styles.heading}>Средняя температура:</span>{" "}
          {`${(maxt + mint) / 2} C`}
        </div>
        <div className={styles.dataRow}>
          <span className={styles.heading}>Максимальная температура:</span>{" "}
          {`${maxt} C`}
        </div>
        <div className={styles.dataRow}>
          <span className={styles.heading}>Минимальная температура:</span>{" "}
          {`${mint} C`}
        </div>
        <div className={styles.dataRow}>
          <span className={styles.heading}>Влажность:</span> {`${humidity}%`}
        </div>
        <div className={styles.dataRow}>
          <span className={styles.heading}>Скорость ветра:</span>{" "}
          {`${wspd} км/ч`}
        </div>
      </div>
    </div>
  );
};
export default WeatherModal;

import type { Launch } from "../../api/launches";

import { Launch as LaunchItem } from "./Launch";

import styles from "./LaunchesList.module.css";

export const LaunchesList = ({ value }: { value?: Launch[] }) => {
  return (
    <ul className={styles.list}>
      {value?.map((item) => (
        <li key={item.name} className={styles.item}>
          <LaunchItem
            success={item.success}
            details={item.details}
            flightNumber={item.flight_number}
            name={item.name}
            image={item?.links?.patch}
          />
        </li>
      ))}
    </ul>
  );
};

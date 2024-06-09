import type { Launch } from "../../api/launches";
import { useObserver } from "../../hooks/useObserver";

import { Launch as Item } from "./Launch";

import styles from "./Launches.module.css";

export const Launches = ({
  value,
  hasMore,
  isLoading,
  loadMore,
}: {
  value?: Launch[];
  hasMore: boolean;
  isLoading: boolean;
  loadMore: () => void;
}) => {
  const measurementRef = useObserver(() => {
    if (hasMore && !isLoading) {
      loadMore();
    }
  });

  return (
    <ul className={styles.list}>
      {value?.map((item, index) => {
        return (
          <li className={styles.item} key={item.name}>
            <Item
              measurementRef={
                index === value.length - 1 ? measurementRef : undefined
              }
              date={item.date_utc}
              rocketId={item.rocket}
              success={item.success}
              details={item.details}
              flightNumber={item.flight_number}
              name={item.name}
              upcoming={item.upcoming}
              image={item?.links?.patch}
            />
          </li>
        );
      })}
    </ul>
  );
};
